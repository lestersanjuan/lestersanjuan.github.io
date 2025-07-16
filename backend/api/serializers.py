from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import UserGroups
from backend.api.models import DailyReport



class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Group.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "username", "password", "groups"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        groups_data = validated_data.pop('groups', [])
        user = User.objects.create_user(**validated_data)
        user.groups.set(groups_data)
        return user
    
class DailyReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyReport
        fields = '__all__'


class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroups
        fields = ['id', 'username', 'user_type', 'password']


    def create(self, validated_data):
        user = UserGroups.objects.create_user(**validated_data)
        return user