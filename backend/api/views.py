from django.shortcuts import render

from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
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

    def perform_create(self, serializer):
        serializer.save(date=self.kwargs["date"])

class DailyReportRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'date'


class DailyReportUpsertView(APIView):
    def post(self, request, date):
        payload = request.data
        payload["date"] = date
        serializer = DailyReportSerializer(data=payload)
        try:
            serializer.is_valid(raise_exception=True)
            report = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            # report already exists → update instead
            report = DailyReport.objects.get(date=date)
            serializer = DailyReportSerializer(report, data=payload, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
