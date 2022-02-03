from django.contrib import admin

from blockchain.models import NeoBlock, NeoData


class NeoDataAdmin(admin.ModelAdmin):
    list_display = ['neo_image', 'hash_value', 'is_used', 'neo_upper_image']


class NeoBlockAdmin(admin.ModelAdmin):
    list_display = ['neo', 'index', 'timestamp', 'proof', 'previous_hash']


admin.site.register(NeoBlock, NeoBlockAdmin)
admin.site.register(NeoData, NeoDataAdmin)


