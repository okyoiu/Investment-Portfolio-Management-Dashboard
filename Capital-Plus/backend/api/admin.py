from django.contrib import admin
from .models import User, SavingsGoal


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'auth0_id', 'account_created')
    search_fields = ('email', 'name', 'auth0_id')


@admin.register(SavingsGoal)
class SavingsGoalAdmin(admin.ModelAdmin):
    list_display = ('title', 'current_amount', 'target_amount', 'created_at')
