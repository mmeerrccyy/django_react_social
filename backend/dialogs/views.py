from django.db.models import Q
from django.utils.decorators import decorator_from_middleware_with_args
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from authentication.middleware import AuthMiddleware
from authentication.models import User
from dialogs.serializers import DialogListSerializer
from firstapp.paginators import StandardResultsSetPagination
from dialogs.models import DialogModel, DialogMessageModel


class DialogView(viewsets.GenericViewSet):
    pagination_class = StandardResultsSetPagination
    access_control = decorator_from_middleware_with_args(AuthMiddleware)

    def get_serializer_class(self):
        if self.action in ["dialog_list"]:
            return DialogListSerializer

    @access_control()
    @action(detail=False, methods=["get"], url_path=r"list")
    def dialog_list(self, request):
        dialogs = []

        all_dialogs_for_user = DialogModel.objects.filter(
            Q(participant_01=self.user.id) or Q(participant_02=self.user.id)
        )

        for dialog in all_dialogs_for_user:
            try:
                if dialog.participant_01 == self.user.id:
                    participant_username = User.objects.get(id=dialog.participant_02).get_username()
                    participant_id = dialog.participant_02
                elif dialog.participant_02 == self.user.id:
                    participant_username = User.objects.get(id=dialog.participant_01).get_username()
                    participant_id = dialog.participant_01
                else:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except User.DoesNotExist:
                participant_username = "Deleted"
            dialogs.append({
                "participant_id": participant_id,
                "participant_username": participant_username
            })

        serialized_data = self.get_serializer_class()(dialogs, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    @access_control()
    @action(detail=False, methods=["get"], url_path=r"(?P<dialog_id>[^/.]+)/messages")
    def dialog_messages(self, request, dialog_id):
        try:
            dialog = DialogModel.objects.get(Q(dialog_id=dialog_id) and (Q(participant_01=self.user.id) or Q(participant_02=self.user.id)))
        except DialogModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        dialog_messages = DialogMessageModel.objects.filter(dialog_id=dialog.id)