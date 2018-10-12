from django.core.management.base import BaseCommand, CommandError
from fortune_1000.models import Company
import csv
import os
import re
class Command(BaseCommand):
    help = 'Management command to read csv and create models'

    def handle(self, *args, **options):
        data = {}
        with open('fortune_1000/companylist_2.csv', 'r', encoding='unicode_escape') as table:
            fieldNames = ['Symbol', 'Name']
            reader = csv.DictReader(table)
            for row in reader:
                symbol = row['Symbol']
                name = row['Name']
                name_first_word = name.split()[0]
                data[name_first_word] = symbol

        with open('fortune_1000/companylist.csv', 'r', encoding='unicode_escape') as table:
            fieldNames = ['Symbol', 'Name']
            reader = csv.DictReader(table)
            for row in reader:
                symbol = row['Symbol']
                name = row['Name']
                name_first_word = name.split()[0]
                data[name_first_word] = symbol

        companies = Company.objects.all()
        i = 0
        for comp in companies:
            name = comp.name
            name_first_word = name.split()[0]

            if name_first_word in data:
                comp.stock_ticker = data[name_first_word]
                comp.save()
                i += 1
                print("i:", i)
