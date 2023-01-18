from django.db import models
from django.contrib.auth.models import User
from grape_quiz.models import (
    Quiz,
    Question,
    Answer
)


class QuizAcknowledgment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz_template = models.ForeignKey(Quiz, on_delete=models.CASCADE, default=1)
    instance_questions = models.ManyToManyField(Question)
    user_answers = models.ManyToManyField(Answer)
    date = models.DateTimeField(auto_now_add=True)