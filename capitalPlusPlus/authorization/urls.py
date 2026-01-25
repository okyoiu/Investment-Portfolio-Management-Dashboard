from django.urls import path

from . import views

urlpatterns = [
    path('api/add', views.income),
    path('api/remove', views.expense),
    path('api/delete_group', views.delete_group),
    path('api/add_group', views.create_group),
]