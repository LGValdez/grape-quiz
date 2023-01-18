from rest_framework.serializers import ModelSerializer
from grape_quiz.models import Answer
from grape_quiz.serializers import (
    QuizSerializer,
    QuestionSerializerInQuiz
)

class AnswerSerializerInQuestionWithAnswers(ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'name', 'is_correct']


class QuestionSerializerInQuizWithAnswers(QuestionSerializerInQuiz):
    answers = AnswerSerializerInQuestionWithAnswers(many=True, read_only=True)


class QuizSerializerWithAnswers(QuizSerializer):
    questions = QuestionSerializerInQuizWithAnswers(many=True, read_only=True)