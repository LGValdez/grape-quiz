from django.contrib.auth.models import User, Group
from rest_framework.serializers import HyperlinkedModelSerializer, ReadOnlyField, HyperlinkedRelatedField, HyperlinkedIdentityField
from grape_quiz.models import Quiz, Question, Answer


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class AnswerSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
        lookup_field = 'id'
        extra_kwargs = {
            'url': {'lookup_field': 'id'},
            'question': {'lookup_field': 'id'}
        }


class QuestionSerializer(HyperlinkedModelSerializer):
    answers= AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = '__all__'
        lookup_field = 'id'
        extra_kwargs = {
            'url': {'lookup_field': 'id'},
            'quiz': {'lookup_field': 'id'}
        }


class QuizSerializer(HyperlinkedModelSerializer):
    questions= QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = '__all__'
        lookup_field = 'id'
        extra_kwargs = {
            'url': {'lookup_field': 'id'}
        }

