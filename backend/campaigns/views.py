from django.shortcuts import render
from rest_framework import generics, response, status
from .serializers import CampaignSerializer, SubscriberSerializer
from .models import Campaign, Subscriber


# GET - return all campaigns
class CampaignListApiView(generics.ListAPIView):
    # allow for data serialization/deserialization/validation
    serializer_class = CampaignSerializer

    # `auto` return 200 OK once query_set is populated
    # `auto` include serialized data as response body using serializer_class
    def get_queryset(self):
        return Campaign.objects.all()


# GET - return detail of a campaign
class CampaignDetailApiView(generics.GenericAPIView):
    serializer_class = CampaignSerializer

    # can implement any custom request method in GenericAPIView
    def get(self, request, slug):
        target_campaign = Campaign.objects.filter(slug=slug).first()
        if target_campaign:
            return response.Response(
                self.serializer_class(target_campaign).data, status=status.HTTP_200_OK
            )
        else:
            return response.Response(
                "Campaign does not exist!", status=status.HTTP_404_NOT_FOUND
            )


# POST - create a Subscriber to a specific campaign
class SubscribeToACampaignApiView(generics.CreateAPIView):
    # return 201 Created if success
    # return the new Subscriber
    serializer_class = SubscriberSerializer

    def get_queryset(self):
        return Subscriber.objects.all()
