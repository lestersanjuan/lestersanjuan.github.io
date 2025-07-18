# serializers.py
from rest_framework import serializers
from .models import DailyReport, EmployeePerformanceDay, EmployeePerformanceNight, User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model  = User
        fields = ["id", "username", "name", "role", "password"]

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
    



class PerformanceDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeePerformanceDay
        fields = ('employee','performance_text')

class PerformanceNightSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeePerformanceNight
        fields = ('employee','performance_text')


class DailyReportSerializer(serializers.ModelSerializer):
    day_performances   = PerformanceDaySerializer(source='employeeperformanceday_set', many=True)
    night_performances = PerformanceNightSerializer(source='employeeperformancenight_set', many=True)
    class Meta:
        model = DailyReport
        fields = '__all__'