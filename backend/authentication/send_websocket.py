from typing import Dict

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def websocket_send(user_group: str, event_id: str, payload: Dict) -> bool:
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        user_group,
        {
            'type': "raw.message",
            'message': {
                "event_id": event_id,
                "payload": payload,
            }
        }
    )
    return True
