from rest_framework.serializers import ModelSerializer
from grape_quiz.models import (
    Quiz, 
    Question, 
    Answer
)


class AnswerSerializerInQuestion(ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'name']


class QuestionSerializerInQuiz(ModelSerializer):
    answers = AnswerSerializerInQuestion(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'sequence', 'name', 'answers']


class QuizSerializer(ModelSerializer):
    questions = QuestionSerializerInQuiz(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = '__all__'
        lookup_field = 'id'
