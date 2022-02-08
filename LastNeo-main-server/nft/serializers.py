from rest_framework import serializers, exceptions

from nft.models import NFT
from blockchain.models import NeoData


class NFTCreateSerializer(serializers.ModelSerializer):
    neo = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = NFT
        fields = ['neo', 'nft_image']

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):

        nft_image = validated_data['nft_image']
        nft = NFT.objects.create(neo=self.context['user'], nft_image=nft_image)
        nft.save()

        self._neo_data_is_used()

        return nft

    def _neo_data_is_used(self):
        neodata_qs = NeoData.objects.filter(neo=self.context['user'], is_used=False)
        neodata_qs.update(is_used=True)