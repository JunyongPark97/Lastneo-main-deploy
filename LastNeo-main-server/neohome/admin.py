from django.contrib import admin
from django.contrib.auth.models import Permission
from django import forms
from rest_framework.authtoken.models import Token

from neohome.models import NeoHome, NeoHomeMeta

# Register your models here.


class NeoHomeAdmin(admin.ModelAdmin):
    list_display = ['id', 'neo', 'home_meta', 'nickname', 'description']


class NeoHomeMetaAdmin(admin.ModelAdmin):
    list_display = ['id', 'home_image', 'description']


admin.site.register(NeoHomeMeta, NeoHomeMetaAdmin)
admin.site.register(NeoHome, NeoHomeAdmin)
