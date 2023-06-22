from django.urls import path
from .views import (
    CampaignListApiView,
    CampaignDetailApiView,
    SubscribeToACampaignApiView,
)

urlpatterns = [
    path("campaigns/", CampaignListApiView.as_view(), name="campaigns"),
    path(
        "campaigns/<str:slug>", CampaignDetailApiView.as_view(), name="target_campaign"
    ),
    path("subscribe/", SubscribeToACampaignApiView.as_view(), name="subscribe"),
]
