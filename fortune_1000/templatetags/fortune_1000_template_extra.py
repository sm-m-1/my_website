from django import template

register = template.Library()

@register.simple_tag()
def multiply(number, value):
    return number * value


register.filter('multiply', multiply)