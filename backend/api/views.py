from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import DailyReport, EmployeePerformanceDay, EmployeePerformanceNight, User, Employee, Manager, Supervisor
from .serializers import UserSerializer, DailyReportSerializer

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class EmployeeListView(generics.ListAPIView):
    serializer_class   = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role="employee")
class SupervisorListView(generics.ListAPIView):
    serializer_class   = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role="supervisor")

class ManagerListView(generics.ListAPIView):
    serializer_class   = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role="manager")


class DailyReportRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer
    lookup_field = 'date'

class DailyReportDeleteView(generics.DestroyAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer
    lookup_field = 'date'

class DailyReportListCreateView(generics.ListCreateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer
    permission_classes = [IsAuthenticated]

class DailyReportRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'date'
