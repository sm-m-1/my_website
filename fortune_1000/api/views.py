# from rest_framework.generics import (
#     ListAPIView,
#     RetrieveAPIView,
#     CreateAPIView,
#     UpdateAPIView,
#     DestroyAPIView
# )
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from fortune_1000.models import Company
from .serializers import CompanySerializer

class CompanyPagination(PageNumberPagination):
    page_size = 10

class CompanyViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CompanySerializer
    queryset = Company.objects.get_queryset().order_by('-market_value')
    pagination_class = CompanyPagination

    def get_queryset(self):
        queryset = super().get_queryset().order_by('-market_value')
        query = self.request.query_params.get('q', None)
        if query is not None:
            queryset = super().get_queryset().filter(
                Q(name__icontains=query) | Q(stock_symbol__icontains=query)
            )

        return queryset

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
