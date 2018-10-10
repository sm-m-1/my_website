from django.shortcuts import render

# Create your views here.

def home_page(request):
    context = {
        "title": "Hello world!",
        "content": "Welcome to the home page",
    }
    return render(request, "home_page.html", context)

def about_page(request):
    context = {
        "title": "Hello world!",
        "content": "Welcome to the home page",
    }
    return render(request, "about_page.html", context)

def projects_page(request):
    context = {
        "title": "Hello world!",
        "content": "Welcome to the home page",
    }
    return render(request, "projects_page.html", context)
