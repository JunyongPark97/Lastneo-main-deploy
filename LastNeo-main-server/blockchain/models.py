from django.db import models
from django.conf import settings

import string
import random


def generate_random_key(length):
    return ''.join(random.choices(string.digits+string.ascii_letters, k=length))


def neoimage_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    return 'neoimage/{}/{}.{}'.format(instance.neo.id, generate_random_key(7), ext)


def neoupperimage_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    return 'neoupperimage/{}/{}.{}'.format(instance.neo.id, generate_random_key(7), ext)


class NeoBlock(models.Model):
    """
    NeoBlock model. 실제 블록체인에 들어가는 data 를 sql 형태로 저장한 것
    """
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='neoblock')
    index = models.IntegerField(help_text="몇 번째 체인인지 알려주는 index 값")
    timestamp = models.CharField(max_length=100, help_text="UNIX Time 저장")
    proof = models.IntegerField(default=100, help_text="블록체인의 증명 값, genesis block 의 경우 100으로 설정")
    previous_hash = models.CharField(default=1, max_length=200, help_text="이전 chain 의 hash 값, genesis block 의 경우는 1")


class NeoData(models.Model):
    """
    Neo image 가 변경될 때마다 생성되는 model. NeoBlock 의 hash 값만을 저장하고 있다.
    """
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='neodata')
    neo_image = models.ImageField(null=True, blank=True, upload_to=neoimage_directory_path)
    neo_upper_image = models.ImageField(null=True, blank=True, upload_to=neoupperimage_directory_path)
    hash_value = models.CharField(max_length=200, null=True, blank=True, help_text="만들어진 block 의 hash 값")
    is_used = models.BooleanField(default=False, help_text="NFT 를 발급받기 위해 사용됐으면 True 로 변경")