from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests
import redis

#class ShowChamp(APIView):
r = redis.StrictRedis(host="localhost")
full = r.get('BRONZEleague')
def index(request):
  return HttpResponse(full)
