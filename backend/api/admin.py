from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserGroups, DailyReport, EmployeePerformance

class UserGroupsAdmin(UserAdmin):
    list_display = ('username', 'email', 'user_type')
    list_filter = ('user_type', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        ('User Type', {'fields': ('user_type',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('User Type', {'fields': ('user_type',)}),
    )

class EmployeePerformanceInline(admin.TabularInline):
    model = EmployeePerformance
    extra = 1

class DailyReportAdmin(admin.ModelAdmin):
    list_display = ('date',)
    inlines = [EmployeePerformanceInline]

admin.site.register(UserGroups, UserGroupsAdmin)
admin.site.register(DailyReport, DailyReportAdmin)
admin.site.register(EmployeePerformance)