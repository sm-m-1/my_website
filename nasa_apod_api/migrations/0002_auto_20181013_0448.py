# Generated by Django 2.1.2 on 2018-10-13 04:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nasa_apod_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='nasaapod',
            old_name='hd_url',
            new_name='hdurl',
        ),
    ]
