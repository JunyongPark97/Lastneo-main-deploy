from django.urls import path, include

from .routers import router

from accounts.views import NickNameIsDuplicatedAPIView

app_name = 'accounts'


urlpatterns = [
    path('', include(router.urls)),
    path('check_nickname/', NickNameIsDuplicatedAPIView.as_view())
]