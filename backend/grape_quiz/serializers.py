from django.contrib.auth.models import User, Group
from rest_framework.serializers import HyperlinkedModelSerializer, SerializerMethodField, ModelSerializer
from grape_quiz.models import Quiz, Question, Answer, QuizAcknowledgment


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
        lookup_field = 'id'


class QuestionSerializer(ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = '__all__'
        lookup_field = 'id'


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


class QuizAcknowledgmentSerializer(ModelSerializer):
    score = SerializerMethodField(source="get_score")
    class Meta:
        model = QuizAcknowledgment
        fields = ['id', 'user', 'quiz_template', 'instance_questions', 'user_answers', 'score', 'date']

    def get_score(self, current_object):
        question_number = len(current_object.instance_questions.all())
        correct_answers = sum(int(answer.is_correct) for answer in current_object.user_answers.all())
        return round((correct_answers/question_number) * 100, 2)


class AnswerSerializerInQuestionWithAnswers(ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'name', 'is_correct']


class QuestionSerializerInQuizWithAnswers(QuestionSerializerInQuiz):
    answers = AnswerSerializerInQuestionWithAnswers(many=True, read_only=True)


class QuizSerializerWithAnswers(QuizSerializer):
    questions = QuestionSerializerInQuizWithAnswers(many=True, read_only=True)

