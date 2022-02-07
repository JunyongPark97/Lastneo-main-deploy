from rest_framework import serializers, exceptions

from nft.models import NFT


class NFTCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = NFT

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        return None