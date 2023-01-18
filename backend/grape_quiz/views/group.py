from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework import permissions
from grape_quiz.serializers import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
