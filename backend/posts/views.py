from django.utils.decorators import decorator_from_middleware_with_args
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from authentication.middleware import AuthMiddleware
from firstapp.paginators import StandardResultsSetPagination
from posts.models import PostModel
from posts.serializers import PostSerializerList


class PostView(viewsets.GenericViewSet):
    pagination_class = StandardResultsSetPagination
    access_control = decorator_from_middleware_with_args(AuthMiddleware)

    def get_serializer_class(self):
        if self.action == "users_posts":
            return PostSerializerList

    @action(detail=False, methods=["get"], url_path=r"(?P<user_id>[^/.]+)")
    def users_posts(self, request, user_id):
        objects = PostModel.objects.all()
        serialized_data = self.get_serializer_class()(objects, many=True)
        return self.get_paginated_response(self.paginate_queryset(serialized_data.data))

    @access_control()
    @action(detail=False, methods=["post"], url_path="create")
    def create_post(self, request):
        # TODO: add creating posts
        return Response({"test": 123})

