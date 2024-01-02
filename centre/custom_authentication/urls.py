from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

from .views import  register_user, login_user

urlpatterns = [
    # ... autres URLs ...
    path('login/', login_user, name='login_user'),
    path('register/', views.register_user, name='register'),
    


]
