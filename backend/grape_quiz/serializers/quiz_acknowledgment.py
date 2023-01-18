from rest_framework.serializers import SerializerMethodField, ModelSerializer
from grape_quiz.models import QuizAcknowledgment


class QuizAcknowledgmentSerializer(ModelSerializer):
    score = SerializerMethodField(source="get_score")
    class Meta:
        model = QuizAcknowledgment
        fields = ['id', 'user', 'quiz_template', 'instance_questions', 'user_answers', 'score', 'date']

    def get_score(self, current_object):
        question_number = len(current_object.instance_questions.all())
        correct_answers = sum(int(answer.is_correct) for answer in current_object.user_answers.all())
        return round((correct_answers/question_number) * 100, 2)
