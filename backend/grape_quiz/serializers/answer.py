from rest_framework.serializers import ModelSerializer
from grape_quiz.models import Answer


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
        lookup_field = 'id'
