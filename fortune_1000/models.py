from django.db import models

# Create your models here.

class Company(models.Model):
    name = models.CharField(max_length=75)
    stock_ticker = models.CharField(max_length=20, null=True)
    rank = models.IntegerField(null=True)
    revenue = models.IntegerField(null=True)
    profits = models.DecimalField(max_digits=20, decimal_places=3, null=True)
    assets = models.IntegerField(null=True)
    market_value = models.IntegerField(null=True)
    employees = models.IntegerField(null=True)
    ceo = models.CharField(max_length=75, null=True)
    sector = models.CharField(max_length=75, null=True)
    industry = models.CharField(max_length=75, null=True)
    city = models.CharField(max_length=40, null=True)
    state = models.CharField(max_length=4, null=True)
    latitude = models.DecimalField(max_digits=30, decimal_places=10, null=True)
    longitude = models.DecimalField(max_digits=30, decimal_places=10, null=True)

