import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, first_name=None, last_name=None, **extra_fields):
        if not email:
            raise ValueError('L\'adresse email est obligatoire.')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.is_admin = extra_fields.get('is_admin', False)  # Ici, la valeur par défaut est False

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, first_name=None, last_name=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)

        user = self.create_user(email, password=password, first_name=first_name, last_name=last_name, **extra_fields)
        
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid.uuid4, editable=False)

    username = models.CharField(max_length=50, unique=True, primary_key=True)

    email = models.EmailField(unique=True)
    
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    # ... [Autres champs et méthodes]

    def save(self, *args, **kwargs):
        # Si le champ username n'est pas défini, définissez-le automatiquement avec la première partie de l'e-mail
        if not self.username:
            self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)
########################################################################################"
    
from django.utils import timezone

    
class UserForm(models.Model):
    username = models.ForeignKey(CustomUser, to_field='username', on_delete=models.CASCADE)

    fullname = models.CharField(max_length=50, default='')
    fPrenom = models.CharField(max_length=50, default='')
    factive = models.CharField(max_length=50, default='', null=True, blank=True)
    fNai = models.CharField(default='',help_text="Format : JJ/MM/AAAA",null=True,blank=True)
    fRegime = models.CharField(default='', null=True, blank=True)
    fSitu = models.CharField(max_length=50, default='')
    fSexe = models.CharField(max_length=50, default='')
    fEmail = models.CharField(max_length=50, default='', null=True, blank=True)
    fPays_de_naissance = models.CharField(max_length=50, default='', null=True, blank=True)

    fville = models.CharField(max_length=50, default='', null=True, blank=True)
    fAdresse = models.CharField(max_length=100, default='', null=True, blank=True)
    fAdresse2 = models.CharField(max_length=100, default='', null=True, blank=True)

    fCpo = models.CharField(max_length=50, default='', null=True, blank=True)
    ftel = models.CharField(max_length=50, default='', null=True, blank=True)
    ftel1 = models.CharField(max_length=50, default='', null=True, blank=True)
    fprof = models.CharField(max_length=50, default='')
    fvilN = models.CharField(max_length=50, default='', null=True, blank=True)
    fCP = models.CharField(max_length=50, default='', null=True, blank=True)
    fCom = models.CharField(max_length=50, default='', null=True, blank=True)
    #date_submitted = models.DateTimeField(auto_now_add=True) # Pour suivre quand le formulaire a été soumis
    fstatut = models.CharField(max_length=50, default='')
    fprixTotale = models.FloatField(default=0.0)
    def total_prixcontracts(self):
        return sum(contrat.prixTotale for contrat in self.contrats.all())+20
    def total_nbr_contracts(self):
        return sum(contrat.Nombre_de_contrat for contrat in self.contrats.all())
    def __str__(self):
        return f"Form for {self.user.email}"    
    date_submitted = models.CharField(max_length=10, blank=True)  # Champ non requis

    def save(self, *args, **kwargs):
        # Obtenez la date actuelle
        current_date = timezone.now().date()

        # Formatez la date en 'DD/MM/YYYY'
        formatted_date = current_date.strftime('%d/%m/%Y')

        # Stockez la date dans le champ
        self.date_submitted = formatted_date

        super(UserForm, self).save(*args, **kwargs)
  
  


####################################################################
    
#contrat
class ContratForm(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    #user_form = models.ForeignKey(UserForm, related_name='contrats', on_delete=models.CASCADE)
    user_form = models.ForeignKey(UserForm, related_name='contrats', on_delete=models.CASCADE, default=1)

    Société_a_résilier= models.CharField(max_length=50, default='', null=True, blank=True)
    Nom_assurance= models.CharField(max_length=50, default='', null=True, blank=True)
    Code_postale= models.CharField(max_length=50, default='', null=True, blank=True)
    Adresse= models.CharField(max_length=50, default='', null=True, blank=True)
    Ville= models.CharField(max_length=50, default='', null=True, blank=True)
    Type_de_Résiliation = models.CharField(max_length=50, default='', null=True, blank=True)
    Type_de_contrat = models.CharField(max_length=50, default='', null=True, blank=True)
    N_contrat = models.CharField(max_length=50, default='', null=True, blank=True)
    N_SS = models.CharField(max_length=50, default='', null=True, blank=True)
    Nombre_de_contrat = models.IntegerField(default=0, null=True, blank=True)
    N_RAR = models.CharField(max_length=50, default='', null=True, blank=True)
    Date_effet = models.CharField(max_length=20, default='',help_text="Format : JJ/MM/AAAA",null=True,blank=True)
    Date_de_résiliation = models.CharField(max_length=20, default='',help_text="Format : JJ/MM/AAAA",null=True,blank=True)
    Commentaire = models.CharField( default='', null=True, blank=True)
    prixTotale = models.FloatField(default=0.0)

    def save(self, *args, **kwargs):
        # Multiply the Nombre_de_contrat by 40 before saving
        self.prixTotale = 40*self.Nombre_de_contrat
        super(ContratForm, self).save(*args, **kwargs)
    def __str__(self):
        return f"ContratForm - ID: {self.id}"

         