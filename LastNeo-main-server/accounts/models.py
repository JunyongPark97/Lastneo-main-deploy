from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


def mbti_main_directory_path(instance, filename):
    return 'mbti/{}/main/{}'.format(instance.mbti_name, filename)


def mbti_main_upper_directory_path(instance, filename):
    return 'mbti/{}/upper/{}'.format(instance.mbti_name, filename)


def mbti_skin_directory_path(instance, filename):
    mbti_name = instance.mbti_main.mbti_name
    return 'mbti/{}/skin/{}'.format(mbti_name, filename)


def mbti_skin_upper_directory_path(instance, filename):
    mbti_name = instance.mbti_main.mbti_name
    return 'mbti/{}/skin_upper/{}'.format(mbti_name, filename)


class MBTIMain(models.Model):
    """
    MBTI 와 이미지가 저장되어 있는 Meta 모델입니다.
    version 에 따라 MBTI 이미지가 변경될 수 있기 때문에 따로 field 로 구분하였습니다.
    """
    version = models.IntegerField(default=1)
    mbti_image = models.ImageField(upload_to=mbti_main_directory_path)
    mbti_upper_image = models.ImageField(upload_to=mbti_main_upper_directory_path, null=True, blank=True)
    mbti_name = models.CharField(max_length=10)
    character_name = models.CharField(max_length=20, null=True, blank=True, help_text='각 MBTI 에 해당하는 캐릭터 이름')
    description = models.CharField(max_length=200, help_text="각 MBTI 의 스토리가 담긴 설명란", null=True, blank=True)

    def __str__(self):
        return '{}'.format(self.character_name)


class MBTISkin(models.Model):
    """
    MBTI 에도 layer 가 존재하기 때문에 각 MBTI 를 모두 조각내어 저장하기 위해 만든 모델입니다.
    """
    NA = 0
    ABSENCE = 1
    SURPRISING = 2
    ANGRY = 3
    SAD = 4
    FUNNY = 5
    HAPPY = 6

    KINDS = (
        (0, '해당없음'),
        (1, '무표정'),
        (2, '놀람'),
        (3, '분노'),
        (4, '슬픔'),
        (5, '즐거움'),
        (6, '행복')
    )

    skin_image = models.ImageField(upload_to=mbti_skin_directory_path)
    skin_upper_image = models.ImageField(upload_to=mbti_skin_upper_directory_path, null=True, blank=True)
    layer_level = models.IntegerField(default=0, help_text="MBTI skin 마다의 layer level 이 저장되는 field")
    mbti_main = models.ForeignKey(MBTIMain, on_delete=models.CASCADE, related_name='mbti_skins')
    description = models.CharField(max_length=100, help_text="각 MBTI 의 어떤 부분인지 설명하는 field", null=True, blank=True)
    skin_status = models.IntegerField(choices=KINDS, default=0, help_text="랜덤으로 지정되는 표정을 위해 만들어진 field")


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, password, phone, **kwargs):
        if not phone:
            raise ValueError('핸드폰 번호를 입력해주세요')
        user = self.model(phone=phone, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phone, password=None, **kwargs):
        kwargs.setdefault('is_staff', False)
        return self._create_user(password, phone, **kwargs)

    def create_superuser(self, password, phone, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError('superuser must have is_staff=True')
        if kwargs.get('is_superuser') is not True:
            raise ValueError('superuser must have is_superuser=True')
        return self._create_user(password, phone, **kwargs)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30, null=True, blank=True)
    phone = models.CharField(unique=True, max_length=20)
    USERNAME_FIELD = 'phone'
    is_active = models.BooleanField(default=True, help_text="밴시 is_active = False")
    is_staff = models.BooleanField(default=False, help_text="super_user와의 권한 구분을 위해서 새로 만들었습니다. 일반적 운영진에게 부여됩니다.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    mbti = models.ForeignKey(MBTIMain, on_delete=models.CASCADE, related_name='users', null=True)
    is_marketing = models.BooleanField(default=True, help_text="마케팅 수신 여부에 따른 boolean field")
    status = models.CharField(max_length=20, null=True, blank=True, help_text="neo 의 기분에 따른 저장 field")

    objects = UserManager()

    def __str__(self):
        if self.is_anonymous:
            return 'anonymous'
        if self.is_staff:
            return '[staff] {}'.format(self.phone)
        return self.phone


class PhoneConfirm(models.Model):
    """
    회원가입, 비밀번호 변경에만 사용하는 핸드폰 인증 모델입니다.
    설문자의 인증번호 모델은 따로 생성하여서 관리합니다.
    """
    SIGN_UP = 1
    RESET_PASSWORD = 2

    KINDS = (
        (SIGN_UP, '회원가입'),
        (RESET_PASSWORD, '비밀번호 변경'),
    )
    phone = models.CharField(max_length=20)
    confirm_key = models.CharField(max_length=4)
    kinds = models.IntegerField(choices=KINDS, default=1)
    is_confirmed = models.BooleanField(default=False)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class BannedPhoneInfo(models.Model):
    """
    어뷰징을 한 핸드폰 번호 정보들을 저장하는 모델입니다.
    """
    phone = models.CharField(max_length=20)
    description = models.TextField(help_text='밴 사유', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
