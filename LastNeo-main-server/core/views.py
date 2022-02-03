from django.db import transaction, OperationalError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
import datetime
import time
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from accounts.models import PhoneConfirm, User
from accounts.serializers import SMSSignupPhoneCheckSerializer, SMSSignupPhoneConfirmSerializer,\
    SMSResetPasswordPhoneCheckSerializer, SMSResetPasswordPhoneConfirmSerializer
from core.sms.utils import SMSV2Manager


class SMSViewSet(viewsets.GenericViewSet):
    """
    sms 전송시 공통으로 사용하는 Viewset
    """
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'send':
            serializer = SMSSignupPhoneCheckSerializer
        elif self.action == 'confirm':
            serializer = SMSSignupPhoneConfirmSerializer
        elif self.action == 'reset_pw_send':
            serializer = SMSResetPasswordPhoneCheckSerializer
        elif self.action == 'reset_pw_confirm':
            serializer = SMSResetPasswordPhoneConfirmSerializer
        else:
            serializer = super(SMSViewSet, self).get_serializer_class()
        return serializer

    @action(methods=['post'], detail=False)
    def send(self, request, *args, **kwargs):
        """
        회원가입시 인증번호 발송하는 api입니다.
        api: api/v1/sms/send
        method: POST
        data: {'phone'}
        """
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            phone = serializer.validated_data['phone']
            sms_manager = SMSV2Manager()
            sms_manager.set_content()
            sms_manager.create_instance(phone=phone, kinds=PhoneConfirm.SIGN_UP)

            if not sms_manager.send_sms(phone=phone):
                return Response("Failed send sms", status=status.HTTP_410_GONE)

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False)
    def confirm(self, request, *args, **kwargs):
        """
        회원가입시 인증번호 인증 api입니다. 인증시 다음페이지에서 사용할 phone 을 리턴합니다.
        api: api/v1/sms/confirm
        method: POST
        data: {'phone', 'confirm_key'}
        """
        data = request.data
        serializer = self.get_serializer(data=data)
        if not serializer.is_valid(raise_exception=True):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({'phone': serializer.validated_data['phone']}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def reset_pw_send(self, request, *args, **kwargs):
        """
        비밀번호 변경시 인증번호 발송하는 api입니다.
        api: api/v1/sms/reset_pw_send/
        method: POST
        data: {'phone', 'nickname'}
        """
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            phone = serializer.validated_data['phone']
            sms_manager = SMSV2Manager()
            sms_manager.set_content()
            sms_manager.create_instance(phone=phone, kinds=PhoneConfirm.RESET_PASSWORD)

            if not sms_manager.send_sms(phone=phone):
                return Response("Failed send sms", status=status.HTTP_410_GONE)

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False)
    def reset_pw_confirm(self, request, *args, **kwargs):
        """
        비밀번호 변경시 인증번호 인증 api입니다. 인증시 다음페이지에서 사용할 phone 을 리턴합니다.
        api: api/v1/sms/reset_pw_confirm
        method: POST
        data: {'phone', 'confirm_key'}
        """
        data = request.data
        serializer = self.get_serializer(data=data)
        if not serializer.is_valid(raise_exception=True):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({'phone': serializer.validated_data['phone']}, status=status.HTTP_200_OK)