from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformAbstractUser
        fields = ('id', 'username', 'email', 'is_psycho')
        lookup_field = 'username'
        extra_kwargs = {
            'url': {'lookup_field': 'username'}
        }

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformAbstractUser
        fields = ('id', 'username', 'email', 'password', 'is_psycho')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = PlatformAbstractUser.objects.create_user(validated_data['username'],
                            validated_data['email'], validated_data['password'], validated_data['is_psycho'])

        if validated_data['is_psycho']:
            psycho = PsychoUser.objects.create(
                user=user,
                name=user.username
            )

        return user

class PsychoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PsychoUser
        fields = "__all__"

class PsychoUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PsychoUser
        fields = ('name', 'description', 'cv', 'skills', 'perspective', 'lang', 'contacts', 'age')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemCategory
        fields = "__all__"

class CreateProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('id', 'title', 'essence', 'conclusion', 'contacts', 'customer', 'cat')

class ProblemSerializer(serializers.ModelSerializer):
    cat = CategorySerializer()

    class Meta:
        model = Problem
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class ApproveExecutorSerializer(serializers.Serializer):
    answer_id = serializers.IntegerField()

class UserProblemSerializer(serializers.ModelSerializer):
    cat = CategorySerializer()
    answers = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = '__all__'

    def get_answers(self, obj):
        answers = Answer.objects.filter(order=obj, is_closed=False)
        return AnswerSerializer(answers, many=True).data

class PsychoProblemSerializer(serializers.ModelSerializer):
    is_answered = serializers.SerializerMethodField()
    cat = CategorySerializer()

    class Meta:
        model = Problem
        fields = '__all__'

    def get_is_answered(self, obj):
        user = self.context.get('request').user
        psycho_user = PsychoUser.objects.get(user=user)
        return Answer.objects.filter(order=obj, executor=psycho_user).exists()

class ReviewCreateSerializer(serializers.ModelSerializer):
    psycho = serializers.PrimaryKeyRelatedField(queryset=PsychoUser.objects.all())

    class Meta:
        model = Review
        fields = ['rating', 'comment', 'psycho']

    def create(self, validated_data):
        user = self.context['request'].user
        psycho = validated_data.pop('psycho')
        review = Review.objects.create(user=user, psycho=psycho, **validated_data)
        return review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = "__all__"

class EmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emotion
        fields = "__all__"
