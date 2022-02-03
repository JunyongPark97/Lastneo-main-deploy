from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

# Create your views here.
from neogrowth.models import ItemClassifyMeta, Big5SubSection, Tag, MainCategory, SubCategory, ItemMeta, \
    ItemDetail, PersonalityItems, Big5Question, Big5Answer, ValuesItems, Schwartz, SchwartzMeta, SchwartzAnswer


class SchwartzMetaRetrieveAPI(APIView):
    permission_classes = [AllowAny]
    """
    처음 회원가입 시 SchwartzMeta 40개 중 하나를 고르기 위해 40개에 대한 정보를 뿌려주는 API
    """

    def get(self, request, *args, **kwargs):
        """
        api: api/v1/schwartzmeta/
        method : GET
        return : [{'name', 'id'}, {'name', 'id'}]
        """
        schwartz_meta_list = []
        for i in range(SchwartzMeta.objects.count()):
            i = i+1
            name = SchwartzMeta.objects.get(pk=i).name
            meta_info_dic = {'id': i, 'name': name}
            schwartz_meta_list.append(meta_info_dic)
        return Response(schwartz_meta_list, status=status.HTTP_200_OK)
