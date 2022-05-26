from django.contrib.auth.models import AnonymousUser

from rest_framework import status
from rest_framework.response import Response


class AuthMiddleware:
    def __init__(self, get_response, *args):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, viewset, view_func, view_args, view_kwargs):
        if type(viewset.request.user) == AnonymousUser:
            return Response({"error": "Authorization required!"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            viewset.user = viewset.request.user
