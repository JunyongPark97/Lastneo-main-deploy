from django.db import models


class SMSManager(models.Model):
    """
    마케팅 수신 동의를 한 유저에게 보낼지 아니면 전체 발송을 할지를 결정하는 SMSManager Model 입니다.
    SMSManager 의 model 은 단 하나의 db 밖에 가지고 있지 않으며, 이 단 하나의 db 는 문자 발송 대상의 정도를 나타냅니다.
    """
    ALL = 0
    IS_ALLOWED = 1

    KINDS = (
        (0, '전체발송'),
        (1, '마케팅 수신 동의 발송')
    )
    to_who = models.IntegerField(choices=KINDS, default=0)