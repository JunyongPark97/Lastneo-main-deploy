from django.db import models

from django.conf import settings

import random
import string


def home_image_directory_path(instance, filename):
    return 'home/image/{}'.format(filename)


def neo_home_image_directory_path(instance, filename):
    return 'home/{}/image/{}'.format(instance.neo, generate_random_key(7))


def generate_random_key(length):
    return ''.join(random.choices(string.digits+string.ascii_letters, k=length))


class NeoHomeMeta(models.Model):
    home_image = models.ImageField(null=True, blank=True, upload_to=home_image_directory_path)
    description = models.CharField(max_length=50, null=True, blank=True, help_text='네오 집 META 색상 설명으로 사용하는 field')


class NeoHome(models.Model):
    """
    현관 로그인 이후 보여지는 NeoHome 과 관련된 Model 입니다.
    """
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='neohome')
    hash_address = models.CharField(max_length=100, help_text="NeoHome hash key")
    num_block = models.IntegerField(default=1, help_text="만들어진 neo data 수")
    nickname = models.CharField(null=True, blank=True, max_length=20, help_text='네오집의 이름, url 형성시 https://lastneo.io/<nickname>')
    description = models.CharField(default="나를 담는 단 하나의 방법 '네오'", max_length=100, help_text="네오 집 소개글")
    home_meta = models.ForeignKey(NeoHomeMeta, null=True, blank=True, on_delete=models.CASCADE, related_name='neohomes')
    # neo_home_image = models.ImageField(null=True, blank=True, upload_to=neo_home_image_directory_path)


class Visitor(models.Model):
    """
    NeoHome 에 방문한 방문자와 관련된 model 입니다.
    """
    neohome = models.ForeignKey(NeoHome, on_delete=models.CASCADE, related_name='visitors')
    created_at = models.DateTimeField(auto_now_add=True)