from rest_framework import serializers

from authentication.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "followers", "following", "friends")


class MinimalUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username")


class MyFriendsSerializer(serializers.ModelSerializer):

    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    friends = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("followers", "following", "friends")

    def get_followers(self, obj):
        followers = []
        for follower in obj.followers:
            followers.append(MinimalUserSerializer(follower).data)
        return followers

    def get_following(self, obj):
        following = []
        for follow in obj.followers:
            following.append(MinimalUserSerializer(follow).data)
        return following

    def get_friends(self, obj):
        friends = []
        for friend in obj.followers:
            friends.append(MinimalUserSerializer(friend).data)
        return friends

