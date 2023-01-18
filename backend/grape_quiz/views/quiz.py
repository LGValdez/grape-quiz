from rest_framework import viewsets
from rest_framework import permissions
from grape_quiz.serializers import QuizSerializer
from rest_framework_extensions.mixins import NestedViewSetMixin
from grape_quiz.models import Quiz


class QuizViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('id')
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
