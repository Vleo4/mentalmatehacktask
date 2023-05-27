from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(PlatformAbstractUser)
admin.site.register(PsychoUser)
admin.site.register(Problem)
admin.site.register(Answer)
admin.site.register(ProblemCategory)
admin.site.register(Review)
admin.site.register(Emotion)
admin.site.register(Journal)