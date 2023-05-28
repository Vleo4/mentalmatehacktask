from google.auth.transport import requests
from google.oauth2 import id_token

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from psycho.custom_token import PlatformTokenObtainPairSerializer
from psycho.serializers import *

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generating jwt token
        token_serializer = PlatformTokenObtainPairSerializer()
        refresh = token_serializer.get_token(user)
        access_token = str(refresh.access_token)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "access": access_token,
            "refresh": str(refresh),
        })

class GoogleAuthAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        CLIENT_ID = '298908062102-2ii5botcaj2d9c00tnfkct6jo72q8qkj.apps.googleusercontent.com'
        token = request.data.get('token')
        is_psycho = request.data.get('is_psycho')
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            email = idinfo['email']
            username = email.split('@')[0]
            user, created = PlatformAbstractUser.objects.get_or_create(username=username, email=email)

            if created:
                user.set_unusable_password()

                if is_psycho:
                    psycho_user = PsychoUser.objects.create(
                        user=user,
                        name=user.username
                    )
                else:
                    journal = Journal.objects.create(patient=user)

                user.is_psycho = is_psycho
                user.save()

            token_serializer = PlatformTokenObtainPairSerializer()
            refresh = token_serializer.get_token(user)
            access_token = str(refresh.access_token)

            return Response({'access': access_token, 'refresh': str(refresh)})

        except ValueError as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)