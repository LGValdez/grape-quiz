# Generated by Django 4.1.5 on 2023-01-14 04:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('grape_quiz', '0003_question_slug_quiz_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='slug',
        ),
    ]