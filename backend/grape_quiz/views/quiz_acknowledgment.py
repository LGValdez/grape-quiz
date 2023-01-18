from rest_framework import viewsets
from rest_framework import permissions
from grape_quiz.serializers import QuizAcknowledgmentSerializer
from grape_quiz.models import QuizAcknowledgment


class QuizAcknowledgmentViewSet(viewsets.ModelViewSet):
    queryset = QuizAcknowledgment.objects.all().order_by('-date')
    serializer_class = QuizAcknowledgmentSerializer
    permission_classes = [permissions.IsAuthenticated]
