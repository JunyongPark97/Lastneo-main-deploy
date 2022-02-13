from django.db import models

from django.conf import settings

# Create your models here.


def nft_directory_path(instance, filename):
    return 'nft/{}/{}'.format(instance.neo.id, instance.id)


class NFT(models.Model):
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='nfts')
    nft_image = models.ImageField(null=True, blank=True, upload_to=nft_directory_path)
    opensea_link = models.CharField(null=True, blank=True, max_length=200, help_text="NFT 발급 시 opensea link")
    created_at = models.DateTimeField(auto_now_add=True)