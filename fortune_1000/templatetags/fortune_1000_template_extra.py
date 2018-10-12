from django import template

register = template.Library()

@register.simple_tag()
def multiply_by_million(number):
    return number * 1000000

@register.simple_tag()
def multiply_by_ten_thousand(number):
    return number * 10000

register.filter('multiply_by_1m', multiply_by_million)
register.filter('multiply_by_1k', multiply_by_ten_thousand)