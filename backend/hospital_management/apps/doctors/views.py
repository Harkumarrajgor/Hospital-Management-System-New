from rest_framework import viewsets
from hospital_management.apps.doctors.models import Doctor
from hospital_management.apps.doctors.serializers import DoctorSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
