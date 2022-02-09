from time import time
from django.conf import settings

from rest_framework import serializers, exceptions
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _
from django.utils.dateformat import DateFormat

from neohome.models import NeoHome, NeoHomeMeta
from accounts.models import User

from neogrowth.models import ItemMeta, ValuesItems, Big5Question, SchwartzMeta, Schwartz, PersonalityItems,\
    Big5Answer
from blockchain.models import NeoData

from nft.models import NFT

import datetime
import statistics
import random


class NeoHomeCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = NeoHome
        fields = ["neo", "hash_address", "nickname", "home_meta"]

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        user_id = validated_data["neo"].id
        hash_address = validated_data["hash_address"]
        nickname = validated_data["nickname"]
        home_meta_id = validated_data["home_meta"].id

        user = User.objects.get(pk=user_id)
        home_meta = NeoHomeMeta.objects.get(pk=home_meta_id)
        neohome = NeoHome.objects.create(neo=user, hash_address=hash_address, nickname=nickname, home_meta=home_meta)
        neohome.save()

        return neohome


class NeoHomeGuestInfoRetrieveSerializer(serializers.ModelSerializer):
    neo_room_image = serializers.SerializerMethodField()
    mini_profile = serializers.SerializerMethodField()
    home_address = serializers.SerializerMethodField()
    neo_image = serializers.SerializerMethodField()
    value_items = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    nfts_info = serializers.SerializerMethodField()
    mbti = serializers.SerializerMethodField()
    mbti_name = serializers.SerializerMethodField()

    class Meta:
        model = NeoHome
        fields = ["neo_room_image", "mini_profile", "mbti", "mbti_name", "home_address", "description", "neo_image", "value_items", "items", "nfts_info"]
        lookup_field = 'nickname'

    def get_neo_room_image(self, obj):
        return obj.home_meta.home_image.url

    def get_mini_profile(self, obj):
        return obj.neo.neodata.last().neo_upper_image.url

    def get_home_address(self, obj):
        if settings.DEV:
            return 'http://3.37.14.91/' + obj.nickname
        else:
            return 'https://lastneo.io/' + obj.nickname

    def get_mbti(self, obj):
        return obj.neo.mbti.mbti_name

    def get_mbti_name(self, obj):
        return obj.neo.mbti.character_name

    def get_neo_image(self, obj):
        neodata = obj.neo.neodata.last()
        return neodata.neo_image.url

    def get_value_items(self, obj):
        neo = obj.neo
        dic = {}
        value_items = ValuesItems.objects.filter(neo=neo).last()
        value_name = value_items.item_meta.sub_category.tag.classify_id.classify_name[-2:]
        dic['value_name'] = value_name
        dic['name'] = value_items.item_meta.name
        dic['description'] = value_items.item_meta.description
        dic['item_image'] = value_items.item_meta.item_image.url
        return dic

    def get_items(self, obj):
        neo = obj.neo
        item_list = []
        item_layer_list = []
        item_name_list = []

        dic = {}
        value_items = ValuesItems.objects.filter(neo=neo).last()
        dic['item_name'] = value_items.item_meta.name
        dic['item_image'] = value_items.item_meta.item_image.url
        daytime = value_items.created_at
        daytime = DateFormat(daytime).format('Y.m.d')
        dic["created_at"] = daytime
        today_daytime = DateFormat(datetime.datetime.today()).format('Y.m.d')
        if today_daytime == daytime:
            dic["today_received"] = True
        else:
            dic["today_received"] = False

        item_list.append(dic)

        # TODO : 중복제거 distinct() 써서 더 예쁘게..
        big5_items_qs = PersonalityItems.objects.filter(neo=neo).order_by('-created_at')
        for big5_item in big5_items_qs.iterator():
            dic = {}
            dic["item_name"] = big5_item.item_meta.name
            dic["item_image"] = big5_item.item_meta.item_image.url
            daytime = big5_item.created_at
            daytime = DateFormat(daytime).format('Y.m.d')
            dic["created_at"] = daytime
            today_daytime = DateFormat(datetime.datetime.today()).format('Y.m.d')
            if today_daytime == daytime:
                dic["today_received"] = True
            else:
                dic["today_received"] = False
            if (big5_item.item_meta.layer_level in item_layer_list) or (big5_item.item_meta.name in item_name_list):
                print("DUPLICATED!")
            else:
                item_list.append(dic)
                item_layer_list.append(big5_item.item_meta.layer_level)
                item_name_list.append(big5_item.item_meta.name)

        return item_list

    def get_nfts_info(self, obj):
        nft_info_list = []
        nfts_obj = obj.neo.nfts.all()
        for nft in nfts_obj.iterator():
            dic = {}
            nft_qs = NFT.objects.filter(pk=nft.id).last()
            dic["nft_image"] = nft_qs.nft_image.url
            daytime = nft_qs.created_at
            daytime = DateFormat(daytime).format('Y.m.d')
            dic["created_at"] = daytime
            today_daytime = DateFormat(datetime.datetime.today()).format('Y.m.d')
            if today_daytime == daytime:
                dic["today_received"] = True
            else:
                dic["today_received"] = False

            nft_info_list.append(dic)
        return nft_info_list


class NeoHomeOwnerInfoRetrieveSerializer(serializers.ModelSerializer):
    neo_room_image = serializers.SerializerMethodField()
    mini_profile = serializers.SerializerMethodField()
    home_address = serializers.SerializerMethodField()
    neo_image = serializers.SerializerMethodField()
    value_items = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    nfts_info = serializers.SerializerMethodField()
    today_datetime = serializers.SerializerMethodField()
    neo_questions = serializers.SerializerMethodField()
    neo_blocks = serializers.SerializerMethodField()
    mbti = serializers.SerializerMethodField()
    mbti_name = serializers.SerializerMethodField()
    is_done = serializers.SerializerMethodField()

    class Meta:
        model = NeoHome
        fields = ["neo_room_image", "mini_profile", "home_address", "mbti", "mbti_name", "description", "neo_image",
                  "value_items", "items", "nfts_info", "today_datetime", "neo_questions", "neo_blocks", "is_done"]
        lookup_field = 'nickname'

    def get_neo_room_image(self, obj):
        return obj.home_meta.home_image.url

    def get_mini_profile(self, obj):
        return obj.neo.neodata.last().neo_upper_image.url

    def get_home_address(self, obj):
        if settings.DEV:
            return 'http://3.37.14.91/' + obj.nickname
        else:
            return 'https://lastneo.io/' + obj.nickname

    def get_mbti(self, obj):
        return obj.neo.mbti.mbti_name

    def get_mbti_name(self, obj):
        return obj.neo.mbti.character_name

    def get_neo_image(self, obj):
        neodata = obj.neo.neodata.last()
        return neodata.neo_image.url

    def get_value_items(self, obj):
        neo = obj.neo
        dic = {}
        value_items = ValuesItems.objects.filter(neo=neo).last()
        value_name = value_items.item_meta.sub_category.tag.classify_id.classify_name[-2:]
        dic['value_name'] = value_name
        dic['name'] = value_items.item_meta.name
        dic['description'] = value_items.item_meta.description
        dic['item_image'] = value_items.item_meta.item_image.url
        return dic

    def get_items(self, obj):
        neo = obj.neo
        item_list = []
        item_layer_list = []
        item_name_list = []

        dic = {}
        value_items = ValuesItems.objects.filter(neo=neo).last()
        dic['item_name'] = value_items.item_meta.name
        dic['item_image'] = value_items.item_meta.item_image.url
        daytime = value_items.created_at
        daytime = DateFormat(daytime).format('Y.m.d')
        dic["created_at"] = daytime
        today_daytime = DateFormat(datetime.datetime.today()).format('Y.m.d')
        if today_daytime == daytime:
            dic["today_received"] = True
        else:
            dic["today_received"] = False

        item_list.append(dic)

        # TODO : 중복제거 distinct() 써서 더 예쁘게..
        big5_items_qs = PersonalityItems.objects.filter(neo=neo).order_by('-created_at')
        for big5_item in big5_items_qs.iterator():
            dic = {}
            dic["item_name"] = big5_item.item_meta.name
            dic["item_image"] = big5_item.item_meta.item_image.url
            daytime = big5_item.created_at
            daytime = DateFormat(daytime).format('Y.m.d')
            dic["created_at"] = daytime
            today_daytime = DateFormat(datetime.datetime.today()).format('Y.m.d')
            if today_daytime == daytime:
                dic["today_received"] = True
            else:
                dic["today_received"] = False
            if (big5_item.item_meta.layer_level in item_layer_list) or (big5_item.item_meta.name in item_name_list):
                print("DUPLICATED!")
            else:
                item_list.append(dic)
                item_layer_list.append(big5_item.item_meta.layer_level)
                item_name_list.append(big5_item.item_meta.name)

        return item_list

    def get_nfts_info(self, obj):
        nft_info_list = []
        nfts_obj = obj.neo.nfts.all()
        for nft in nfts_obj.iterator():
            dic = {}
            nft_qs = NFT.objects.filter(pk=nft.id).last()
            dic["nft_image"] = nft_qs.nft_image.url
            daytime = nft_qs.created_at
            daytime = DateFormat(daytime).format('Y.m.d')
            dic["created_at"] = daytime
            today_daytime = DateFormat(datetime.datetime.today()).format('Y.m.d')
            if today_daytime == daytime:
                dic["today_received"] = True
            else:
                dic["today_received"] = False

            nft_info_list.append(dic)
        return nft_info_list

    def get_today_datetime(self, obj):
        # week_dic = {
        #     "0": "월요일",
        #     "1": "화요일",
        #     "2": "수요일",
        #     "3": "목요일",
        #     "4": "금요일",
        #     "5": "토요일",
        #     "6": "일요일",
        # }
        today_datetime = DateFormat(datetime.datetime.today()).format('Y.m.d')
        # today_weekday = str(datetime.datetime.today().weekday())
        # today_weekday = week_dic.get(today_weekday)
        return today_datetime

    def get_neo_questions(self, obj):
        question_list = []
        section_dic = {
            "0": "O",
            "1": "C",
            "2": "E",
            "3": "A",
            "4": "N",
        }
        today_section = str(datetime.datetime.today().weekday())
        self.today_section = section_dic.get(today_section)
        big5question_qs = Big5Question.objects.filter(section=self.today_section).exclude(big5_answers__neo=obj.neo).order_by('?')[:5]
        for big5question in big5question_qs.iterator():
            dic = {}
            dic["id"] = big5question.id
            dic["section"] = big5question.section
            dic["question"] = big5question.question
            question_list.append(dic)
        return question_list

    def get_is_done(self, obj):
        from datetime import datetime, time
        today = datetime.now().date()
        if Big5Answer.objects.filter(big5_question__section=self.today_section, neo=obj.neo, created_at__gte=today).exists():
            return True
        return False

    def get_neo_blocks(self, obj):
        neo_nft_dic = {}
        neo_nft_dic["num_block"] = NeoData.objects.filter(neo=obj.neo).count()
        neo_nft_dic["remain_block"] = NeoData.objects.filter(neo=obj.neo, is_used=False).count()
        return neo_nft_dic










