# Generated by Django 4.2.23 on 2025-07-18 04:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='EmployeePerformance',
            new_name='EmployeePerformanceDay',
        ),
        migrations.RenameField(
            model_name='dailyreport',
            old_name='customer_comments',
            new_name='customer_comments_d',
        ),
        migrations.RenameField(
            model_name='dailyreport',
            old_name='general_notes',
            new_name='customer_comments_n',
        ),
        migrations.RenameField(
            model_name='dailyreport',
            old_name='late',
            new_name='general_notes_d',
        ),
        migrations.RenameField(
            model_name='dailyreport',
            old_name='previous_shift',
            new_name='general_notes_n',
        ),
        migrations.RenameField(
            model_name='dailyreport',
            old_name='refills',
            new_name='late_d',
        ),
        migrations.RemoveField(
            model_name='dailyreport',
            name='employee_perf',
        ),
        migrations.RemoveField(
            model_name='dailyreport',
            name='supervisor',
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='employee_perf_d',
            field=models.ManyToManyField(blank=True, related_name='day_performance_reports', through='api.EmployeePerformanceDay', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='late_n',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='previous_shift_d',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='previous_shift_n',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='refills_d',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='refills_n',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='supervisor_d',
            field=models.ManyToManyField(blank=True, limit_choices_to=models.Q(('role', 'supervisor'), ('role', 'manager'), _connector='OR'), related_name='day_supervised_reports', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='supervisor_n',
            field=models.ManyToManyField(blank=True, limit_choices_to=models.Q(('role', 'supervisor'), ('role', 'manager'), _connector='OR'), related_name='night_supervised_reports', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='EmployeePerformanceNight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('performance_text', models.TextField(blank=True)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('report', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.dailyreport')),
            ],
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='employee_perf_n',
            field=models.ManyToManyField(blank=True, related_name='night_performance_reports', through='api.EmployeePerformanceNight', to=settings.AUTH_USER_MODEL),
        ),
    ]
