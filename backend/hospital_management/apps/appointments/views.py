from rest_framework import viewsets
from hospital_management.apps.appointments.models import Appointment
from hospital_management.apps.appointments.serializers import AppointmentSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    @action(detail=False, methods=['get'])
    def waiting_list(self, request):
        doctor_id = request.query_params.get('doctor_id')
        if not doctor_id:
            return Response({"error": "doctor_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        appointments = Appointment.objects.filter(
            doctor_id=doctor_id,
            date=timezone.now().date(),
            queue_status__in=['Waiting', 'In-Progress']
        ).order_by('arrival_time')
        
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def start_consultation(self, request, pk=None):
        appointment = self.get_object()
        appointment.queue_status = 'In-Progress'
        appointment.save()
        
        # Update doctor status
        doctor = appointment.doctor
        doctor.availability_status = 'Busy'
        doctor.save()
        
        return Response({'status': 'consultation started'})

    @action(detail=True, methods=['post'])
    def complete_consultation(self, request, pk=None):
        appointment = self.get_object()
        appointment.queue_status = 'Completed'
        appointment.status = 'Completed'
        appointment.save()
        
        # Update doctor status back to Available if no one else is waiting?
        # For now, just set to Available.
        doctor = appointment.doctor
        doctor.availability_status = 'Available'
        doctor.save()
        
        return Response({'status': 'consultation completed'})

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = 'Confirmed'
        appointment.save()
        return Response({'status': 'appointment confirmed'})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = 'Cancelled'
        appointment.save()
        return Response({'status': 'appointment cancelled'})
