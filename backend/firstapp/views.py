from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action


class FirstAppView(viewsets.ViewSet):

    @action(detail=False, methods=["get"], url_path="first_app")
    def first_app_get(self, request):
        return Response({"message": "All ok"}, status=status.HTTP_200_OK)

