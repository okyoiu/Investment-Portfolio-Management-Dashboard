from django.urls import path

from . import views

urlpatterns = [
    path('api/deposit', views.income),
    path('api/withdraw', views.expense),
    path('api/delete_group', views.delete_group),
    path('api/add_group', views.create_group),
    path('api/balance', views.amount),
    path('api/invite', views.add_members),
    path('api/remove', views.remove_members),
]