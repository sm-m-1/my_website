# Generated by Django 2.1.2 on 2018-10-12 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=75)),
                ('rank', models.CharField(max_length=75)),
                ('revenue', models.IntegerField(null=True)),
                ('profits', models.DecimalField(decimal_places=3, max_digits=20, null=True)),
                ('assets', models.IntegerField()),
                ('market_value', models.IntegerField(null=True)),
                ('employees', models.IntegerField(null=True)),
                ('ceo', models.CharField(max_length=75, null=True)),
                ('sector', models.CharField(max_length=75, null=True)),
                ('industry', models.CharField(max_length=75, null=True)),
                ('city', models.CharField(max_length=40, null=True)),
                ('state', models.CharField(max_length=4, null=True)),
                ('latitude', models.DecimalField(decimal_places=10, max_digits=30, null=True)),
                ('longitude', models.DecimalField(decimal_places=10, max_digits=30, null=True)),
            ],
        ),
    ]