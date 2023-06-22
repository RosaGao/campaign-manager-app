from django.contrib import admin
from .models import Campaign, Subscriber


class CampaignModelAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "created_at", "updated_at")
    search_fields = ("title", "description")
    list_per_page = 5


class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ("email", "campaign", "created_at")
    search_fields = (
        "email",
        "campaign__title",
    )
    list_per_page = 5


admin.site.register(Campaign, CampaignModelAdmin)
admin.site.register(Subscriber, SubscriberModelAdmin)
