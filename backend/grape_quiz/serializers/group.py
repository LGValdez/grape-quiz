from django.contrib.auth.models import Group
from rest_framework.serializers import HyperlinkedModelSerializer


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
