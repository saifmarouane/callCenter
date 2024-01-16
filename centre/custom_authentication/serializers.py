from rest_framework import serializers
from .models import CustomUser
##################
#import for formulaires
from .models import UserForm, ContratForm
from django import forms
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'date_joined', 'is_active', 'is_staff', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        
        if 'username' not in validated_data:
            validated_data['username'] = validated_data['first_name']+'_'+validated_data['last_name']
            validated_data['is_admin'] = False

        # Si l'utilisateur est un superutilisateur, définissez is_admin sur True
        #if validated_data.get('is_superuser', True):
            #validated_data['is_admin'] = True

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
########################
#formulaires
######################

class ContratFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContratForm
        fields = '__all__'

class UserFormWithContratFormSerializer(serializers.ModelSerializer):
    contrats = ContratFormSerializer(many=True, required=False)
    total_prixcontracts = serializers.SerializerMethodField()
    total_nbr_contracts = serializers.SerializerMethodField()
    class Meta:
        model = UserForm
        fields = '__all__'
    def get_total_prixcontracts(self, obj):
        return obj.total_prixcontracts()
    def get_total_nbr_contracts(self, obj):
        return obj.total_nbr_contracts()
    def create(self, validated_data):
        contrats_data = validated_data.pop('contrats', [])
        user_form = UserForm.objects.create(**validated_data)
        for contrat_data in contrats_data:
            ContratForm.objects.create(user_form=user_form, **contrat_data)
        return user_form
    
class UserFormWithContratFormUpdateSerializer(serializers.ModelSerializer):
    contrats = ContratFormSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = UserForm
        fields = '__all__'    