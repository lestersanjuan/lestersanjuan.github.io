
from django.urls import path
from . import views

urlpatterns = [
    path("dailyreport/upsert/<str:date>/", views.DailyReportUpsertView.as_view()),
    path("dailyreport/<str:date>/", views.DailyReportRetrieveUpdateView.as_view(), name="daily-report-detail"),
    path("dailyreport/update/<str:date>/", views.DailyReportRetrieveUpdateView.as_view(), name="daily-report-detail"),
    path("dailyreport/delete/<str:date>/", views.DailyReportDeleteView.as_view(), name="daily-report-delete"),


    path("employees/",   views.EmployeeListView.as_view(),   name="employee-list"),
    path("supervisors/", views.SupervisorListView.as_view(), name="supervisor-list"),
    path("managers/",    views.ManagerListView.as_view(),    name="manager-list"),
]
