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
