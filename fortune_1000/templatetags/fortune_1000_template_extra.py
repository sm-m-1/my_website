from django import template

register = template.Library()

@register.simple_tag()
def multiply_by_million(number):
    return number * 1000000

register.filter('get_billion', multiply_by_million)