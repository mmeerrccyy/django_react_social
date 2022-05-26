from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
from firstapp.models import DateTimeModel


class PostModel(DateTimeModel):
    text = models.TextField(blank=False, null=False)
    author_id = models.UUIDField(blank=False, null=False)
    liked = ArrayField(models.UUIDField(), default=list, blank=True)
