from rest_framework import routers
from .views import PostView

router = routers.SimpleRouter()

router.register("posts", PostView, basename="posts")
