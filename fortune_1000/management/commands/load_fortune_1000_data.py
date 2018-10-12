from django.core.management.base import BaseCommand, CommandError
from fortune_1000.models import Company
import csv
import os
import re
class Command(BaseCommand):
    help = 'Management command to read csv and create models'

    def handle(self, *args, **options):
        with open('fortune_1000/fortune1000-final.csv', 'r', encoding='unicode_escape') as table:
            fieldNames = ['rank', 'title', 'Revenues ($M)', 'Profits ($M)', 'Assets ($M)', 'Employees',
                          'CEO', 'Sector', 'Industry', 'City', 'State', 'Latitude', 'Longitude']
            reader = csv.DictReader(table)
            i = 0
            for row in reader:
                rank = self.get_int(row['rank'])
                title = row['title']
                revenues = self.get_int(row['Revenues ($M)'])
                profits = self.get_float(row['Profits ($M)'])
                assets = self.get_int(row['Assets ($M)'])
                employees = self.get_int(row['Employees'])
                ceo = row['CEO']
                sector = row['Sector']
                industry = row['Industry']
                city = row['City']
                state = row['State']
                latitude = self.get_float(row['Latitude'])
                longitude = self.get_float(row['Longitude'])
                company = Company.objects.get_or_create(name=title)

                company_obj = company[0]
                company_obj.revenue = revenues
                company_obj.profits=profits
                company_obj.assets=assets
                company_obj.employees=employees
                company_obj.ceo=ceo
                company_obj.sector=sector
                company_obj.industry=industry
                company_obj.city=city
                company_obj.state=state
                company_obj.latitude=latitude
                company_obj.longitude=longitude
                company_obj.rank=rank
                company_obj.save()
                # print("company name: ", title)
                # print("revenue: ", revenues)
                # print("profits: ", profits)
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