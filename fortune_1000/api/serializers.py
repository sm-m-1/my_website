from rest_framework import serializers
from fortune_1000.models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'stock_symbol', 'rank', 'market_value')
        lookup_field = 'stock_symbol'
        extra_kwargs = {
            'url': {'lookup_field': 'stock_symbol'}
        }