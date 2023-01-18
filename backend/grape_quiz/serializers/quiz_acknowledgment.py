from rest_framework.serializers import SerializerMethodField, ModelSerializer
from grape_quiz.models import QuizAcknowledgment


class QuizAcknowledgmentSerializer(ModelSerializer):
    correct_answers = SerializerMethodField(source="get_correct_answers")
    total_questions = SerializerMethodField(source="get_total_questions")
    score = SerializerMethodField(source="get_score")
    quiz_name = SerializerMethodField(source="get_quiz_name")
    approve_score = SerializerMethodField(source="get_approve_score")
    class Meta:
        model = QuizAcknowledgment
        fields = [
            'id',
            'user',
            'quiz_template',
            'instance_questions',
            'user_answers',
            'score',
            'date',
            'correct_answers',
            'total_questions',
            'quiz_name',
            'approve_score'
        ]
    
    def get_quiz_name(self, current_object):
        return current_object.quiz_template.name
    
    def get_approve_score(self, current_object):
        return current_object.quiz_template.approve_score
    
    def get_correct_answers(self, current_object):
        return sum(int(answer.is_correct) for answer in current_object.user_answers.all())

    def get_total_questions(self, current_object):
        return len(current_object.instance_questions.all())

    def get_score(self, current_object):
        total_questions = self.get_total_questions(current_object=current_object)
        correct_answers = self.get_correct_answers(current_object=current_object)
        return round((correct_answers/total_questions) * 100, 2)