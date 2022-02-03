import uuid

from rest_framework import serializers, exceptions
from neogrowth.models import SchwartzMeta
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _

from neogrowth.models import Big5Answer, Big5Question, ValuesItems, ItemMeta


class ValuesItemsCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ValuesItems
        fields = ['neo', 'item_meta']


class Big5AnswerCreateSerializer(serializers.ModelSerializer):
    neo = serializers.HiddenField(default=serializers.CurrentUserDefault())
    question_id = serializers.IntegerField()

    class Meta:
        model = Big5Answer
        fields = ['neo', 'question_id', 'result']

    def create(self, validated_data):
        big5_question = Big5Question.objects.get(pk=validated_data['question_id'])

        if big5_question.weighted_value == 1:
            result = validated_data['result']
        else:
            result = 6 - validated_data['result']
        big5answer = Big5Answer.objects.create(big5_question=big5_question, result=result, neo=self.context['user'])
        big5answer.save()

        return big5answer


class PersonalityItemsInfoSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField()
    item_status = serializers.SerializerMethodField()

    class Meta:
        model = ItemMeta
        fields = ['item_name', 'item_image', 'item_status']

    def get_item_name(self, obj):
        return obj.name

    def get_item_status(self, obj):
        return True