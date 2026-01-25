"""
URL configuration for authentication app.
Matches the Python capitalPlusPlus implementation.
"""
from django.urls import path, re_path
from . import views

app_name = "authentication"

urlpatterns = [
    # Allow both with and without trailing slash
    path("login/", views.login, name="login"),
    re_path(r"^login$", views.login, name="login_no_slash"),
    path("logout/", views.logout, name="logout"),
    re_path(r"^logout$", views.logout, name="logout_no_slash"),
    path("callback/", views.callback, name="callback"),
    re_path(r"^callback$", views.callback, name="callback_no_slash"),
    path("user/", views.get_user, name="user"),
    re_path(r"^user$", views.get_user, name="user_no_slash"),
]
