from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests
import redis

#class ShowChamp(APIView):
r = redis.StrictRedis(host="localhost")
avg_data = r.get('BRONZE_AVG_DICT')
full_data = r.get('BRONZE_DATA_DICT')
def avg(request):
  return HttpResponse(avg_data)

def full(request):
  return HttpResponse(full_data)
