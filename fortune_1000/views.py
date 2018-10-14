import sys

from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Company
import json
import urllib.request as http_request


class CompanyListView(ListView):
    template_name = "companies_list.html"
    model = Company


    # Might need to do additional work here in future. For now default behavior occurs.
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        # add stock day. Initial attempt.
        IEX_URL = "https://api.iextrading.com/1.0/stock/market/batch?symbols="
        IEX_TYPE = "&types=quote"
        symbols = Company.objects.values_list('stock_ticker', flat=True)
        symbols = [x.strip() for x in symbols if x is not None]
        symbols = ",".join(symbols)
        IEX_URL = IEX_URL + symbols + IEX_TYPE
        stocks_data = None
        try:
            stocks_data = json.load(http_request.urlopen(IEX_URL, timeout=100))
            # context['nasa_apod']['apod_success'] = True
            # context['stocks_context'] = stocks_data

        except (http_request.HTTPError, http_request.URLError) as e:
            print("error trying to get stocks data from iex api:", e)
            sys.stdout.flush()
            stocks_data = {}
        stocks_context = {}
        for s in stocks_data:
            stocks_context[s] = stocks_data[s]['quote']['companyName']
        context['stocks_data'] = stocks_data
        print("found #:", len(stocks_data))
        return context

    def get_queryset(self):
        queryset = Company.objects.get_queryset().order_by('rank')
        return queryset


