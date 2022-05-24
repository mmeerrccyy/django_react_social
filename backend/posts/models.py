from django.db import models

# Create your models here.
from firstapp.models import DateTimeModel


class PostModel(DateTimeModel):
    text = models.TextField(blank=False, null=False)
    author_id = models.UUIDField(blank=False, null=False)
