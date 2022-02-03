import sys

from django.contrib.auth import (
    login as django_login,
    logout as django_logout,
    get_user_model)
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework import viewsets, mixins, exceptions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from time import time

import numpy as np
import cv2
from PIL import Image
from io import BytesIO

from django.core.files.uploadedfile import InMemoryUploadedFile

import statistics
import random

# Create your views here.
from accounts.models import User, PhoneConfirm, MBTIMain, MBTISkin
from accounts.serializers import LoginSerializer, SignupSerializer, \
    ResetPasswordSerializer, NeoInfoSerializer
from blockchain.models import NeoBlock, NeoData
from blockchain.serializers import NeoBlockCreateSerializer, NeoDataCreateSerializer
from neohome.serializers import NeoHomeCreateSerializer
from neogrowth.models import ValuesItems, ItemClassifyMeta, ItemDetail, ItemMeta, Tag, Schwartz, SchwartzMeta,\
    SchwartzAnswer, RandomItemMeta, RandomItems
from neogrowth.serializers import ValuesItemsCreateSerializer

from nft.models import NFT
from neohome.models import NeoHome, NeoHomeMeta

from core.slack import lastneo_signup_slack_message


class AccountViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = [AllowAny, ]
    queryset = User.objects.filter(is_active=True)
    token_model = Token

    def get_serializer_class(self):
        if self.action == 'signup':
            serializer = SignupSerializer
        elif self.action == 'reset_pw':
            serializer = ResetPasswordSerializer
        elif self.action == 'login':
            serializer = LoginSerializer
        else:
            serializer = super(AccountViewSet, self).get_serializer_class()
        return serializer

    @transaction.atomic
    @action(methods=['post'], detail=False)
    def signup(self, request, *args, **kwargs):
        """
        회원가입시 사용하는 api 입니다.
        sms 인증이 완료될 때 return 된 phone, confirm_key에 + mbti + 가치관 답변 + password 을 입력받습니다.
        confirm_key를 활용하여 외부 api로 signup을 방지하였습니다.
        api: POST accounts/v1/signup/
        :data:
        {'phone', 'confirm_key', 'mbti', 'values', 'nickname', 'password', 'is_marketing'}
        :return: 입주 페이지에 들어갈 정보들을 RETURN 합니다.
        400 : bad request
        400 : confirm_key가 유효하지 않을 때
        400 : 해당 데이터의 형태가 맞지 않을 때
        201 : created
        """

        # user 생성
        try:
            data = request.data
            self.mbti = data["mbti"].upper()
            user_mbti = MBTIMain.objects.get(mbti_name=self.mbti).id
            user_data = {
                "phone": data["phone"], "confirm_key": data["confirm_key"], "values": data["values"],
                "mbti": user_mbti, "password": data["password"], "is_marketing": data["is_marketing"]
            }
        except Exception as e:
            return Response({"non_field_errors": ['MBTI data 형식이 올바르지 않습니다']}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        self.user = serializer.save()

        # 선택한 가치관에 해당하는 schwartz 추려내기
        data = request.data
        self.values = data["values"]
        tag_id = self._set_schwartz(self.values)

        # 추려낸 schwartz 에 맞는 item 찾아내고 가치관 items model + SchwartzAnswer model 생성
        self.item_meta_id = ItemMeta.objects.get(sub_category__tag_id=tag_id)
        serializer = ValuesItemsCreateSerializer(data={'neo': self.user.id, 'item_meta': self.item_meta_id.id},
                                                 context={'request': request})
        serializer.is_valid(raise_exception=True)
        valueitems = serializer.save()

        for i in range(len(self.values)):
            schwartz_meta = SchwartzMeta.objects.get(name=self.values[i])
            schwartanswer = SchwartzAnswer.objects.create(schwartz_meta=schwartz_meta, values_items=valueitems)
            schwartanswer.save()

        # 발급된 NFT 를 저장할 genesis block 생성
        neo_block_data = {
            "neo": self.user.id,
            "proof": 100 * self.user.id,
            "previous_hash": self.user.id,
            "index": 1
        }
        serializer = NeoBlockCreateSerializer(data=neo_block_data)
        serializer.is_valid(raise_exception=True)
        hash_key = serializer.save()

        # TODO : dev / prod 구분
        hash_address = 'http://3.37.14.91/' + hash_key
        nickname = request.data.pop('nickname')
        home_address = 'http://3.37.14.91/' + nickname

        # neo image 생성 (표정과 배경은 랜덤)
        self.neo_image, self.neo_upper_image = self._create_neo_image()

        # 생성된 Neo Image 를 저장할 NeoData model 생성
        serializer = NeoDataCreateSerializer(data={"neo": self.user.id, "hash_value": hash_key})
        serializer.is_valid(raise_exception=True)
        neodata = serializer.save()

        # image 는 따로 저장
        neodata.neo_image = self.neo_image
        neodata.neo_upper_image = self.neo_upper_image
        neodata.save()

        # NeoHome model 생성
        serializer = NeoHomeCreateSerializer(data={"neo": self.user.id, "hash_address": hash_address,
                                                   "nickname": nickname, "home_meta": self.home_meta.id})
        serializer.is_valid(raise_exception=True)
        neohome = serializer.save()

        # [DEPRECATED] 처음 회원가입할 때는 NFT 발급을 하지 않기로 결정하였음
        # # NFT model 생성
        # nft = NFT.objects.create(neo=self.user)
        # nft.save()
        #
        # # image 는 따로 저장 : nft 는 upper image 만 저장해도 됨
        # nft.nft_image = self.neo_upper_image
        # nft.save()

        # 회원가입 slack 알림 보내기
        message = "\n [LastNeo World 에 입주한 Neo Log] \n" \
                  "\n" \
                  "네오 이미지: {} \n" \
                  "네오 집 닉네임: {}\n" \
                  "--------------------".format(neodata.neo_upper_image.url,
                                                nickname)
        lastneo_signup_slack_message(message)

        # Neo 입주 페이지에서 보여줄 정보를 담은 serialializer 로 보여주려 했으나 여러 모델에서 가져오기 때문에 복잡성이 증가해
        # 그냥 data 를 다 view 에서 불러와서 제공하는 것으로 변경하였음.
        # TODO : 사실 serializer 로 표현하는 게 맞음...
        token, _ = Token.objects.get_or_create(user=self.user)
        mbti_name = MBTIMain.objects.get(mbti_name=self.mbti).character_name
        neo_info_data = {"nickname": neohome.nickname, "home_address": home_address, "neo_image": neodata.neo_upper_image.url, "token": token.key,
                         "mbti": self.mbti, "item_description": valueitems.item_meta.description,
                         "item_name": valueitems.item_meta.name, "value_name": self.schwartz_name, "mbti_name": mbti_name}
        return Response(neo_info_data, status=status.HTTP_201_CREATED)

    def _set_schwartz(self, values):
        schwartz_id_list = []
        for i in range(len(values)):
            schwartz_id = SchwartzMeta.objects.get(name=values[i]).schwartz.name
            schwartz_id_list.append(schwartz_id)
        frequent_list = statistics.multimode(schwartz_id_list)
        if len(frequent_list) == 5:
            self.schwartz_name = Schwartz.objects.get(name="잠재").name
        else:
            frequent_id = random.choice(frequent_list)
            self.schwartz_name = Schwartz.objects.get(name=frequent_id).name
        tag = Tag.objects.get(classify_id__classify_name__contains=self.schwartz_name)
        return tag.id

    def _create_neo_image(self):
        # STEP 1 : neo image 생성을 위해 layer 별로 image 나열
        neo_layer_list = []
        neo_upper_layer_list = []
        neo_image_list = []
        neo_upper_image_list = []
        random_face = random.randrange(1,7)
        mbti_skin_obj = MBTISkin.objects.filter(mbti_main__mbti_name=self.mbti, skin_status=0).all().order_by(
            '-layer_level')
        mbti_face_obj = MBTISkin.objects.filter(mbti_main__mbti_name=self.mbti, skin_status=random_face).all().order_by(
            '-layer_level')
        final_obj = mbti_skin_obj | mbti_face_obj
        final_obj = final_obj.order_by('-layer_level')
        for mbti_skin in final_obj.iterator():
            neo_layer_list.append(mbti_skin.layer_level)
            neo_image_list.append(mbti_skin.skin_image.url)
            try:
                neo_upper_image_list.append(mbti_skin.skin_upper_image.url)
                neo_upper_layer_list.append(mbti_skin.layer_level)
            except Exception as e:
                print("반신은 Image 존재하지 않음")

        item = ItemMeta.objects.filter(values_items__item_meta=self.item_meta_id).last()
        item_meta_layer_level = item.layer_level
        random_item = RandomItemMeta.objects.filter(layer_level=38).order_by('?').last()
        randomitems = RandomItems.objects.create(item_meta=random_item, neo=self.user)
        neo_character_room_color = randomitems.item_meta.name[:2]
        self.home_meta = NeoHomeMeta.objects.get(description__contains=neo_character_room_color)
        randomitems.save()
        neo_layer_list.append(item_meta_layer_level)
        neo_upper_layer_list.append(item_meta_layer_level)
        neo_layer_arg_list = sorted(range(len(neo_layer_list)), key=neo_layer_list.__getitem__)
        neo_upper_layer_arg_list = sorted(range(len(neo_upper_layer_list)), key=neo_upper_layer_list.__getitem__)
        neo_image_list.insert(neo_layer_arg_list[0], item.item_full_image.url)
        neo_upper_image_list.insert(neo_upper_layer_arg_list[0], item.item_half_image.url)
        # neo_image_list.insert(0, random_item.item_image.url)
        neo_upper_image_list.insert(0, random_item.item_image.url)

        # STEP 2 : neo image 실제 합치기 작업
        import requests
        image_list = []
        upper_image_list = []

        for i in range(len(neo_image_list)):
            resp = requests.get(neo_image_list[i])
            image = Image.open(BytesIO(resp.content))
            image_list.append(image)
            if i > 0:
                image_list[0].paste(image_list[i], (0,0), image_list[i])

        for i in range(len(neo_upper_image_list)):
            resp = requests.get(neo_upper_image_list[i])
            image_upper = Image.open(BytesIO(resp.content))
            upper_image_list.append(image_upper)
            if i > 0:
                upper_image_list[0].paste(upper_image_list[i], (0,0), upper_image_list[i])

        final = image_list[0].convert('RGBA')
        output = BytesIO()
        final.save(output, format="PNG")
        final_image = InMemoryUploadedFile(output, None, 'full.png', 'image/png', len(output.getvalue()), None)
        final_upper = upper_image_list[0].convert('RGBA')
        output_upper = BytesIO()
        final_upper.save(output_upper, format="PNG")
        final_upper_image = InMemoryUploadedFile(output_upper, None, 'upper.png', 'image/png', len(output_upper.getvalue()), None)

        return final_image, final_upper_image

    def _login(self):
        user = self.serializer.validated_data['user']
        setattr(user, 'backend', 'django.contrib.auth.backends.ModelBackend')
        django_login(self.request, user)
        # loginlog_on_login(request=self.request, user=user)

    @action(methods=['post'], detail=False)
    def login(self, request, *args, **kwargs):
        """
        api: POST accounts/v1/login/
        data: {'nickname', 'password'}
        return : {'id', 'token', 'phone'}
        """
        try:
            self.serializer = self.get_serializer(data=request.data)
            self.serializer.is_valid(raise_exception=True)
            self._login()
            user = self.serializer.validated_data['user']
        except Exception as e:
            return Response({"non_field_errors": ['Failed to login.']},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = NeoInfoSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_name='logout')
    def logout(self, request):
        """
        api: POST accounts/v1/logout/
        header = {'Authorization' : token}
        data = {}
        :return: code, status
        """
        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            key = request.headers['Authorization']
            if key:
                token = Token.objects.get(key=key)
                token.delete()
        if getattr(settings, 'REST_SESSION_LOGIN', True):
            django_logout(request)

        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def reset_pw(self, request, *args, **kwargs):
        """
        비밀번호 재설정에 사용하는 api 입니다.
        sms 인증이 완료될 때 return 된 phone, confirm_key에 + password 을 입력받습니다.
        api: POST accounts/v1/reset_pw/
        :return:
        400 : bad request
        400 : confirm_key가 유효하지 않을 때
        201 : created
        """
        data = request.data.copy()
        user = User.objects.filter(phone=data["phone"], is_active=True)
        user = user.last()

        # password reset(update) 생성
        serializer = self.get_serializer(user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        serializer = NeoInfoSerializer(user)
        return Response(serializer.data, status=status.HTTP_206_PARTIAL_CONTENT)


class NickNameIsDuplicatedAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        NickName 중복 여부를 판단하기 위한 API
        api : https://lastneo.io/accounts/v1/check_nickname/
        data : {'nickname (string)':}
        return : {'is_duplicated (Boolean)'}
        """
        data = request.data
        nickname = data["nickname"]

        neohome = NeoHome.objects.filter(nickname=nickname).last()
        if neohome != None:
            return Response({'is_duplicated': True}, status=status.HTTP_404_NOT_FOUND)
        return Response({'is_duplicated': False}, status=status.HTTP_200_OK)

