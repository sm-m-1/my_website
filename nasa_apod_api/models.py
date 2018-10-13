from django.db import models

# Create your models here.

class NasaAPOD(models.Model):
    date = models.DateField(null=True, unique=True)
    copyright = models.CharField(max_length=200, null=True)
    title = models.CharField(max_length=200, null=True)
    explanation = models.TextField(max_length=400, null=True)
    hdurl = models.URLField(null=True)
    url = models.URLField(null=True)