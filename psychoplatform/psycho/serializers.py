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
        else:
            # if user is not a psycho, create a journal for him
            journal = Journal.objects.create(patient=user)

        return user

class PsychoUserSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = PsychoUser
        fields = "__all__"

    def get_average_rating(self, obj):
        reviews = Review.objects.filter(psycho=obj)
        if reviews.exists():
            return sum([review.rating for review in reviews]) / reviews.count()
        return 0

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
        fields = ('id', 'title', 'essence', 'conclusion', 'contacts', 'customer', 'cat', 'emergency_level')

class ProblemSerializer(serializers.ModelSerializer):
    cat = CategorySerializer()
    has_answers = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = '__all__'

    def get_has_answers(self, obj):
        return obj.answer_set.exists()  # Check if the problem has any answers

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


class ProfilePsychoUserSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = PsychoUser
        fields = ['name', 'description', 'cv', 'skills', 'perspective',
                  'lang', 'total_helped', 'contacts', 'user', 'age', 'join_date',
                  'reviews', 'average_rating']

    def get_reviews(self, obj):
        reviews = Review.objects.filter(psycho=obj)
        return ReviewSerializer(reviews, many=True).data

    def get_average_rating(self, obj):
        reviews = Review.objects.filter(psycho=obj)
        if reviews.exists():
            return sum([review.rating for review in reviews]) / reviews.count()
        return 0


class JournalSerializer(serializers.ModelSerializer):
    patient = serializers.StringRelatedField()

    class Meta:
        model = Journal
        fields = "__all__"

class EmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emotion
        fields = "__all__"


class EmotionCreateSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Emotion
        fields = "__all__"

    def get_user(self, obj):
        return self.context['request'].user.id

class JournalDetailSerializer(serializers.ModelSerializer):
    emotions = EmotionSerializer(many=True, read_only=True)

    class Meta:
        model = Journal
        fields = "__all__"

class UserJournalDetailSerializer(serializers.ModelSerializer):
    emotions = EmotionSerializer(many=True, read_only=True)
    psycho_executors = serializers.SerializerMethodField()

    class Meta:
        model = Journal
        fields = ['emotions', 'psycho', 'psycho_executors'] + [f.name for f in Journal._meta.fields]

    def get_psycho_executors(self, obj):
        user = self.context['request'].user
        problems = Problem.objects.filter(customer=user)
        psycho_users = PsychoUser.objects.filter(problem__in=problems).distinct()
        return PsychoUserSerializer(psycho_users, many=True).data


class NotificationSerializer(serializers.Serializer):
    check = serializers.BooleanField()


class AppliedProblemSerializer(serializers.ModelSerializer):
    cat = CategorySerializer()

    class Meta:
        model = Problem
        fields = '__all__'