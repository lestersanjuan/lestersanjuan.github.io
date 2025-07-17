from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Manager, Supervisor, Employee, DailyReport, EmployeePerformance


# ----- custom querysets so each list shows only its role -----

class EmployeePerformanceInline(admin.TabularInline):
    model = EmployeePerformance
    extra = 1
@admin.register(DailyReport)
class DailyReportAdmin(admin.ModelAdmin):
    inlines = [EmployeePerformanceInline]
class _RoleFilteredAdmin(UserAdmin):
    role_value = None          # override in subclasses

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if self.role_value:
            qs = qs.filter(role=self.role_value)
        return qs


class ManagerAdmin(_RoleFilteredAdmin):
    role_value = 'manager'
    # optional: tweak columns, search, etc.

class SupervisorAdmin(_RoleFilteredAdmin):
    role_value = 'supervisor'

class EmployeeAdmin(_RoleFilteredAdmin):
    role_value = 'employee'


# ----- nicer headings in the sidebar -----

Manager._meta.verbose_name        = "Manager"
Manager._meta.verbose_name_plural = "Managers"

Supervisor._meta.verbose_name        = "Supervisor"
Supervisor._meta.verbose_name_plural = "Supervisors"

Employee._meta.verbose_name        = "Employee"
Employee._meta.verbose_name_plural = "Employees"


# ----- register them -----

admin.site.register(Manager,    ManagerAdmin)
admin.site.register(Supervisor, SupervisorAdmin)
admin.site.register(Employee,   EmployeeAdmin)


