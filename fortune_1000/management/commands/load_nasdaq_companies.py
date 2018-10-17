from django.core.management.base import BaseCommand, CommandError
from fortune_1000.models import Company
import csv
import os
import re
class Command(BaseCommand):
    help = 'Management command to read csv and create models'

    def handle(self, *args, **options):
        with open('fortune_1000/companylist.csv', 'r', encoding='unicode_escape') as table:
            fieldNames = ['Name', 'LastSale', 'Symbol', 'MarketCap'
                          'Sector', 'Industry']
            reader = csv.DictReader(table)
            i = 0
            for row in reader:
                title = row.get('Name')
                sector = row.get('Sector')
                industry = row.get('Industry')
                stock_symbol = row.get('Symbol')
                company = Company.objects.get_or_create(name=title)
                company_obj = company[0]
                company_obj.sector=sector
                company_obj.industry=industry
                company_obj.stock_symbol = stock_symbol
                company_obj.market_value = float(row.get('MarketCap', 0))
                company_obj.save()
                i += 1
                print("created item: ", i)


    def get_int(self, val):
        try:
            result = re.sub('[^0-9]', '', val)
            return int(result)
        except ValueError as e:
            return -1

    def get_float(self, val):
        try:
            result = re.sub('[^0-9]', '', val)
            return float(result)
        except ValueError as e:
            return -1.0