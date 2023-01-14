from django.urls import path, include
from rest_framework_extensions.routers import (
    ExtendedDefaultRouter as DefaultRouter
)
from grape_quiz.views import UserViewSet, GroupViewSet, QuizViewSet, QuestionViewSet, AnswerViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
(router.register(r'quizzes', QuizViewSet)
    .register(r'questions', QuestionViewSet, basename='quizzes_question', parents_query_lookups=['quiz_id'])
    .register(r'answers', AnswerViewSet, basename='quizzes_questions_answer', parents_query_lookups=['question__quiz_id', 'question_id'])
)
(router.register(r'questions', QuestionViewSet)
    .register(r'answers', AnswerViewSet, basename='quizzes_questions_answer_2', parents_query_lookups=['question_id'])
)
router.register(r'answers', AnswerViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
