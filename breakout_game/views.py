from django.shortcuts import render

# Create your views here.
def game_page(request):
    context = {
        "title": "Hello world!",
        "content": "Welcome to the home page",
    }
    return render(request, "breakout_game_page.html", context)