"""
User model for Capital Plus.
Converted from Mongoose to Django ORM.
"""
from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone


class SavingsGoal(models.Model):
    """Savings Goal model (embedded in User)"""
    title = models.CharField(max_length=200)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']


class User(models.Model):
    """User model - matches Node.js Mongoose schema"""
    # Auth0 User ID (sub claim from JWT) - optional, unique if provided
    auth0_id = models.CharField(max_length=255, unique=True, null=True, blank=True, db_index=True)
    
    # User email - required, unique
    email = models.EmailField(unique=True, db_index=True)
    
    # User name
    name = models.CharField(max_length=255, blank=True, null=True)
    
    # Hashed password (for email/password authentication)
    password = models.CharField(max_length=255, blank=True, null=True)
    
    # Account creation date
    account_created = models.DateTimeField(default=timezone.now)
    
    # Savings goals (many-to-many relationship)
    savings_goals = models.ManyToManyField(SavingsGoal, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email
    
    def set_password(self, raw_password):
        """Hash and set password"""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Check if password matches"""
        if not self.password:
            return False
        return check_password(raw_password, self.password)
    
    @classmethod
    def find_by_email(cls, email):
        """Find user by email"""
        try:
            return cls.objects.get(email__iexact=email)
        except cls.DoesNotExist:
            return None
    
    @classmethod
    def find_by_auth0_id(cls, auth0_id):
        """Find user by Auth0 ID"""
        try:
            return cls.objects.get(auth0_id=auth0_id)
        except cls.DoesNotExist:
            return None
    
    @classmethod
    def find_or_create(cls, auth0_id=None, email=None, name=None):
        """Find or create user (for Auth0)"""
        user = None
        
        if auth0_id:
            user = cls.find_by_auth0_id(auth0_id)
        
        if not user and email:
            user = cls.find_by_email(email)
        
        if not user:
            # Create new user
            user = cls.objects.create(
                auth0_id=auth0_id,
                email=email,
                name=name,
                account_created=timezone.now()
            )
        else:
            # Update existing user
            if auth0_id and not user.auth0_id:
                user.auth0_id = auth0_id
            if email and user.email != email:
                user.email = email
            if name and user.name != name:
                user.name = name
            user.save()
        
        return user
