from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

from .views import  *
# Initialise le routeur

urlpatterns = [
    # ... autres URLs ...
    path('login/', login_user, name='login_user'),
    path('register/', views.register_user, name='register'),
    # Inclut les URLs générées par le routeur pour UserFormViewSet
    path('user-forms/<str:username>/', UserFormViewSetlist.as_view({        'get': 'list', 
        'put': 'update', 
        'delete': 'destroy'}), name='user-forms-list'),
    path('user-forms/', UserFormViewSetlist.as_view({'get': 'list', 'post': 'create'}), name='userforms-list'),
#http://localhost:8000/auth/user-forms/admin/

]
