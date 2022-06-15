from rest_framework import routers

from dialogs.views import DialogView

router = routers.SimpleRouter()

router.register("dialogs", DialogView, "dialog-app")
