from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from psycho.chat_gpt import *
from psycho.serializers import *


class ProfileAPIView(generics.RetrieveAPIView):
    serializer_class = ProfilePsychoUserSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            psycho_x_id = kwargs['pk']
            psycho_x = get_object_or_404(PsychoUser, id=psycho_x_id)
            return Response(self.get_serializer(psycho_x).data)

        except Http404:
            return Response({'error': 'Psycho not found'}, status=status.HTTP_404_NOT_FOUND)


class ProfileUpdateAPIView(generics.UpdateAPIView):
    serializer_class = PsychoUserUpdateSerializer
    queryset = PsychoUser.objects.all()

    def get_object(self):
        user = self.request.user
        return PsychoUser.objects.get(user=user)

class CreateProblemAPIView(generics.CreateAPIView):
    serializer_class = CreateProblemSerializer
    queryset = Problem.objects.all()

    def create(self, request, *args, **kwargs):
        customer_id = request.user.id
        customer = get_object_or_404(PlatformAbstractUser, id=customer_id)

        request_data = request.data.copy()
        request_data['customer'] = customer_id
        msg = lol(request_data.get('essence'))
        request_data['emergency_level'] = msg
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        problem = serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApproveExecutorAPIView(generics.UpdateAPIView):
    serializer_class = ApproveExecutorSerializer
    queryset = Problem.objects.all()

    def update(self, request, *args, **kwargs):
        answer_id = request.data.get('answer_id')
        is_approved = request.data.get('is_approved')

        if answer_id is None:
            return Response({"error": "answer_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        if is_approved is None:
            return Response({"error": "is_approved is required"}, status=status.HTTP_400_BAD_REQUEST)

        user_x = request.user

        try:
            # Retrieve the Answer object with the given answer_id
            answer = Answer.objects.get(id=answer_id)

            # Access the related Problem object via the 'order' field
            problem = answer.order

            # Check if the user in the request is the customer in the Problem object
            if user_x != problem.customer:
                return Response({'error': 'You are not authorized to approve this executor'},
                                status=status.HTTP_403_FORBIDDEN)

            if is_approved:
                #update executor if approved
                problem.executor = answer.executor
                problem.is_closed = True
                problem.save()

                answer.is_closed = True
                answer.approved = True
                answer.save()
            else:
                # If is_approved is False
                answer.is_closed = True
                answer.approved = False
                answer.save()

            return Response({'success': 'Answer send'}, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)


class UserProblemsListAPIView(generics.ListAPIView):
    serializer_class = ProblemSerializer

    def get_queryset(self):
        return Problem.objects.filter(customer=self.request.user, is_closed=False)

class UserPendingProblemsAPIView(generics.ListAPIView):
    serializer_class = AppliedProblemSerializer

    def get_queryset(self):
        return Problem.objects.filter(customer=self.request.user, is_closed=True, executor__isnull=False)

class PsychoListAPIView(generics.ListAPIView):
    serializer_class = PsychoUserSerializer
    queryset = PsychoUser.objects.all()

class CloseProblemAPIView(generics.UpdateAPIView):
    serializer_class = ProblemSerializer
    queryset = Problem.objects.all()

    #PATCH method
    def update(self, request, *args, **kwargs):
        user = request.user
        problem = self.get_object()

        if problem.customer == user:
            problem.is_closed = True
            problem.save()
            serializer = self.get_serializer(problem)
            return Response(serializer.data)
        else:
            return Response({"detail": "You are not authorized to close this problem."},
                            status=status.HTTP_403_FORBIDDEN)

class UpdateProblemAPIView(generics.UpdateAPIView):
    serializer_class = ProblemSerializer
    queryset = Problem.objects.all()

    def update(self, request, *args, **kwargs):
        problem = self.get_object()

        if request.user != problem.customer:
            return Response({"detail": "You are not authorized to update this problem."},
                            status=status.HTTP_403_FORBIDDEN)

        # Update only the specified fields
        fields_to_update = ('title', 'essence', 'conclusion', 'contacts')
        for field in fields_to_update:
            if field in request.data:
                setattr(problem, field, request.data[field])

        problem.save()

        serializer = self.get_serializer(problem)
        return Response(serializer.data)

class OpenProblemsListAPIView(generics.ListAPIView):
    serializer_class = AppliedProblemSerializer

    def get_queryset(self):
        return Problem.objects.filter(is_closed=False)

class PsychoApplyToProblem(generics.CreateAPIView):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

    def create(self, request, *args, **kwargs):
        platform_user = request.user
        psycho_user = PsychoUser.objects.get(user=platform_user)
        problem_id = kwargs['pk']
        try:
            problem = get_object_or_404(Problem, pk=problem_id)

            existing_answer = Answer.objects.filter(executor=psycho_user, order=problem).first()
            if existing_answer:
                return Response({'error': 'You have already applied to this problem.'},
                                status=status.HTTP_400_BAD_REQUEST)

            # Create a new Answer instance
            answer = Answer(
                time_created=timezone.now(),
                executor=psycho_user,
                order=problem,
                approved=False,
                is_closed=False
            )

            # Save the Answer instance
            answer.save()

            # Return the created Answer instance
            serializer = self.get_serializer(answer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist:
            return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

class PsychoAppliedProblemListAPIView(generics.ListAPIView):
    serializer_class = AppliedProblemSerializer

    def get_queryset(self):
        platform_user = self.request.user
        psycho_user = PsychoUser.objects.get(user=platform_user)

        # Get the list of problems that psycho has answered
        applied_problems = Problem.objects.filter(executor=psycho_user, is_closed=True).distinct()

        return applied_problems


class PsychoProblemByIdAPIView(generics.RetrieveAPIView):
    serializer_class = PsychoProblemSerializer

    def get_object(self):
        try:
            problem = Problem.objects.get(pk=self.kwargs['pk'])
            return problem
        except Problem.DoesNotExist:
            raise Http404

    def retrieve(self, request, *args, **kwargs):
        problem = self.get_object()
        serializer = self.get_serializer(problem, context={'request': request})
        return Response(serializer.data)

class UserProblemByIdAPIView(generics.RetrieveAPIView):
    serializer_class = UserProblemSerializer

    def get_object(self):
        try:
            problem = Problem.objects.get(pk=self.kwargs['pk'], customer=self.request.user)
            return problem
        except Problem.DoesNotExist:
            raise Http404

    def retrieve(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        problem = self.get_object()
        serializer = self.get_serializer(problem)
        return Response(serializer.data)

class ReviewPsychoAPIView(generics.CreateAPIView):
    serializer_class = ReviewCreateSerializer

    def create(self, request, *args, **kwargs):
        platform_user = request.user
        psycho_id = request.data.get('psycho')

        if psycho_id is None:
            return Response({"error": "Psycho not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user has already reviewed this psycho
        existing_review = Review.objects.filter(user=platform_user, psycho__id=psycho_id).first()
        if existing_review:
            return Response({"error": "User can only have one review for each psycho."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Validate rating
        rating = request.data.get('rating')
        if rating is not None:
            if not 1 <= int(rating) <= 5:
                return Response({"error": "Rating must be between 1 and 5."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Rating not provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Call get_serializer with request context
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PsychoRetrieveJournalAPIView(generics.RetrieveAPIView):
    serializer_class = JournalDetailSerializer

    def get_queryset(self):
        user_x = self.request.user
        if user_x.is_psycho:
            # check if the user is a psycho, filter by the journals where the psycho is in
            queryset = Journal.objects.filter(psycho__user=user_x)
        else:
            return Response({"detail": "You are not authorized"},
                            status=status.HTTP_401_UNAUTHORIZED)

        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=self.kwargs.get('pk'))
        return obj


class PsychoJournalListAPIView(generics.ListAPIView):
    serializer_class = JournalSerializer

    def get_queryset(self):
        user_x = self.request.user
        if user_x.is_psycho:
            # check if the user is a psycho, filter by the journals where the psycho is in
            queryset = Journal.objects.filter(psycho__user=user_x)
        else:
            return Response({"detail": "You are not authorized to update this problem."},
                            status=status.HTTP_401_UNAUTHORIZED)

        return queryset

class UserRetrieveJournalAPIView(generics.RetrieveAPIView):
    serializer_class = UserJournalDetailSerializer

    def get_object(self):
        user = self.request.user
        if user.is_psycho:
            return Response({"detail": "You are not authorized to update this problem."},
                            status=status.HTTP_401_UNAUTHORIZED)
        return Journal.objects.get(patient=user)

class CreateEmotionAPIView(generics.CreateAPIView):
    serializer_class = EmotionCreateSerializer

    def perform_create(self, serializer):
        if self.request.user.is_psycho:
            return Response({"detail": "Psycho users can't create emotions."},
                            status=status.HTTP_400_BAD_REQUEST)

        emotion = serializer.save(user=self.request.user)
        journal = Journal.objects.get(patient=self.request.user)
        journal.emotions.add(emotion)


class UpdateEmotionAPIView(generics.UpdateAPIView):
    serializer_class = EmotionCreateSerializer

    def get_queryset(self):
        if self.request.user.is_psycho:
            return Response({"detail": "You are not authorized to update this emotion."},
                            status=status.HTTP_401_UNAUTHORIZED)
        queryset = Emotion.objects.filter(user=self.request.user)
        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=self.kwargs["pk"])
        return obj


class DestroyEmotionAPIView(generics.DestroyAPIView):
    serializer_class = EmotionCreateSerializer

    def get_queryset(self):
        if self.request.user.is_psycho:
            return Response({"detail": "You are not authorized to destroy this emotion."},
                            status=status.HTTP_401_UNAUTHORIZED)
        queryset = Emotion.objects.filter(user=self.request.user)
        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=self.kwargs["pk"])
        return obj

class AddPsychoToJournalView(generics.UpdateAPIView):
    serializer_class = JournalSerializer

    def get_object(self):
        user = self.request.user
        if user.is_psycho:
            return Response({"detail": "You are not authorized to update this problem."},
                            status=status.HTTP_401_UNAUTHORIZED)
        return Journal.objects.get(patient=user)

    def patch(self, request, *args, **kwargs):
        journal = self.get_object()
        psycho_id = request.data.get('psycho_id')
        psycho_user = get_object_or_404(PsychoUser, id=psycho_id)

        # Check if the current user is the patient of the journal
        if request.user != journal.patient:
            return Response({"detail": "You are not authorized to update this journal."},
                            status=status.HTTP_403_FORBIDDEN)

        # Add the psycho_user to the journal
        journal.psycho.add(psycho_user)
        return Response(JournalSerializer(journal).data)

class CheckNotification(generics.RetrieveAPIView):
    serializer_class = NotificationSerializer

    def retrieve(self, request, *args, **kwargs):
        platform_user = request.user
        if platform_user.is_psycho:
            return Response({"detail": "You are not authorized"},
                            status=status.HTTP_401_UNAUTHORIZED)

        has_open_problem_with_answer = Problem.objects.filter(customer=platform_user, is_closed=False,
                                                              answer__is_closed=False).exists()

        serializer = self.get_serializer(instance={"check": has_open_problem_with_answer})
        return Response(serializer.data)
