from rest_framework import serializers

from posts.models import PostModel


class PostSerializerList(serializers.ModelSerializer):

    class Meta:
        model = PostModel
        fields = "__all__"


class PostSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = PostModel
        fields = ("text", )