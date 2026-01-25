"""
API URL configuration.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health'),
    # Note: auth/login/ and auth/signup/ are handled by authentication app
    # These are for email/password authentication (POST requests)
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login-email/', views.login, name='login_email'),  # Changed to avoid conflict
    path('user/profile/', views.get_user_profile, name='user_profile'),
]
