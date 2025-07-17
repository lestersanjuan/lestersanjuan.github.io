# serializers.py
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import DailyReport


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model  = User
        fields = ['id', 'username', 'password', 'role']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)
        instance.save()
        return instance

class DailyReportSerializer(serializers.ModelSerializer):
    class Meta:
        model  = DailyReport
        fields = '__all__'