# Generated by Django 2.1.2 on 2018-10-12 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fortune_1000', '0004_auto_20181012_0357'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='stock_ticker',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
