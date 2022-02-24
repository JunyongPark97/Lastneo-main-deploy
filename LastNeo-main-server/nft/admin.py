from django.contrib import admin

from nft.models import NFT


class NFTAdmin(admin.ModelAdmin):
    list_display = ['neo', 'nft_image', 'created_at']

    def save_model(self, request, obj, form, change):
        # TODO : NFT 발급 문자 발송
        print("NFT Request!")
        super().save_model(request, obj, form, change)


admin.site.register(NFT, NFTAdmin)
