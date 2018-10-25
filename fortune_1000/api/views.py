# from rest_framework.generics import (
#     ListAPIView,
#     RetrieveAPIView,
#     CreateAPIView,
#     UpdateAPIView,
#     DestroyAPIView
# )
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from fortune_1000.models import Company
from .serializers import CompanySerializer

class CompanyPagination(PageNumberPagination):
    page_size = 5

class CompanyViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CompanySerializer
    queryset = Company.objects.get_queryset().order_by('-market_value')
    pagination_class = CompanyPagination


# class CompanyListView(ListAPIView):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
#
# class CompanyDetailView(RetrieveAPIView):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
#
# class CompanyCreateView(CreateAPIView):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
#
#
# class CompanyUpdateView(UpdateAPIView):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
#
#
# class CompanyDeleteView(DestroyAPIView):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
