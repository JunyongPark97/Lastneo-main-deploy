from django.contrib import admin

from core.models import SMSManager


class SMSManagerAdmin(admin.ModelAdmin):
    list_display = ['to_who']


admin.site.register(SMSManager, SMSManagerAdmin)


