from django.db import models

from firstapp.models import DateTimeModel


class DialogModel(DateTimeModel):
    participant_01 = models.UUIDField(blank=False, null=False)
    participant_02 = models.UUIDField(blank=False, null=False)


class DialogMessageModel(DateTimeModel):
    dialog_id = models.UUIDField(blank=False, null=False)
    author_id = models.UUIDField(blank=False, null=False)
    message = models.TextField(blank=False, null=False)
    response_to = models.UUIDField(blank=True, null=True)
