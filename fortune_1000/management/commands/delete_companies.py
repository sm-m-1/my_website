from django.core.management.base import BaseCommand, CommandError
from fortune_1000.models import Company
import csv
import os
import re
class Command(BaseCommand):
    help = 'Management command to delete Companies table'

    def handle(self, *args, **options):
        Company.objects.all().delete()