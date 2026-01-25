
from django.db import models
from django.contrib.auth.models import AbstractUser,Group
import uuid
from django.conf import settings 

# Create your models here.
class Organization(models.Model):
    groupID= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    balance= models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    groupName = models.CharField(max_length=100)
    def __str__(self):
        return self.groupID

class Transaction(models.Model):
    initiatingUser=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    groupID=models.ForeignKey(Organization,on_delete=models.CASCADE)
    amount= models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class Request(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    groupID=models.ForeignKey(Organization,on_delete=models.CASCADE)
    message=models.CharField(max_length=300)
    amount= models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class User(AbstractUser):
    pass


class UserOrgRole(models.Model):
    class roles(models.IntegerChoices):
        {
            "ADMIN":0,
            "PARENT":1,
            "CHILD":2
        }
    role=models.IntegerField(choices=roles)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="user") 
    group=models.ForeignKey(Organization,to_field='groupID',on_delete=models.CASCADE,related_name="group") 
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'group'], name='unique_user_group_combination')
        ]
    