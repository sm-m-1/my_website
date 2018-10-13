import sys

from django.shortcuts import render
import os
import json
import urllib.request as http_request

from nasa_apod_api.models import NasaAPOD
import datetime
import pytz


# Create your views here.

NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key="
NASA_APOD_URL += os.environ.get('NASA_APOD_API_KEY', 'DEMO_KEY')

QUOTE_OF_DAY_URL = "https://favqs.com/api/qotd"

def home_page(request):
    # make the APOD api call and create it in the database if needed.
    today = datetime.datetime.now(pytz.timezone('US/Pacific')).strftime('%Y-%m-%d')
    nasa_apod_object = NasaAPOD.objects.filter(date=today)
    context = {
        'nasa_apod': {},
        'quote_of_day': {},
    }
    if nasa_apod_object.count() > 0:
        apod_context = nasa_apod_object.get()
        context['nasa_apod'] = apod_context
    else:
        # otherwise need to create the apod_object first then return.
        try:
            nasa_apod_content = json.load(http_request.urlopen(NASA_APOD_URL, timeout=100))
            context["nasa_apod"] = nasa_apod_content
            context['nasa_apod']['apod_success'] = True
            NasaAPOD.objects.create(
                copyright=nasa_apod_content.get('copyright'),
                title=nasa_apod_content.get('title'),
                date=today,
                explanation=nasa_apod_content.get('explanation'),
                hdurl=nasa_apod_content.get('hdurl'),
                url=nasa_apod_content.get('url')
            )
        except (http_request.HTTPError, http_request.URLError) as e:
            print("error trying to get apod", e)
            sys.stdout.flush()
            context['nasa_apod'].update( { 'apod_success':  False } )

    # set a quote.
    context['quote_of_day'] = {
        'author': 'Albert Einstein',
        'body': 'Imagination is more important than knowledge'
    }

    return render(request, "home_page.html", context)


def about_page(request):
    context = {
        "title": "Hello world!",
        "content": "Welcome to the About page",
    }
    return render(request, "about_page.html", context)

def projects_page(request):
    context = {
        "title": "Hello world!",
        "content": "Welcome to the Projects page",
    }
    return render(request, "projects_page.html", context)
