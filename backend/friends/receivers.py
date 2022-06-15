from django.dispatch import receiver

from authentication.models import User
from authentication.send_websocket import websocket_send
from authentication.websocket import WSMessage
from friends import signals


@receiver(signals.friend_request)
def friend_request(sender, receiver_user: User, follower: User, **kwargs):
    payload = {
        "follower_id": str(follower.id),
        "follower_username": follower.username
    }
    msg = WSMessage("new-follower", payload)
    websocket_send(f"users_{receiver_user.id}", msg.type, msg.payload)
