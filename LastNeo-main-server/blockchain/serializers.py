from time import time

from rest_framework import serializers, exceptions
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _

from blockchain.models import NeoBlock, NeoData
from accounts.models import User

from django.core.files.images import ImageFile

import hashlib
import json

from time import time
from urllib.parse import urlparse
from uuid import uuid4

import requests


class NeoDataInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeoData
        fields = ("hash_value", "neo_image")


class NeoDataCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = NeoData
        fields = ("neo", "hash_value")

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        user_id = validated_data["neo"].id
        hash_key = validated_data["hash_value"]

        user = User.objects.get(pk=user_id)
        neodata = NeoData.objects.create(neo=user, hash_value=hash_key)
        neodata.save()

        return neodata


class NeoBlockCreateSerializer(serializers.ModelSerializer):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.chain = []
        self.current_transactions = []
        self.nodes = set()

    class Meta:
        model = NeoBlock
        fields = ("neo", "index", "proof", "previous_hash")

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        self.user_id = validated_data["neo"].id
        proof = validated_data["proof"]
        previous_hash = validated_data["previous_hash"]
        index = validated_data["index"]

        self.user = User.objects.get(pk=self.user_id)
        neoblock, _ = NeoBlock.objects.get_or_create(neo=self.user, proof=proof, previous_hash=previous_hash,
                                           index=index)
        neoblock_qs = NeoBlock.objects.filter(neo=self.user)
        for neoblock_obj in neoblock_qs.iterator():
            block_data = {
                'proof': neoblock_obj.proof,
                'previous_hash': neoblock_obj.previous_hash,
                'index': neoblock_obj.index,
                'timestamp': neoblock_obj.timestamp
            }
            self.chain.append(block_data)
        if neoblock_qs.count() == 1:
            self.chain = []

        hash_key = self._create_next_block(neoblock.proof, neoblock.previous_hash, self.chain)

        neoblock.save()

        return hash_key

    # 1. PoW 계산하기
    # 2. 보상으로 채굴자에게 거래 추가 보상인 1코인 지급
    # 3. 새 블록을 체인에 추가
    # We run the PoW algorithm to get the next proof...
    def _create_next_block(self, proof, previous_hash, chain):

        blockchain = BlockChain(initial_hash=previous_hash, proof=proof, chain=chain)
        last_block = blockchain.last_block
        last_proof = last_block['proof']
        proof = blockchain.proof_of_work(last_proof)

        # Add block to the existing chain
        previous_hash = blockchain.hash(last_block)
        block = blockchain.new_block(proof, previous_hash)

        response = {
            'message': "New Block Forged",
            'index': block['index'],
            'transactions': block['transaction'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash']
        }
        print(response)

        next_neoblock = NeoBlock.objects.create(neo=self.user, proof=block['proof'],
                                                previous_hash=block['previous_hash'], index=block['index'],
                                                timestamp=time())
        next_neoblock.save()

        return next_neoblock.previous_hash


class BlockChain(object):
    def __init__(self, initial_hash, proof, chain):
        self.chain = chain
        self.current_transactions = []
        self.nodes = set()

        # generate block
        self.new_block(previous_hash=initial_hash, proof=proof)


    def register_node(self, address):
        """
        Add a new node to the list of nodes
        :param address: Address of node. Eg. 'http://192.168.0.5:5000'
        """

        parsed_url = urlparse(address)
        if parsed_url.netloc:
            self.nodes.add(parsed_url.netloc)
        elif parsed_url.path:
            # Accepts an URL without scheme like '192.168.0.5:5000'.
            self.nodes.add(parsed_url.path)
        else:
            raise ValueError('Invalid URL')

    def valid_chain(self, chain):
        """
        Determine if a given blockchain is valid
        :param chain: A blockchain
        :return: True if valid, False if not
        """

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print("\n-----------\n")
            # Check that the hash of the block is correct
            last_block_hash = self.hash(last_block)
            if block['previous_hash'] != last_block_hash:
                return False

            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False

            last_block = block
            current_index += 1

        return True

    def resolve_conflicts(self):
        """
        This is our consensus algorithm, it resolves conflicts
        by replacing our chain with the longest one in the network.
        :return: True if our chain was replaced, False if not
        """

        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self.chain = new_chain
            return True

        return False

    # 새로운 블록을 생성하고 체인에 넣는다

    def new_block(self, proof, previous_hash):
        """
        블록체인에 들어갈 새로운 블록을 만드는 코드이다.
        index는 블록의 번호, timestamp 는 블록이 만들어진 시간, transaction 는 블록에 포함될 거래이다.
        :param proof: nonce 값으로 작업 증명에서 이 숫자보다 작게 나와야한다.
        :param previous_hash: 이전 블록의 hash 값
        :return: 생성된 블록을 반환한다.
        """
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transaction': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1])
        }

        self.current_transactions = []
        if self.chain == []:
            self.chain.append(block)
        else:
            print("NOT INITIAL")

        return block

    @staticmethod
    # 블록의 해시값을 출력한다
    def hash(block):
        """
        SHA-256을 이용하여 블록의 해시값을 구한다.
        hash 값을 만드는데 block 이 input 값으로 사용된다.
        """

        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    # 체인의 마지막 블록을 반환한다
    def last_block(self):
        return self.chain[-1]

    def new_transaction(self, sender, recipient, amount):
        """
        새로운 거래는 다음으로 채굴될 블록에 포함되게 된다. 거래는 3개의 인자로 구성되어 있다.
        :param sender: (string) 송신자의 주소로 hash 화 되어있다.
        :param recipient: (string) 수신자의 주소로 hash 화 되어있다.
        :param amount: (int) 전송되는 양
        :return: 해당 거래가 속해질 블록의 숫자
        """

        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount
        })

        return self.last_block['index'] + 1

    def proof_of_work(self, last_proof):
        """
        작업증명에 대한 간단한 설명이다:
        - p 는 이전 값, p'는 새롭게 찾아야 하는 값이다.
        - hash(pp')의 결과값이 첫 4개의 0으로 이루어질 때까지 p' 를 찾는 과정이 작업 증명과정이다.
        """

        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1

        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        작업증명 결과값을 검증하는 코드로 hash(p,p') 값의 앞 4자리가 0으로 이루어져 있는가를 확인한다.
        결과값은 boolean 으로 조건을 만족하지 못하면 false 가 반환된다.
        """
        guess = f'{last_proof}{proof}'.encode()
        guess_hash =  hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"
