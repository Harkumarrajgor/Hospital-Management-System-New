from rest_framework import viewsets
from hospital_management.apps.staff.models import Staff
from hospital_management.apps.staff.serializers import StaffSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
