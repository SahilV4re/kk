# from krowdkam.client.models import Organization
from django.db import models
from django.utils.timezone import now
# Create your models here.
from django.contrib.auth.models import AbstractUser
from client.models import Organization

class User(AbstractUser):
    gender = models.CharField(max_length=10)
    username = models.CharField(max_length=200,unique=True)
    password = models.CharField(max_length=200,default='')
    password2 = models.CharField(max_length=200,default='')
    age = models.IntegerField(default=0)
    mobile = models.CharField(max_length=20,default='')
    email = models.CharField(max_length=500, default='')
    country_code = models.CharField(default="+91", max_length=10)
    status = models.IntegerField(default=1)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(default=now, editable=False)
    organization = models.ForeignKey(Organization,default=None,on_delete=models.SET_NULL,null=True)
    verify_token = models.CharField(max_length=100, default='')

