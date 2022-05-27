import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser

from authentication.models import User
from authentication.send_websocket import websocket_send as ws_send


class WSMessage:
    def __init__(self, type: str, payload: dict):
        self.type = self._is_valid_type(type)
        self.payload = self._is_valid_payload(payload)

    def _is_valid_type(self, tp):
        if type(tp) is not str:
            raise ValueError("Type must be string.")
        return tp

    def _is_valid_payload(self, payload):
        try:
            json.dumps(payload)
            return payload
        except:
            raise ValueError("Payload is not json serializable.")

    @property
    def message(self):
        return {
            "type": "raw.message",
            "message": {
                "event_id": self.type,
                "payload": self.payload
            }
        }


class   WSConsumer(WebsocketConsumer):

    @classmethod
    def websocket_send(
            cls,
            ws_user: User,
            ws_event_id: str,
            ws_payload: dict) -> bool:
        # This method send websocket payload to a user
        if ws_user.is_authenticated:
            ws_send("users_{}".format(ws_user.id), ws_event_id, ws_payload)
            return True
        else:
            return False

    def connect(self):
        self.user = self.scope["user"]
        if self.user == AnonymousUser():
            self.close()
        else:
            async_to_sync(self.channel_layer.group_add)(
                "users_{}".format(self.user.id),
                self.channel_name
            )
            self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "users_{}".format(self.user.id),
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        self.send(text_data=json.dumps({
            "type": text_data_json["type"],
            "message": message
        }))

    def raw_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            "type": event["type"],
            "message": message
        }))

    def user_logged_in(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            "type": event["type"],
            "message": message
        }))

    def user_logged_out(self, event):
        self.close()


class WSWrongPathConsumer(WebsocketConsumer):
    def connect(self):
        self.close()
