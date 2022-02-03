from django.contrib import admin

from nft.models import NFT


class NFTAdmin(admin.ModelAdmin):
    list_display = ['neo', 'nft_image', 'created_at']


admin.site.register(NFT, NFTAdmin)
