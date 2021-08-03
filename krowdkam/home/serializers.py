from django.db.models import fields
from django.apps import apps
from rest_framework import serializers
from guser.models import User
from client.models import Organization,Zone,CCTVcam
import uuid
from django.conf import settings
from django.core.mail import send_mail


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = '__all__'

class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model= Organization
        fields = '__all__'

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model= Zone
        fields = '__all__'

class CCTVSerializer(serializers.ModelSerializer):
    class Meta:
        model= CCTVcam
        fields = '__all__'


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        
        print(self.user.status)
        if self.user.status==0:
            data['refresh'] = "Not Verified"
            data['access'] = "User has not been verified"
        else:
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
        return data
                # return Response({"refresh": "Not Verified", "access": "User has not been verified"})


from rest_framework import serializers
from guser.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'mobile', 'age', 'gender','country_code','organization','status','verify_token')
        '''
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
        '''

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        orgobj=None
        orgser=None
        statuss=1
        verify=""
        us=validated_data['username']
        print(validated_data)
        if validated_data['organization'] is not None:
            orgobj=validated_data['organization']
            orgser=OrgSerializer(data=orgobj)
            statuss=0
            verify = str(uuid.uuid4())
        user = User.objects.create(
            username=us,
            email=validated_data['email'],
            mobile=validated_data['mobile'],
            age=validated_data['age'],
            gender=validated_data['gender'],
            country_code=validated_data['country_code'],
            organization=orgobj,
            status=statuss,
            verify_token= verify
        )

        user.set_password(validated_data['password'])
        user.save()
        print("Yaha tak sab theek**********************************************************************************************************")
        if orgser is not None:
            subject= 'Authorize '+us+' as an admin?'
            message = "If you would like to authorize the user "+ us+ ", then please click on the following link:\nhttp://127.0.0.1:8000/verify/"+verify
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [orgobj.email]
            send_mail(subject,message,email_from,recipient_list)


        return user


# class OrgRegisterSerializer(serializers.ModelSerializer):
#     # email = serializers.EmailField(
#     #     required=True,
#     #     validators=[UniqueValidator(queryset=User.objects.all())]
#     # )

#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = Organization
#         fields = ('name', 'password', 'password2', 'description', 'address', 'long', 'lat', 'map', 'logo')
#         '''
#         extra_kwargs = {
#             'first_name': {'required': True},
#             'last_name': {'required': True}
#         }
#         '''

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})

#         return attrs

#     def create(self, validated_data):
#         org = Organization.objects.create(
#             name=validated_data['name'],
#             description=validated_data['description'],
#             address=validated_data['address'],
#             long=validated_data['long'],
#             lat=validated_data['lat'],
#             map=validated_data['map'],
#             logo=validated_data['logo']
#         )

#         org.set_password(validated_data['password'])
#         org.save()

#         return org