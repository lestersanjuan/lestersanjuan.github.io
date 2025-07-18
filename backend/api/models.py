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
        self.role = 'employee'
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

class EmployeePerformanceDay(models.Model):
    employee         = models.ForeignKey(User, on_delete=models.CASCADE)
    report           = models.ForeignKey('DailyReport', on_delete=models.CASCADE)
    performance_text = models.TextField(blank=True)

class EmployeePerformanceNight(models.Model):
    employee         = models.ForeignKey(User, on_delete=models.CASCADE)
    report           = models.ForeignKey('DailyReport', on_delete=models.CASCADE)
    performance_text = models.TextField(blank=True)

class DailyReport(models.Model):
    date = models.DateField(unique=True)


    #DAY PORTION
    supervisor_d = models.ManyToManyField(
        User,
        related_name='day_supervised_reports',
        limit_choices_to=Q(role='supervisor')|Q(role='manager'),
        blank=True,
    )

    general_notes_d    = models.TextField(blank=True)
    late_d              = models.TextField(blank=True)
    employee_perf_d = models.ManyToManyField(
        User,
        through='EmployeePerformanceDay',
        related_name='day_performance_reports',
        blank=True,
    )
    refills_d           = models.TextField(blank=True)
    customer_comments_d = models.TextField(blank=True)
    previous_shift_d    = models.TextField(blank=True)
    #Night
    supervisor_n = models.ManyToManyField(
        User,
        related_name='night_supervised_reports',
        limit_choices_to=Q(role='supervisor')|Q(role='manager'),
        blank=True,
    )

    general_notes_n    = models.TextField(blank=True)
    late_n              = models.TextField(blank=True)
    employee_perf_n = models.ManyToManyField(
        User,
        through='EmployeePerformanceNight',
        related_name='night_performance_reports',
        blank=True,
    )
    refills_n           = models.TextField(blank=True)
    customer_comments_n = models.TextField(blank=True)
    previous_shift_n    = models.TextField(blank=True)

    

    def __str__(self):
        return f"Daily Report for {self.date}"
