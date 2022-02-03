from django.contrib import admin
from django.contrib.auth.models import Permission
from django import forms
from rest_framework.authtoken.models import Token

from accounts.models import User, PhoneConfirm, MBTIMain, MBTISkin


class UserStaffAdmin(admin.ModelAdmin):
    list_display = ['id', 'phone', 'is_active', 'is_staff', 'created_at']
    search_fields = ['phone']


class PhoneConfirmAdmin(admin.ModelAdmin):
    list_display = ['phone', 'confirm_key', 'is_confirmed', 'is_used', 'created_at', 'kinds']


class MBTIMainAdmin(admin.ModelAdmin):
    list_display = ['id', 'version', 'mbti_image', 'mbti_upper_image', 'mbti_name', 'description', 'character_name']


class MBTISkinAdmin(admin.ModelAdmin):
    list_display = ['id', 'skin_image', 'skin_upper_image', 'layer_level', 'get_mbti_main_name', 'description',
                    'skin_status']

    def get_mbti_main_name(self, obj):
        return obj.mbti_main.mbti_name


admin.site.register(MBTISkin, MBTISkinAdmin)
admin.site.register(MBTIMain, MBTIMainAdmin)
admin.site.register(User, UserStaffAdmin)
admin.site.register(PhoneConfirm, PhoneConfirmAdmin)
