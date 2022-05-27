from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework import status
from rest_framework.authtoken.models import Token
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


@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        query_strings = parse_qs(scope["query_string"])
        auth_token = query_strings.get(b"Authorization", None)
        if auth_token:
            try:
                auth_token = (auth_token[0]).decode("utf-8")
                token_name, token_key = auth_token.split()
                if token_name == "Token":
                    pass
                    # token_key = token_key
                else:
                    token_key = None
            except ValueError:
                token_key = None
        else:
            token_key = None

        if token_key is None:
            scope["user"] = AnonymousUser()
        else:
            scope["user"] = await get_user(token_key)
        return await super().__call__(scope, receive, send)
