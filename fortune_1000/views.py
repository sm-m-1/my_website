from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Company
# Create your views here.

class CompanyListView(ListView):
    template_name = "companies_list.html"
    model = Company

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        print("context:", context)
        return context

    def get_queryset(self):
        queryset = Company.objects.get_queryset().order_by('rank')
        # return super(BookList, self).get_queryset()
        return queryset[:300]


