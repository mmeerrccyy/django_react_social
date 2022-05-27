import os
from typing import List

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import OriginValidator
from django.core.asgi import get_asgi_application
from django.conf import settings

from authentication.middleware import TokenAuthMiddleware

import authentication.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django_asgi_app = get_asgi_application()


def build_protocol_type_router(allowed_hosts: List = None):
    if allowed_hosts is None:
        if settings.DEBUG == True:
            allowed_hosts = ['*']
        else:
            hosts = settings.ALLOWED_HOSTS
            allowed_hosts = []
            for host in hosts:
                allowed_hosts.append('http://{}'.format(host))
                allowed_hosts.append('https://{}'.format(host))
    return ProtocolTypeRouter({
        "http": django_asgi_app,
        "websocket": OriginValidator(
            TokenAuthMiddleware(
                URLRouter(
                    authentication.routing.websocket_urlpatterns
                )
            ),
            allowed_hosts
        ),
    })


application = build_protocol_type_router()
