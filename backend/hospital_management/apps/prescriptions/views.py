from rest_framework import viewsets
from hospital_management.apps.prescriptions.models import Prescription
from hospital_management.apps.prescriptions.serializers import PrescriptionSerializer

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
