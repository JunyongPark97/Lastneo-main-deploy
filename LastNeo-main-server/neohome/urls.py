from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import NeoHomeDoorAPI, NeoHomeGuestViewSet, NeoHomeOwnerViewSet, Big5QuestionsViewSet,\
    NFTViewSet, NeoHomeIsOwnerAPIView, NeoHomeIntroductionAPIView

app_name = 'neohome'

router = DefaultRouter()
router.register('neohomeguest', NeoHomeGuestViewSet, basename='neohomeguest')
router.register('neohomeowner', NeoHomeOwnerViewSet, basename='neohomeowner')
router.register('big5question', Big5QuestionsViewSet, basename='big5question')
router.register('nftblock', NFTViewSet, basename='nftblock')

urlpatterns = [
    path('', include(router.urls)),
    path('door/', NeoHomeDoorAPI.as_view()),
    path('is_owner/', NeoHomeIsOwnerAPIView.as_view()),
    path('homeintroduction/', NeoHomeIntroductionAPIView.as_view())
]