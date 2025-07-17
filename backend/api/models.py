# models.py
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Q

class User(AbstractUser):
    ROLE_CHOICES = [
        ('employee',   'Employee'),
        ('supervisor', 'Supervisor'),
        ('manager',    'Manager'),
    ]
    id   = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
    name = models.CharField(max_length=20, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
    
class Employee(User):
    class Meta: proxy = True
    def save(self, *args, **kwargs):
        self.role = 'manager'
        super().save(*args, **kwargs)

class Manager(User):
    class Meta: proxy = True
    def save(self, *args, **kwargs):
        self.role = 'manager'
        super().save(*args, **kwargs)

class Supervisor(User):
    class Meta: proxy = True
    def save(self, *args, **kwargs):
        self.role = 'supervisor'
        super().save(*args, **kwargs)

class EmployeePerformance(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    performance_text = models.TextField(blank=True)
    report = models.ForeignKey('DailyReport', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.employee.username}'s performance on {self.report.date}"

class DailyReport(models.Model):
    date = models.DateField(unique=True)

    supervisor = models.ManyToManyField(
        User,
        related_name='supervisor',
        limit_choices_to=Q(role='supervisor') | Q(role='manager'),
        blank=True,
    )

    general_notes     = models.TextField(blank=True)
    late              = models.TextField(blank=True)
    employee_perf     = models.ManyToManyField(
        User,
        through='EmployeePerformance',
        related_name='performances',
        blank=True
    )
    refills           = models.TextField(blank=True)
    customer_comments = models.TextField(blank=True)
    previous_shift    = models.TextField(blank=True)

    def __str__(self):
        return f"Daily Report for {self.date}"
