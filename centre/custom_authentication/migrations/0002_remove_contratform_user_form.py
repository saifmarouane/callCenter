# Generated by Django 5.0 on 2024-01-09 19:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('custom_authentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contratform',
            name='user_form',
        ),
    ]
