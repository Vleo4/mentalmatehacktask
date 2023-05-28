from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .security import *
# Create your models here.


class PlatformAbstractUser(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(_("email address"), blank=True, unique=True, max_length=150)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    is_psycho = models.BooleanField(default=False)
    objects = PlatformUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        app_label = 'psycho'
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def __str__(self):
        return self.username


class PsychoUser(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(max_length=400, blank=True)
    cv = models.FileField(blank=True, null=True, upload_to="cvs/%Y/%m/%d/")
    skills = models.TextField(max_length=1000)
    perspective = models.TextField(max_length=500)
    lang = models.TextField(max_length=250)
    total_helped = models.IntegerField(default=0)
    contacts = models.TextField(blank=True)
    user = models.OneToOneField(PlatformAbstractUser, on_delete=models.CASCADE)
    age = models.IntegerField(default=0)
    join_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class ProblemCategory(models.Model):
    title = models.CharField(max_length=250)

    def __str__(self):
        return self.title

class Problem(models.Model):
    title = models.CharField(max_length=250)
    essence = models.TextField()
    conclusion = models.TextField()
    contacts = models.TextField()
    customer = models.ForeignKey(PlatformAbstractUser, on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)
    executor = models.ForeignKey(PsychoUser, on_delete=models.CASCADE, blank=True, null=True)
    cat = models.ForeignKey(ProblemCategory, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Answer(models.Model):
    time_created = models.DateTimeField(auto_created=True)
    executor = models.ForeignKey(PsychoUser, on_delete=models.CASCADE)
    order = models.ForeignKey(Problem, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return f"Answer to problem <<{str(self.order)}>>"

class Review(models.Model):
    time_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(PlatformAbstractUser, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.CharField(max_length=250)
    psycho = models.ForeignKey(PsychoUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"Review to {str(self.psycho)} from {str(self.user)}"

class Emotion(models.Model):
    content = models.CharField(max_length=500)
    type = models.IntegerField()
    user = models.ForeignKey(PlatformAbstractUser, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)

class Journal(models.Model):
    patient = models.ForeignKey(PlatformAbstractUser, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)
    emotions = models.ManyToManyField(Emotion, blank=True)
    psycho = models.ManyToManyField(PsychoUser, blank=True)

