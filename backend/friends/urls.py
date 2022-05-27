from rest_framework import routers

from friends.views import FriendsView

router = routers.SimpleRouter()

router.register("friends", FriendsView, basename="friends")
