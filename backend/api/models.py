# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


class UserGroups(AbstractUser):
    USER_TYPE_CHOICES = [
        ('employee', 'Employee'),
        ('supervisor', 'Supervisor'),
        ('manager', 'Manager')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPE_CHOICES,
        default='normal'
    )

    def __str__(self):
        return f"{self.username} ({self.user_type})"

class EmployeePerformance(models.Model):
    employee = models.ForeignKey(UserGroups, on_delete=models.CASCADE)
    performance_text = models.TextField(blank=True)
    report = models.ForeignKey('DailyReport', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.employee.username}'s performance on {self.report.date}"

class DailyReport(models.Model):
    date = models.DateField(unique=True)
    shiftLeads = models.ManyToManyField(
        UserGroups,
        related_name='shift_leads',
        limit_choices_to={'user_type': 'supervisor'}
    )
    generalNotes = models.TextField(blank=True)
    late = models.TextField(blank=True)
    employeePerformance = models.ManyToManyField(
        UserGroups,
        through='EmployeePerformance',
        related_name='performances'
    )
    refills = models.TextField(blank=True)
    customerComments = models.TextField(blank=True)
    previousShiftNotes = models.TextField(blank=True)

    def __str__(self):
        return f"Daily Report for {self.date}"