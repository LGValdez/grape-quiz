from django.db import models
from django.contrib.auth.models import User


class Quiz(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1024)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=64, unique=True, null=False)
    approve_score = models.DecimalField(max_digits=5, decimal_places=2, default=50.01)
    quiz_size = models.IntegerField(default=10)

    def __str__(self):
        return self.name


class Question(models.Model):
    sequence = models.IntegerField()
    name = models.CharField(max_length=512)
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"[{self.quiz.name}] {self.sequence}. {self.name}"


class Answer(models.Model):
    name = models.CharField(max_length=512)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE, null=False)


class QuizAcknowledgment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz_template = models.ForeignKey(Quiz, on_delete=models.CASCADE, default=1)
    instance_questions = models.ManyToManyField(Question)
    user_answers = models.ManyToManyField(Answer)
    date = models.DateTimeField(auto_now_add=True)
