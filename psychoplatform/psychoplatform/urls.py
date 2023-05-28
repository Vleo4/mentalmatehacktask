from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from psycho.auth_views import *
from psycho.views import *
from psychoplatform import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterAPI.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/psycho/<int:pk>/', ProfileAPIView.as_view()),
    path('api/psycho/update/', ProfileUpdateAPIView.as_view()),
    path('api/psychos/', PsychoListAPIView.as_view()),
    path('api/psycho/problem/<int:pk>/', PsychoProblemByIdAPIView.as_view()),
    path('api/psycho/problems/', OpenProblemsListAPIView.as_view()),
    path('api/psycho/answer/<int:pk>/', PsychoApplyToProblem.as_view()),
    path('api/psycho/problems/applied/', PsychoAppliedProblemListAPIView.as_view()),
    path('api/psycho/journal/<int:pk>/', PsychoRetrieveJournalAPIView.as_view()),
    path('api/psycho/journals/', PsychoJournalListAPIView.as_view()),
    path('api/user/problem/create/', CreateProblemAPIView.as_view()),
    path('api/user/problem/approve/', ApproveExecutorAPIView.as_view()),
    path('api/user/problems/', UserProblemsListAPIView.as_view()),
    path('api/user/problem/<int:pk>/', UserProblemByIdAPIView.as_view()),
    path('api/user/problem/pending/', UserPendingProblemsAPIView.as_view()),
    path('api/user/problem/close/<int:pk>/', CloseProblemAPIView.as_view()),     #patch
    path('api/user/problem/update/<int:pk>/', UpdateProblemAPIView.as_view()),
    path('api/user/review/', ReviewPsychoAPIView.as_view()),
    path('api/user/journal/', UserRetrieveJournalAPIView.as_view()),
    path('api/user/journal/addpsycho/', AddPsychoToJournalView.as_view()),    #patch
    path('api/user/emotion/create/', CreateEmotionAPIView.as_view()),
    path('api/user/emotion/update/<int:pk>/', UpdateEmotionAPIView.as_view()),
    path('api/user/emotion/destroy/<int:pk>/', DestroyEmotionAPIView.as_view()),
    path('api/google_login/', GoogleAuthAPIView.as_view()),
    path('api/notification/', CheckNotification.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)