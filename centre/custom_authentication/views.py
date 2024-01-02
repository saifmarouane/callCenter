# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

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
        if is_admin:
            role = "admin"
        else:
            role = "user"

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': role,
            'email':email  # Ajoutez le rôle de l'utilisateur dans la réponse
        }, status=status.HTTP_200_OK)

    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)