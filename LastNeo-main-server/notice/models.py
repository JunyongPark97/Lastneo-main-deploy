from django.db import models


class PrivacyPolicyLink(models.Model):
    """
    개인정보 처리방침 링크입니다.
    """
    link = models.URLField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = '[1] 개인정보처리방침-링크'


class TermsOfServiceLink(models.Model):
    """
    이용약관 링크입니다.
    """
    link = models.URLField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = '[2] 이용약관-링크'


class MarketingServiceLink(models.Model):
    """
    마케팅 수신여부에 들어가는 링크입니다.
    """
    link = models.URLField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = '[3] 마케팅수신-링크'