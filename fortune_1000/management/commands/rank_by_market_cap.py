from django.core.management.base import BaseCommand, CommandError
from fortune_1000.models import Company
import csv
import os
import re
class Command(BaseCommand):
    help = 'Management command to update ranking on the Companies table'

    def handle(self, *args, **options):
        queryset = Company.objects.get_queryset().order_by('-market_value')
        i = 1
        for obj in queryset:
            obj.rank = i
            obj.save()
            i += 1