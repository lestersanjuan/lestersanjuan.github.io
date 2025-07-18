from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, Manager, Supervisor, Employee,
    DailyReport,
    EmployeePerformanceDay,
    EmployeePerformanceNight,
)

# -------------------------------------------------------------------
# Inlines for day & night performance
# -------------------------------------------------------------------

class EmployeePerformanceDayInline(admin.TabularInline):
    model = EmployeePerformanceDay
    fk_name = 'report'
    extra = 1
    verbose_name = "Day Performance"
    verbose_name_plural = "Day Performances"

class EmployeePerformanceNightInline(admin.TabularInline):
    model = EmployeePerformanceNight
    fk_name = 'report'
    extra = 1
    verbose_name = "Night Performance"
    verbose_name_plural = "Night Performances"

# -------------------------------------------------------------------
# DailyReport admin: include both day & night inlines
# -------------------------------------------------------------------

@admin.register(DailyReport)
class DailyReportAdmin(admin.ModelAdmin):
    list_display = ('date',)
    inlines = [
        EmployeePerformanceDayInline,
        EmployeePerformanceNightInline,
    ]
    filter_horizontal = ('supervisor_d', 'supervisor_n')
    # optionally:
    # raw_id_fields = ('employee_perf_d', 'employee_perf_n')

# -------------------------------------------------------------------
# Role‑filtered view for User subclasses
# -------------------------------------------------------------------

class _RoleFilteredAdmin(UserAdmin):
    role_value = None  # override in subclasses

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if self.role_value:
            qs = qs.filter(role=self.role_value)
        return qs

class ManagerAdmin(_RoleFilteredAdmin):
    role_value = 'manager'

class SupervisorAdmin(_RoleFilteredAdmin):
    role_value = 'supervisor'

class EmployeeAdmin(_RoleFilteredAdmin):
    role_value = 'employee'

# nicer headings in the sidebar
Manager._meta.verbose_name        = "Manager"
Manager._meta.verbose_name_plural = "Managers"
Supervisor._meta.verbose_name        = "Supervisor"
Supervisor._meta.verbose_name_plural = "Supervisors"
Employee._meta.verbose_name        = "Employee"
Employee._meta.verbose_name_plural = "Employees"

# register them
admin.site.register(Manager,    ManagerAdmin)
admin.site.register(Supervisor, SupervisorAdmin)
admin.site.register(Employee,   EmployeeAdmin)
