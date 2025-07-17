from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import DailyReport, EmployeePerformance, User
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

    
class DailyReportListCreateView(generics.ListCreateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer

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

class EmployeePerformanceView(generics.ListCreateAPIView):
    queryset = EmployeePerformance.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        report_id = self.kwargs.get('report_id')
        return EmployeePerformance.objects.filter(report_id=report_id)