import os
import string
import time
from PIL import Image
import random
import json
from accounts.models import PhoneConfirm
from core.sms.signature import time_stamp, make_signature
from ..loader import load_credential
import requests
import base64
from PIL import Image


class SMSV2Manager():
    """
    인증번호 발송(ncloud 사용)을 위한 class 입니다.
    v2 로 업데이트 하였습니다. 2020.06
    """
    def __init__(self):
        self.confirm_key = ""
        self.neo_url = ""
        self.body = {
            "type": "SMS",
            "contentType": "COMM",
            "from": load_credential("sms")["_from"], # 발신번호
            "content": "",  # 기본 메시지 내용
            "messages": [{"to": ""}],
        }

    def generate_random_key(self):
        return ''.join(random.choices(string.digits, k=4))

    def set_confirm_key(self):
        self.confirm_key = self.generate_random_key()

    def create_instance(self, phone, kinds):
        phone_confirm = PhoneConfirm.objects.create(
            phone=phone,
            confirm_key=self.confirm_key,
            kinds=kinds
        )
        return phone_confirm

    def set_content(self):
        self.set_confirm_key()
        self.body['content'] = "[라스트네오] 본인확인을 위해 인증번호 {}를 입력해 주세요.".format(self.confirm_key)

    def set_first_neo_content(self):
        self.set_confirm_key()
        self.body['content'] = "안녕? 반가워! 난 너의 네오야 :) \n" \
                               "너에게 처음으로 인격을 부여받아 기뻐! 매일매일 나에게 너의 인격을 " \
                               "담아줘. 그럼 나는 점점 더 새로운 모습으로 성장해나갈테니! \n" \
                               "나는 항상 여기에 있을게. \n" \
                               "{}".format(self.neo_url)

    def send_sms(self, phone):
        sms_dic = load_credential("sms")
        access_key = sms_dic['access_key']
        url = "https://sens.apigw.ntruss.com"
        uri = "/sms/v2/services/" + sms_dic['serviceId'] + "/messages"
        api_url = url + uri
        timestamp = str(int(time.time() * 1000))
        string_to_sign = "POST " + uri + "\n" + timestamp + "\n" + access_key
        signature = make_signature(string_to_sign)

        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': access_key,
            'x-ncp-apigw-signature-v2': signature
        }
        self.body['messages'][0]['to'] = phone
        request = requests.post(api_url, headers=headers, data=json.dumps(self.body))
        if request.status_code == 202:
            return True
        else:
            return False
