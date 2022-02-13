import random

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import transaction, OperationalError
from django.conf import settings
from django.utils.dateformat import DateFormat
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from PIL import Image
from io import BytesIO

from core.sms.utils import SMSV2Manager
from neohome.models import NeoHome, NeoHomeMeta
from accounts.models import User, MBTIMain, MBTISkin
from neogrowth.models import Big5Question, ItemMeta, Big5Answer, Big5SubSection, PersonalityItems, Tag, RandomItemMeta, \
    ValuesItems, RandomItems

from nft.models import NFT
from blockchain.models import NeoData, NeoBlock

from neohome.serializers import NeoHomeGuestInfoRetrieveSerializer, NeoHomeOwnerInfoRetrieveSerializer
from neogrowth.serializers import Big5AnswerCreateSerializer, PersonalityItemsInfoSerializer
from blockchain.serializers import NeoDataCreateSerializer, NeoBlockCreateSerializer
from nft.serializers import NFTCreateSerializer

from core.slack import nft_request_slack_message
from core.models import SMSManager

import datetime


class NeoHomeDoorAPI(APIView):
    permission_classes = [AllowAny]
    """
    불러오는 네오 현관 페이지의 주소 값인 hash 값이 실제로 존재하는지 아닌지에 관한 여부와 함께 주소를 제공하는 API
    나머지 guest 로 입장하기, 집주인으로 입장하기와 관련된 버튼에서 각 API 호출하는 것으로 결정
    """

    def post(self, request, *args, **kwargs):
        """
        api: lastneo.io/api/v1/door/
        method : POST
        data: {'data' : }
        return : {'is_exact': (Boolean), 'nickname': (string)}
        """
        data = request.data.copy()
        content = data.get('data')
        nickname, phone = self._check_data_form(content)
        if NeoHome.objects.filter(nickname=nickname):
            neohome= NeoHome.objects.get(nickname=nickname)
            return Response({'is_exact': True, 'nickname': neohome.nickname}, status=status.HTTP_200_OK)
        elif User.objects.filter(phone=phone):
            user = User.objects.get(phone=phone)
            neohome = NeoHome.objects.get(neo=user)
            return Response({'is_exact': True, 'nickname': neohome.nickname}, status=status.HTTP_200_OK)
        else:
            return Response({'is_exact': False, 'nickname': None}, status=status.HTTP_404_NOT_FOUND)

    def _check_data_form(self, data):
        if "010" in data[:3]:
            nickname = None
            phone = data
        else:
            nickname = data
            phone = None
        return nickname, phone


class NeoHomeIsOwnerAPIView(APIView):
    permission_classes = [AllowAny]
    lookup_value_regex = r"[\w.]+"

    def post(self, request, *args, **kwargs):
        """
        NeoHome 주소에 접근할 때 header 에 있는 token 의 여부를 통해 해당 집 주소의 주인이 가진 토큰이라면
        자동 로그인을 시켜주기 위해 사용하는 API
        api : https://lastneo.io/api/v1/is_owner/
        header : Authorization
        data : {'nickname'}
        return : {'is_owner'}
        """
        data = self.request.data.copy()
        nickname = data['nickname']
        try:
            key = request.headers['Authorization']
        except Exception as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        neo_home = NeoHome.objects.filter(nickname=nickname).last()
        if not neo_home:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            token = Token.objects.filter(key=key, user=neo_home.neo)
            if not token:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            return Response(status=status.HTTP_200_OK)


class NeoHomeIntroductionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    lookup_value_regex = r"[\w.]+"

    def put(self, request, *args, **kwargs):
        """
        NeoHome 의 소개글을 변경할 때 사용하는 API
        guest 는 변경할 수 없기 때문에 Header 에 Token 을 담아서 줘야합니다.
        api: api/v1/homeintroduction/
        data: {'nickname', 'description'}
        header : Authorization
        return : status
        """
        data = self.request.data
        nickname = data['nickname']
        try:
            key = request.headers['Authorization'].split(' ')[-1]
        except Exception as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        neo_home = NeoHome.objects.filter(nickname=nickname).last()
        if not neo_home:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            token = Token.objects.filter(key=key, user=neo_home.neo)
            if not token:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            else:
                neo_home.description = data["description"]
                neo_home.save()
                return Response(status=status.HTTP_200_OK)


class NeoHomeGuestViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    queryset = NeoHome.objects.filter().all()
    lookup_field = 'nickname'
    lookup_value_regex = r"[\w.]+"

    def get_serializer_class(self):
        if self.action == 'retrieve':
            serializer = NeoHomeGuestInfoRetrieveSerializer
        else:
            serializer = super(NeoHomeGuestViewSet, self).get_serializer_class()
        return serializer

    def retrieve(self, request, *args, **kwargs):
        """
        guest 로 입장했을 때 정보를 받아오는 api 로 네오 캐릭터 방에 있는 정보들을 return 합니다.
        api : api/v1/neohomeguest/<nickname>
        return : {guest 정보 serializer 정보, status}
        """
        nickname = self.kwargs['nickname']
        self.neohome = NeoHome.objects.filter(nickname=nickname).last()
        if self.neohome == None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(self.neohome)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NeoHomeOwnerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = NeoHome.objects.filter().all()
    lookup_field = 'nickname'
    lookup_value_regex = r"[\w.]+"

    def get_serializer_class(self):
        if self.action == 'retrieve':
            serializer = NeoHomeOwnerInfoRetrieveSerializer
        else:
            serializer = super(NeoHomeOwnerViewSet, self).get_serializer_class()
        return serializer

    def retrieve(self, request, *args, **kwargs):
        """
        owner 로 입장했을 때 정보를 받아오는 api 로 네오 캐릭터 방에 있는 정보들을 return 합니다.
        api : api/v1/neohomeowner/<nickname>
        return : {guest 정보 serializer 정보, status}
        """
        nickname = self.kwargs['nickname']
        self.neohome = NeoHome.objects.get(nickname=nickname)
        serializer = self.get_serializer(self.neohome)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Big5QuestionsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Big5Question.objects.filter().all()

    def get_serializer_class(self):
        if self.action == "create":
            return Big5AnswerCreateSerializer
        else:
            serializer = super(Big5QuestionsViewSet, self).get_serializer_class()
        return serializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        api: POST lastneo.io/api/v1/neohome/big5question
        data: {'section': , 'questions': [{'question_id': question_id, 'result': (int)},{'question_id': question_id, 'result': (int)}]}
        return: {'item_name', 'item_image', 'description'}
        """
        self.data = request.data.copy()
        self.neo = self.request.user
        self.mbti = self.neo.mbti.mbti_name
        # Big5Answer 생성
        self._create_big5answers()
        # total result 에 해당하는 아이템 추출 및 변화하는 상태 가져오기
        self._create_personalityitems()
        if NeoData.objects.filter(neo=self.neo, is_used=False).count() == 0:
            self._update_background()
        # NeoData + NeoBlock 만드는 과정
        self._create_blockchain()

        smsmanager = SMSManager.objects.filter().all().last()

        phone = self.neo.phone

        if NeoData.objects.filter(neo=self.neo).count() == 2:
            if smsmanager.to_who == 0:
                sms_manager = SMSV2Manager()
                if settings.DEV:
                  sms_manager.neo_url = "http://3.37.14.91/" + self.neo.neohome.last().nickname
                else:
                  sms_manager.neo_url = "https://lastneo.io/" + self.neo.neohome.last().nickname
                sms_manager.set_first_neo_content()

                if not sms_manager.send_sms(phone=phone):
                    return Response("Failed send sms", status=status.HTTP_410_GONE)
            else:
                if self.neo.is_marketing == True:
                    sms_manager = SMSV2Manager()
                    if settings.DEV:
                      sms_manager.neo_url = "http://3.37.14.91/" + self.neo.neohome.last().nickname
                    else:
                      sms_manager.neo_url = "https://lastneo.io/" + self.neo.neohome.last().nickname
                    sms_manager.set_first_neo_content()

                    if not sms_manager.send_sms(phone=phone):
                        return Response("Failed send sms", status=status.HTTP_410_GONE)

        try:
            serializer = PersonalityItemsInfoSerializer(self.personality_items.item_meta)
        except:
            return Response({"item_name": None, "item_image": None, "item_status": False}, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _create_big5answers(self):
        questions = self.data.get('questions')
        if not questions:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        for i in range(len(questions)):
            serializer = Big5AnswerCreateSerializer(data=questions[i], context={'request': self.request, 'user': self.neo})
            serializer.is_valid(raise_exception=True)
            serializer.save()

    def _create_personalityitems(self):
        section = self.data.get('section')
        total_result = 0
        big5answer_qs = Big5Answer.objects.filter(big5_question__section=section, neo=self.neo).all()
        num_week = big5answer_qs.count() / 5
        for big5answer in big5answer_qs.iterator():
            total_result += big5answer.result
        min_big5subsection = Big5SubSection.objects.get(subsection=section, version=num_week, section_value=1)
        mid_big5subsection = Big5SubSection.objects.filter(subsection=section, version=num_week, section_value=2).last()
        max_big5subsection = Big5SubSection.objects.get(subsection=section, version=num_week, section_value=3)
        if total_result <= min_big5subsection.min_value:
            item_meta_id_qs = ItemMeta.objects.filter(sub_category__tag__big5_subsection_id=min_big5subsection,
                                                   level=num_week).all()
        elif mid_big5subsection.min_value <= total_result <= mid_big5subsection.max_value:
            item_meta_id_qs = ItemMeta.objects.filter(sub_category__tag__big5_subsection_id=mid_big5subsection,
                                                   level=num_week).all()
            if item_meta_id_qs == None:
                return None
        else:
            item_meta_id_qs = ItemMeta.objects.filter(sub_category__tag__big5_subsection_id=max_big5subsection,
                                                   level=num_week).all()
        for item_meta_id in item_meta_id_qs.iterator():
            self.personality_items = PersonalityItems.objects.create(neo=self.neo, item_meta=item_meta_id)
            self.personality_items.save()
            if self.mbti != "INFP" or section != "E":
                if item_meta_id.layer_level == 6:
                    self.personality_items.delete()
            if self.mbti == "INFP" and section == "E" and item_meta_id.layer_level == 7:
                self.personality_items.delete()

        return None

    def _update_background(self):
        random_item = RandomItemMeta.objects.filter(layer_level=38).order_by('?').last()
        randomitems = RandomItems.objects.create(item_meta=random_item, neo=self.neo)
        randomitems.save()
        neo_character_room_color = randomitems.item_meta.name[:2]
        self.home_meta = NeoHomeMeta.objects.get(description__contains=neo_character_room_color)
        neohome = NeoHome.objects.filter(neo=self.neo).last()
        neohome.home_meta = self.home_meta
        neohome.save()
        return None

    def _create_blockchain(self):
        neo_block_qs = NeoBlock.objects.filter(neo=self.neo)
        last_neo_block = neo_block_qs.last()
        num_block = neo_block_qs.count()
        neo_block_data = {
            "neo": self.request.user.id,
            "proof": last_neo_block.proof,
            "previous_hash": last_neo_block.previous_hash,
            "index": num_block
        }
        serializer = NeoBlockCreateSerializer(data=neo_block_data)
        serializer.is_valid(raise_exception=True)
        self.hash_key = serializer.save()

        neo_image, neo_upper_image = self._create_neo_image()

        # 생성된 Neo Image 를 저장할 NeoData model 생성
        serializer = NeoDataCreateSerializer(data={"neo": self.neo.id, "hash_value": self.hash_key})
        serializer.is_valid(raise_exception=True)
        self.neodata = serializer.save()

        self.neodata.neo_image = neo_image
        self.neodata.neo_upper_image = neo_upper_image
        self.neodata.save()

        neohome = NeoHome.objects.get(neo=self.neo)
        neohome.num_block += 1
        neohome.save()

    def _create_neo_image(self):
        # STEP 1 : neo image 생성을 위해 layer 별로 image 나열
        neo_layer_list = []
        neo_upper_layer_list = []
        neo_image_list = []
        neo_upper_image_list = []
        random_face = random.randrange(1, 7)
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
                print("ERROR!")
        # 가치관 item
        item = ItemMeta.objects.filter(values_items__neo=self.neo).last()
        item_meta_layer_level = item.layer_level
        neo_layer_list.append(item_meta_layer_level)
        neo_upper_layer_list.append(item_meta_layer_level)
        neo_layer_arg_list = sorted(range(len(neo_layer_list)), key=neo_layer_list.__getitem__)
        neo_upper_layer_arg_list = sorted(range(len(neo_upper_layer_list)), key=neo_upper_layer_list.__getitem__)
        neo_image_list.insert(neo_layer_arg_list[0], item.item_full_image.url)
        neo_upper_image_list.insert(neo_upper_layer_arg_list[0], item.item_half_image.url)

        # 배경 item
        random_item = RandomItemMeta.objects.filter(layer_level=38, random_items__neo=self.neo)\
            .order_by('-random_items__created_at').first()
        neo_layer_list.insert(0, 38)
        neo_upper_layer_list.insert(0, 38)
        neo_layer_arg_list = sorted(range(len(neo_layer_list)), key=neo_layer_list.__getitem__)
        neo_upper_layer_arg_list = sorted(range(len(neo_upper_layer_list)), key=neo_upper_layer_list.__getitem__)
        # neo_image_list.insert(neo_layer_arg_list[-1], random_item.item_image.url)
        neo_upper_image_list.insert(neo_upper_layer_arg_list[-1], random_item.item_image.url)

        # Big5 item
        big5_item_qs = ItemMeta.objects.filter(personality_items__neo=self.neo).order_by('-personality_items__created_at')
        for big5_item in big5_item_qs.iterator():
            neo_layer_list = sorted(neo_layer_list, reverse=True)
            neo_upper_layer_list = sorted(neo_upper_layer_list, reverse=True)
            big5_item_meta_layer_level = big5_item.layer_level
            if big5_item.layer_level in neo_layer_list:
                print("DUPLICATED!")
            else:
                neo_layer_list.append(big5_item_meta_layer_level)
                neo_upper_layer_list.append(big5_item_meta_layer_level)
                neo_layer_arg_list = sorted(range(len(neo_layer_list)), key=neo_layer_list.__getitem__)
                neo_upper_layer_arg_list = sorted(range(len(neo_upper_layer_list)), key=neo_upper_layer_list.__getitem__)
                for i in range(len(neo_layer_arg_list)):
                    if i == 0:
                        pass
                    else:
                        if neo_layer_arg_list[i] > neo_layer_arg_list[i-1]:
                            neo_image_list.insert(len(neo_image_list)-i, big5_item.item_full_image.url)
                            break
                        if i == len(neo_layer_arg_list)-1 and neo_layer_arg_list[i] < neo_layer_arg_list[i-1]:
                            neo_image_list.append(big5_item.item_full_image.url)
                for i in range(len(neo_upper_layer_arg_list)):
                    if i == 0:
                        pass
                    else:
                        if neo_upper_layer_arg_list[i] > neo_upper_layer_arg_list[i-1]:
                            neo_upper_image_list.insert(len(neo_upper_image_list)-i, big5_item.item_half_image.url)
                            break
                        if i == len(neo_upper_layer_arg_list)-1 and neo_upper_layer_arg_list[i] < neo_upper_layer_arg_list[i-1]:
                            neo_upper_image_list.append(big5_item.item_half_image.url)
        print("-------------------")
        print(neo_image_list)
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
        final_upper = upper_image_list[0].convert('RGB')
        output_upper = BytesIO()
        final_upper.save(output_upper, format="JPEG")
        final_upper_image = InMemoryUploadedFile(output_upper, None, 'upper.jpg', 'image/jpeg', len(output_upper.getvalue()), None)

        return final_image, final_upper_image


class NFTViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = NFT.objects.filter().all()

    def get_serializer_class(self):
        if self.action == "create":
            return NFTCreateSerializer
        else:
            serializer = super(NFTViewSet, self).get_serializer_class()
        return serializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        api: POST lastneo.io/api/v1/neohome/nftblock/
        data:
        return:
        """
        self.data = request.data.copy()
        self.neo = self.request.user
        neodata_qs = NeoData.objects.filter(neo=self.neo, is_used=False)

        # Step 1 : NFT 생성
        if neodata_qs.count() < 5:
            return Response({"non_field_errors": ['NFT 발급 가능 블록 수를 채우지 못했습니다.']}, status=status.HTTP_400_BAD_REQUEST)
        else:
            nft_image = neodata_qs.last().neo_upper_image
            serializer = NFTCreateSerializer(data={"nft_image": nft_image}, context={'request': self.request, 'user': self.neo})
            serializer.is_valid(raise_exception=True)
            serializer.save()

        # Step 2 : NFT 요청 slack 발송

        item_list = []
        item_layer_list = []
        item_name_list = []

        value_items = ValuesItems.objects.filter(neo=self.neo).last()

        item_list.append(value_items.item_meta.name)

        big5_items_qs = PersonalityItems.objects.filter(neo=self.neo).order_by('-created_at')
        for big5_item in big5_items_qs.iterator():
            item_name = big5_item.item_meta.name
            if (big5_item.item_meta.name in item_name_list) or (big5_item.item_meta.layer_level in item_layer_list):
                print("DUPLICATED!")
                if big5_item.item_meta.name in item_name_list:
                    item_layer_list.append(big5_item.item_meta.layer_level)
                    print("DUPLICATED!")
            else:
                item_list.append(item_name)
                item_layer_list.append(big5_item.item_meta.layer_level)
                item_name_list.append(big5_item.item_meta.name)

        message = "\n [LastNeo World NFT Request] \n" \
                  "\n" \
                  "네오 이미지: {}\n" \
                  "네오 집 닉네임: {}\n" \
                  "부여받은 아이템 list: {}\n"\
                  "--------------------".format(nft_image.url, self.neo.neohome.last().nickname, item_list)
        nft_request_slack_message(message)

        return Response({"nft_image": nft_image.url}, status=status.HTTP_201_CREATED)