# from krowdkam.client.models import Zone
from django.db.models import query
from django.shortcuts import render, redirect
from django.apps import apps
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from guser.models import User
from client.models import Organization,CCTVcam,Zone
from .serializers import UserSerializer,ZoneSerializer,CCTVSerializer,OrgSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Create your views here.


# @api_view(['POST'])
# def UserReg(request):
#     userser=UserSerializer(data=request.data)
#     if userser.is_valid():
#         userser.save()

#     return Response(userser.data)

# @api_view(['POST'])
# def OrgReg(request):
#     orgser=OrgSerializer(data=request.data)
#     if orgser.is_valid():
#         orgser.save()

#     return Response(orgser.data)
@api_view(['GET'])
def Dropdown(request):
    permission_classes = (IsAuthenticated,)
    try:
        prg = OrgSerializer(Organization.objects.all(), many=True)
        return Response({"success": True, "data": prg.data}, status=status.HTTP_200_OK)
    except:
        return Response({'success': False, "message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def ZoneReg(request):
    zoneser=request.data
    # print(zoneser['organization'])
    # zoneser['organization']="Imagica"
    try:

        zoneser['organization']=Organization.objects.filter(name=zoneser['organization'])[0].id
        zoneser['zone']=Zone.objects.filter(name=zoneser['zone'],organization=zoneser['organization'])[0].id
        cameras=zoneser['cameras']
        del zoneser['cameras']
        # print(zoneser)

        for i in cameras:
            camser={"organization":zoneser['organization'],"zone":zoneser['zone'],"position":i}
            camser=CCTVSerializer(data=camser)
            if camser.is_valid():
                camser.save()

        zoneser=ZoneSerializer(data=zoneser)
        if zoneser.is_valid():
            zoneser.save()


        return Response({"success": True, "data": zoneser.data}, status=status.HTTP_200_OK)
    except:
        return Response({'success': False, "message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Verification(request,vid):
    try:
        User.objects.filter(verify_token=vid).update(status=1)
        return Response({"success": True}, status=status.HTTP_200_OK)
    except:
        return Response({"success": False, "message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)

from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

from guser.models import User
from home.serializers import RegisterSerializer
from rest_framework import generics


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# class OrgRegisterView(generics.CreateAPIView):
#     queryset = Organization.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = OrgRegisterSerializer
