from rest_framework import routers
from .views import FirstAppView

router = routers.SimpleRouter()

router.register("test", FirstAppView, basename="test-firstapp")
