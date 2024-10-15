# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import CustomUserSerializer,UserFormWithContratFormSerializer,ContratFormSerializer
from .serializers import UserFormWithContratFormUpdateSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
#############
#imports for formulaires
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserForm,ContratForm
from django.shortcuts import get_object_or_404
from django.db import transaction

#
@api_view(['POST'])
@permission_classes([AllowAny])  # Autorise toutes les requêtes
def register_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])  # Autorise toutes les requêtes
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = CustomUser.objects.filter(email=email).first()
    
    if user and user.check_password(password):
        # Créez les tokens
        refresh = RefreshToken.for_user(user)
        
        # Vérifiez si l'utilisateur est un administrateur
        is_admin = user.is_staff  # Ou user.is_admin selon votre modèle
        username=user.username
        if is_admin:
            role = "admin"
        else:
            role = "user"

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': role,
            'email':email,
            'username':username  # Ajoutez le rôle de l'utilisateur dans la réponse
        }, status=status.HTTP_200_OK)

    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

############
#formulaires
############


    ###"autre implementation"
from rest_framework import viewsets
from .models import UserForm
from rest_framework import generics


class UserFormViewSetlist(viewsets.ModelViewSet):
    queryset = UserForm.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'username'
    serializer_class = UserFormWithContratFormSerializer
    def perform_create(self, serializer):
        serializer.save()
    def list_by_username(self, request, username=None):
        user_forms = UserForm.objects.filter(username=username)
        serializer = self.get_serializer(user_forms, many=True)
        return Response(serializer.data)    
    def retrieve(self, request, pk=None):
        user_form = get_object_or_404(UserForm, pk=pk)
        serializer = self.get_serializer(user_form)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        user_form = get_object_or_404(UserForm, pk=pk)
        user_form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_lookup_field(self):
        # Utilisez 'id' comme champ de recherche pour la méthode PUT
        if self.request.method == 'PUT':
            return 'id'
        # Utilisez 'username' pour d'autres méthodes
        return 'username'

    def get_object(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        if lookup_url_kwarg in self.kwargs:
            return get_object_or_404(UserForm, pk=self.kwargs[lookup_url_kwarg])
        return super().get_object()

class UserFormViewSetlistupdate(viewsets.ModelViewSet):
    queryset = UserForm.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'username'
    serializer_class = UserFormWithContratFormUpdateSerializer
    @transaction.atomic 
    def update(self, request, *args, **kwargs):
        # Récupère l'objet UserForm en utilisant l'ID
        user_form = get_object_or_404(UserForm, pk=self.kwargs['pk'])
        serializer = self.get_serializer(user_form, data=request.data)

        if serializer.is_valid():
            serializer.save()

            # Mise à jour des contrats
            contrats_data = request.data.get('contrats', [])
            if contrats_data:
                for contrat_data in contrats_data:
                    contrat_id = contrat_data.get('id')
                    if contrat_id:
                        contrat = ContratForm.objects.get(pk=contrat_id)
                        contrat_serializer = ContratFormSerializer(contrat, data=contrat_data)
                        if contrat_serializer.is_valid():
                            contrat_serializer.save()
                        else:
                            return Response(contrat_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)