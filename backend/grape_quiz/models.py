from django.db import models
from django.contrib.auth.models import User


class Quiz(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Question(models.Model):
    sequence = models.IntegerField()
    name = models.CharField(max_length=512)
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE, null=False)


class Answer(models.Model):
    name = models.CharField(max_length=512)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE, null=False)
