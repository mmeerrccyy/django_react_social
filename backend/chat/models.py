from django.contrib.postgres.fields import ArrayField
from django.db import models

from firstapp.models import DateTimeModel


class ChatModel(DateTimeModel):
    participants = ArrayField(models.UUIDField(), default=list, null=False)
    chat_name = models.CharField(default="Chat", null=False, max_length=45)


class ChatMessageModel(DateTimeModel):
    author_id = models.UUIDField(blank=False, null=False)
    message = models.TextField(blank=False, null=False)
    response_to = models.UUIDField(blank=True, null=True)
    responses = ArrayField(models.UUIDField(), default=list, null=False)
