# Generated by Django 2.1.2 on 2018-10-12 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fortune_1000', '0002_auto_20181012_0347'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='rank',
            field=models.IntegerField(),
        ),
    ]
