import sys

from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.db.models import Q
from .models import Company
import json
import urllib.request as http_request


class CompanyListView(ListView):
    template_name = "companies_list.html"
    model = Company
    paginate_by = 25


    # Might need to do additional work here in future. For now default behavior occurs.
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        query = self.request.GET.get('q')
        queryset = self.get_queryset()
        # replace the queryset with search queries if present.
        if query:
            queryset = self.get_queryset().filter(
                Q(name__icontains=query) | Q(stock_symbol__icontains=query)
            )

        paginator = Paginator(queryset, self.paginate_by)
        page = self.request.GET.get('page')
        try:
            paginated_companies = paginator.page(page)
        except PageNotAnInteger:
            paginated_companies = paginator.page(1)
        except EmptyPage:
            paginated_companies = paginator.page(paginator.num_pages)
        context['paginated_companies'] = paginated_companies
        companies_list = paginated_companies.object_list
        # print("paginated_companies:", paginated_companies.object_list)

        # add stock day. Initial attempt.
        IEX_URL = "https://api.iextrading.com/1.0/stock/market/batch?symbols="
        IEX_TYPE = "&types=quote"
        symbols = companies_list.values_list('stock_symbol', flat=True)
        symbols = [x.strip() for x in symbols if x is not None]
        symbols = ",".join(symbols)
        IEX_URL = IEX_URL + symbols + IEX_TYPE
        try:
            stocks_data = json.load(http_request.urlopen(IEX_URL, timeout=100))

        except (http_request.HTTPError, http_request.URLError) as e:
            print("error trying to get stocks data from iex api:", e)
            sys.stdout.flush()
            stocks_data = {}
        new_company_list = []
        for company in companies_list.values():
            obj = dict(company)
            stock_symbol = obj.get('stock_symbol')
            stock_info = stocks_data.get(stock_symbol)
            obj['stocks_data'] = stock_info
            new_company_list.append(obj)
        paginated_companies.object_list = new_company_list
        # print("context:", context)
        return context

    def get_queryset(self):
        queryset = Company.objects.get_queryset().order_by('-market_value')
        return queryset



