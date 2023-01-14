from django.contrib.auth.models import User, Group
from rest_framework.serializers import HyperlinkedModelSerializer, ReadOnlyField
from grape_quiz.models import Quiz, Question, Answer


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class QuizSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'
        lookup_field = 'id'
        extra_kwargs = {
            'url': {'lookup_field': 'id'}
        }


class QuestionSerializer(HyperlinkedModelSerializer):
    quiz_id = ReadOnlyField(source='quiz.id')
    class Meta:
        model = Question
        fields = '__all__'
        lookup_field = 'id'
        extra_kwargs = {
            'url': {'lookup_field': 'id'},
            'quiz': {'lookup_field': 'id'}
        }


class AnswerSerializer(HyperlinkedModelSerializer):
    question_id = ReadOnlyField(source='question.id')
    class Meta:
        model = Answer
        fields = '__all__'
        lookup_field = 'id'
        extra_kwargs = {
            'url': {'lookup_field': 'id'},
            'question': {'lookup_field': 'id'}
        }
