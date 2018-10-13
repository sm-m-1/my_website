# Generated by Django 2.1.2 on 2018-10-13 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NasaAPOD',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(null=True, unique=True)),
                ('copyright', models.CharField(max_length=200)),
                ('explanation', models.TextField(max_length=400, null=True)),
                ('hd_url', models.URLField(null=True)),
                ('url', models.URLField(null=True)),
            ],
        ),
    ]
