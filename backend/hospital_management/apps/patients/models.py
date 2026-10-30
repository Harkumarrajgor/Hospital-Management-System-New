from django.db import models
from django.conf import settings

class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('M','Male'),('F','Female'),('O','Other')])
    mobile = models.CharField(max_length=15, null=True)
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    medical_history = models.TextField(blank=True, verbose_name="Disease/Medical History")
    
    assigned_doctor = models.ForeignKey('doctors.Doctor', on_delete=models.SET_NULL, null=True, blank=True, related_name='patients')
    admitted_room = models.ForeignKey('rooms.Room', on_delete=models.SET_NULL, null=True, blank=True, related_name='patients')
    
    def __str__(self):
        return self.name
