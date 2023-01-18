from django.db import models
from grape_quiz.models import Quiz

class Question(models.Model):
    sequence = models.IntegerField()
    name = models.CharField(max_length=512)
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"[{self.quiz.name}] {self.sequence}. {self.name}"
