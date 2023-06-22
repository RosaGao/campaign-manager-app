from django.db import models
from django.template.defaultfilters import slugify
from cloudinary.models import CloudinaryField


class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=200)
    slug = models.SlugField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    logo = CloudinaryField(
        "image", overwrite=True, format="jpg"
    )  # new uploads overwrite previous one

    class Meta:
        ordering = [
            "-created_at",  # descending order, most recent first
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        slug_to_assign = slugify(self.title)  # slugs must be unique
        if Campaign.objects.filter(slug=slug_to_assign).exists():
            slug_to_assign = slug_to_assign + Campaign.objects.all().count()
        self.slug = slug_to_assign

        super().save(*args, **kwargs)


class Subscriber(models.Model):
    # a campaign has many subscribers
    campaign = models.ForeignKey(to=Campaign, on_delete=models.DO_NOTHING)
    email = models.EmailField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return self.email
