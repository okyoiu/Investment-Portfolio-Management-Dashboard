"""
URL configuration for capitalplus project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Auth routes must come before API routes to avoid conflicts
    path('api/auth/', include('authentication.urls')),
    path('api/', include('api.urls')),
]
