from rest_framework.serializers import ModelSerializer
from grape_quiz.models import Question
from grape_quiz.serializers import AnswerSerializer


class QuestionSerializer(ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = '__all__'
        lookup_field = 'id'
