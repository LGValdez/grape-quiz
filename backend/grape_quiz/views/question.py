from rest_framework import viewsets
from rest_framework import permissions
from grape_quiz.serializers import QuestionSerializer
from rest_framework_extensions.mixins import NestedViewSetMixin
from grape_quiz.models import Question


class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('id')
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
