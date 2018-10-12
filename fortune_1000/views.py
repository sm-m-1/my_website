from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Company
# Create your views here.

class CompanyListView(ListView):
    template_name = "companies_list.html"
    model = Company