from django.db import models
from grape_quiz.models import Question


class Answer(models.Model):
    name = models.CharField(max_length=512)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE, null=False)
