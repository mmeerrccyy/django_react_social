from django.utils.decorators import decorator_from_middleware_with_args
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from authentication.middleware import AuthMiddleware
from authentication.models import User
from friends import signals
from friends.serializers import UserSerializer
from firstapp.paginators import StandardResultsSetPagination


class FriendsView(viewsets.GenericViewSet):
    pagination_class = StandardResultsSetPagination
    access_control = decorator_from_middleware_with_args(AuthMiddleware)

    def get_serializer_class(self):
        pass

    @access_control()
    @action(detail=False, methods=["get"], url_path=r"(?P<user_id>[^/.]+)/follow")
    def follow_unfollow_user(self, request, user_id):
        try:
            found_user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found!"}, status=status.HTTP_404_NOT_FOUND)
        if self.user.id == found_user.id:
            return Response(status=status.HTTP_200_OK)
        if self.user.id not in found_user.followers and self.user.id not in found_user.friends:
            found_user.followers.append(self.user.id)
            self.user.following.append(found_user.id)
            if self.user.id in found_user.following and found_user.id in self.user.following:
                self.user.friends.append(found_user.id)
                self.user.following.remove(found_user.id)
                self.user.followers.remove(found_user.id)
                found_user.friends.append(self.user.id)
                found_user.following.remove(self.user.id)
                found_user.followers.remove(self.user.id)
            found_user.save()
            self.user.save()
            signals.friend_request.send(sender=self.__class__, receiver_user=found_user, follower=self.user)
            return Response(UserSerializer(self.user).data, status=status.HTTP_200_OK)
        if self.user.id in found_user.followers:
            if found_user.id in self.user.following:
                self.user.following.remove(found_user.id)
            found_user.followers.remove(self.user.id)
            found_user.save()
            self.user.save()
            return Response(UserSerializer(self.user).data, status=status.HTTP_200_OK)
        if self.user.id in found_user.friends:
            if self.user.id not in found_user.following:
                found_user.following.append(self.user.id)
            if found_user.id not in self.user.followers:
                self.user.followers.append(found_user.id)
            if self.user.id in found_user.friends:
                found_user.friends.remove(self.user.id)
            if found_user.id in self.user.friends:
                self.user.friends.remove(found_user.id)
            found_user.save()
            self.user.save()
            return Response(UserSerializer(self.user).data, status=status.HTTP_200_OK)


