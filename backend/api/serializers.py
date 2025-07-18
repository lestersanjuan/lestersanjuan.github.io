# serializers.py
from rest_framework import serializers
from .models import DailyReport, EmployeePerformanceDay, EmployeePerformanceNight, User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    full_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # include the first/last names so get_full_name() works,
        # plus our new full_name
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "full_name",
            "role",
            "password"
        ]
    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username
    def create(self, validated_data):
        # ensure password is hashed
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        pw = validated_data.pop("password", None)
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        if pw:
            instance.password = make_password(pw)
        instance.save()
        return instance
    

# Nested serializers for the through‐models
class EmployeePerformanceDaySerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role="employee")
    )
    
    class Meta:
        model = EmployeePerformanceDay
        fields = ("employee", "performance_text")


class EmployeePerformanceNightSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role="employee")
    )
    
    class Meta:
        model = EmployeePerformanceNight
        fields = ("employee", "performance_text")


class PerformanceDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeePerformanceDay
        fields = ('employee','performance_text')

class PerformanceNightSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeePerformanceNight
        fields = ('employee','performance_text')


class DailyReportSerializer(serializers.ModelSerializer):
    # Supervisors and managers only
    supervisor_d = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.filter(role__in=["supervisor", "manager"]),
        required=False,
    )
    supervisor_n = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.filter(role__in=["supervisor", "manager"]),
        required=False,
    )

    # Nested performance lists
    employee_perf_d = EmployeePerformanceDaySerializer(many=True, required=False)
    employee_perf_n = EmployeePerformanceNightSerializer(many=True, required=False)

    class Meta:
        model = DailyReport
        fields = [
            "supervisor_d",
            "general_notes_d",
            "late_d",
            "employee_perf_d",
            "refills_d",
            "customer_comments_d",
            "previous_shift_d",
            "supervisor_n",
            "general_notes_n",
            "late_n",
            "employee_perf_n",
            "refills_n",
            "customer_comments_n",
            "previous_shift_n",
        ]

    def create(self, validated_data):
        sup_d = validated_data.pop("supervisor_d", [])
        perf_d = validated_data.pop("employee_perf_d", [])
        sup_n = validated_data.pop("supervisor_n", [])
        perf_n = validated_data.pop("employee_perf_n", [])

        report = DailyReport.objects.create(**validated_data)
        report.supervisor_d.set(sup_d)
        report.supervisor_n.set(sup_n)

        # Create through‐model entries for performances
        for entry in perf_d:
            EmployeePerformanceDay.objects.create(
                report=report,
                employee=entry["employee"],
                performance_text=entry.get("performance_text", ""),
            )
        for entry in perf_n:
            EmployeePerformanceNight.objects.create(
                report=report,
                employee=entry["employee"],
                performance_text=entry.get("performance_text", ""),
            )

        return report

    def update(self, instance, validated_data):
        sup_d = validated_data.pop("supervisor_d", None)
        perf_d = validated_data.pop("employee_perf_d", None)
        sup_n = validated_data.pop("supervisor_n", None)
        perf_n = validated_data.pop("employee_perf_n", None)

        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()

        if sup_d is not None:
            instance.supervisor_d.set(sup_d)
        if sup_n is not None:
            instance.supervisor_n.set(sup_n)

        if perf_d is not None:
            EmployeePerformanceDay.objects.filter(report=instance).delete()
            for entry in perf_d:
                EmployeePerformanceDay.objects.create(
                    report=instance,
                    employee=entry["employee"],
                    performance_text=entry.get("performance_text", ""),
                )

        if perf_n is not None:
            EmployeePerformanceNight.objects.filter(report=instance).delete()
            for entry in perf_n:
                EmployeePerformanceNight.objects.create(
                    report=instance,
                    employee=entry["employee"],
                    performance_text=entry.get("performance_text", ""),
                )

        return instance