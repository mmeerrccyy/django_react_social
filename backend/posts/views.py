from django.utils.decorators import decorator_from_middleware_with_args
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from authentication.middleware import AuthMiddleware
from firstapp.paginators import StandardResultsSetPagination
from posts.models import PostModel
from posts.serializers import PostSerializerList, PostSerializerCreate


class PostView(viewsets.GenericViewSet):
    pagination_class = StandardResultsSetPagination
    access_control = decorator_from_middleware_with_args(AuthMiddleware)

    def get_serializer_class(self):
        if self.action in ["users_posts", "me_posts"]:
            return PostSerializerList
        if self.action in ["create_post", "update_post"]:
            return PostSerializerCreate

    @action(detail=False, methods=["get"], url_path=r"(?P<user_id>[^/.]+)")
    def users_posts(self, request, user_id):
        posts = PostModel.objects.filter(user_id=user_id)
        serialized_data = self.get_serializer_class()(posts, many=True)
        return self.get_paginated_response(self.paginate_queryset(serialized_data.data))

    @access_control()
    @action(detail=False, methods=["get"], url_path=r"me")
    def me_posts(self, request):
        posts = PostModel.objects.filter(author_id=self.user.id)
        serialized_data = self.get_serializer_class()(posts, many=True)
        return self.get_paginated_response(self.paginate_queryset(serialized_data.data))

    @access_control()
    @action(detail=False, methods=["post"], url_path=r"create")
    def create_post(self, request):
        serialized_data = self.get_serializer_class()(data=request.data)
        if serialized_data.is_valid():
            new_post = PostModel(text=serialized_data.validated_data["text"], author_id=self.user.id)
            new_post.save()
            return Response(PostSerializerList(new_post).data, status=status.HTTP_201_CREATED)
        return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)

    @access_control()
    @action(detail=False, methods=["get"], url_path=r"(?P<post_id>[^/.]+)/like")
    def like_post(self, request, post_id):
        try:
            found_post = PostModel.objects.get(id=post_id)
        except PostModel.DoesNotExist:
            return Response({"error": "Post not found!"}, status=status.HTTP_404_NOT_FOUND)
        if self.user.id in found_post.liked:
            found_post.liked.remove(self.user.id)
            found_post.save()
        else:
            found_post.liked.append(self.user.id)
            found_post.save()
        return Response(PostSerializerList(found_post).data, status=status.HTTP_200_OK)

    @access_control()
    @action(detail=False, methods=["delete"], url_path=r"(?P<post_id>[^/.]+)/delete")
    def delete_post(self, request, post_id):
        try:
            found_post = PostModel.objects.get(id=post_id)
        except PostModel.DoesNotExist:
            return Response({"error": "Post not found!"}, status=status.HTTP_404_NOT_FOUND)
        if self.user.id != found_post.author_id:
            return Response({"error": "You can not delete this post!"}, status=status.HTTP_403_FORBIDDEN)
        found_post.delete()
        return Response(status=status.HTTP_200_OK)

    @access_control()
    @action(detail=False, methods=["put"], url_path=r"(?P<post_id>[^/.]+)/update")
    def update_post(self, request, post_id):
        try:
            found_post = PostModel.objects.get(id=post_id)
        except PostModel.DoesNotExist:
            return Response({"error": "Post not found!"}, status=status.HTTP_404_NOT_FOUND)
        if self.user.id != found_post.author_id:
            return Response({"error": "You can not update this post!"}, status=status.HTTP_403_FORBIDDEN)
        serialized_data = self.get_serializer_class()(data=request.data)
        if serialized_data.is_valid():
            found_post.text = serialized_data.validated_data["text"]
            found_post.save()
            return Response(PostSerializerList(found_post).data, status=status.HTTP_200_OK)
        return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], url_path=r"(?P<post_id>[^/.]+)/get")
    def get_post(self, request, post_id):
        try:
            found_post = PostModel.objects.get(id=post_id)
        except PostModel.DoesNotExist:
            return Response({"error": "Post not found!"}, status=status.HTTP_404_NOT_FOUND)
        return Response(PostSerializerList(found_post).data, status=status.HTTP_200_OK)
