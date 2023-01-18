from rest_framework import viewsets
from rest_framework import permissions
from grape_quiz.serializers import AnswerSerializer
from rest_framework_extensions.mixins import NestedViewSetMixin
from grape_quiz.models import Answer


class AnswerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('id')
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
