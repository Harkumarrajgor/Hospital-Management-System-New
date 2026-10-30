from rest_framework import viewsets
from hospital_management.apps.billing.models import Payment
from hospital_management.apps.billing.serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
