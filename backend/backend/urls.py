"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from firstapp.urls import router as firstapp_router
from posts.urls import router as posts_router
from friends.urls import router as friends_router
from dialogs.urls import router as dialog_router
from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(firstapp_router.urls)),
    path("api/", include(posts_router.urls)),
    path("api/", include(friends_router.urls)),
    path("api/", include(dialog_router.urls)),
    # path("api/auth/",  include('rest_framework.urls')),
    path("api/auth/",  include('djoser.urls')),
    path("api/auth/",  include('djoser.urls.authtoken')),
    path("api/auth/",  include('djoser.urls.jwt')),
]

urlpatterns += doc_urls
