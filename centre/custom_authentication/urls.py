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
    path('userforms/detail/<int:pk>/', UserFormViewSetlist.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='userform-detail'),
    path('userforms/list/<str:username>/', UserFormViewSetlist.as_view({'get': 'list_by_username'}), name='userform-list-by-username'),
    path('user-forms/', UserFormViewSetlist.as_view({'get': 'list', 'post': 'create'}), name='userforms-list'),
    path('userforms/update/<int:pk>/', UserFormViewSetlistupdate.as_view({'put': 'update'}), name='userform-update'),

#http://localhost:8000/auth/user-forms/admin/

]
