from django.db import models

# Create your models here.

class Company(models.Model):
    name = models.CharField(max_length=200)
    stock_ticker = models.CharField(max_length=200, null=True)
    rank = models.IntegerField(null=True)
    revenue = models.BigIntegerField(null=True)
    profits = models.DecimalField(max_digits=30, decimal_places=10, null=True)
    assets = models.BigIntegerField(null=True)
    market_value = models.BigIntegerField(null=True)
    employees = models.IntegerField(null=True)
    ceo = models.CharField(max_length=200, null=True)
    sector = models.CharField(max_length=200, null=True)
    industry = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    state = models.CharField(max_length=200, null=True)
    latitude = models.DecimalField(max_digits=30, decimal_places=10, null=True)
    longitude = models.DecimalField(max_digits=30, decimal_places=10, null=True)

