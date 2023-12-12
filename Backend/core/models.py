from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class AppUser(AbstractBaseUser, PermissionsMixin):
    USER_ROLES = (
        ('doccontrol', 'Doc Control'),
        ('simpleuser', 'Simple User'),
    )

    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    role = models.CharField(max_length=20, choices=USER_ROLES, default='simpleuser')
    disipline = models.CharField(max_length=100, blank=True)  # Added discipline field
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.username

class Projet(models.Model):
    nom = models.CharField(max_length=255)
    date =  models.DateField( auto_now=True) 
    code = models.CharField(max_length=10, unique=True)
   
class ChampCodification(models.Model):
    projet = models.ForeignKey(Projet, on_delete=models.CASCADE)
    nom_champ = models.CharField(max_length=100)
    taille_champ = models.PositiveIntegerField()
    type_champ = models.CharField(max_length=50)

  
class Document(models.Model):  
    projet = models.ForeignKey(Projet, on_delete=models.CASCADE)
    code = models.CharField(max_length=20, unique=True,primary_key=True)
    titre=models.CharField(max_length=30)
    date = models.DateField( auto_now=True)   
    statut = models.CharField(max_length=50)
    revision_actuelle = models.CharField(max_length=10)
    type = models.CharField(max_length=50)



class Revision(models.Model):
    doc = models.ForeignKey(Document, on_delete=models.CASCADE)
    numero_revision = models.CharField(max_length=10)
    fichier = models.FileField(upload_to='revisions/')
    #la personne qui a téléchargé le fichier
    user= models.ForeignKey(AppUser,on_delete=models.CASCADE)

class Commentaire(models.Model):
    user=models.ForeignKey(AppUser,on_delete=models.CASCADE)
    description=models.TextField()
    Commentaire=models.TextField()
    revision=models.ForeignKey(Revision,on_delete=models.CASCADE)


class AccesDoc(models.Model):
    doc = models.ForeignKey(Document, on_delete=models.CASCADE)
    user=models.ForeignKey(AppUser,on_delete=models.CASCADE)

class Notification(models.Model):
    user=models.ForeignKey(AppUser,on_delete=models.CASCADE)
    content=models.TextField()

    