from rest_framework import viewsets
from hospital_management.apps.patients.models import Patient
from hospital_management.apps.patients.serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
