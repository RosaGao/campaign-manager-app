from django.db import models

# Create your models here.


class Campaigns(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=200)
    slug = models.SlugField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
