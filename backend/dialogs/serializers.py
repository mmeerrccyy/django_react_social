from rest_framework import serializers
from .models import DialogModel


class DialogListSerializer(serializers.Serializer):
    participant_id = serializers.UUIDField()
    participant_username = serializers.CharField()
