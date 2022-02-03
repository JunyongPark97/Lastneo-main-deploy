import json
import requests

from .loader import load_credential


def nft_request_slack_message(message):
    incomming_url = load_credential("slack", "")['NFTRequestUrl']
    post_data = {"text": '{}'.format(message)}
    data = json.dumps(post_data)
    headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
    response = requests.post(incomming_url, headers=headers, data=data)
    return None


def lastneo_signup_slack_message(message):
    incomming_url = load_credential("slack", "")['LastNeoSignupUrl']
    post_data = {"text": '{}'.format(message)}
    data = json.dumps(post_data)
    headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
    response = requests.post(incomming_url, headers=headers, data=data)
    return None




