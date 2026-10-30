from rest_framework import serializers
from hospital_management.apps.patients.models import Patient

class PatientSerializer(serializers.ModelSerializer):
    assigned_doctor_name = serializers.CharField(source='assigned_doctor.name', read_only=True)

    class Meta:
        model = Patient
        fields = '__all__'
