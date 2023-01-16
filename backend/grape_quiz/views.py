from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from grape_quiz.serializers import (
    UserSerializer, 
    GroupSerializer, 
    QuizSerializer, 
    QuestionSerializer, 
    AnswerSerializer,
    QuizAcknowledgmentSerializer
)
from rest_framework_extensions.mixins import NestedViewSetMixin
from grape_quiz.models import Quiz, Question, Answer, QuizAcknowledgment


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class QuizViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('id')
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('id')
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class AnswerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('id')
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class QuizAcknowledgmentViewSet(viewsets.ModelViewSet):
    queryset = QuizAcknowledgment.objects.all().order_by('date')
    serializer_class = QuizAcknowledgmentSerializer
