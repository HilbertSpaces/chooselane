from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context, loader
import requests
import redis
r = redis.StrictRedis(host="localhost",port=6379, db=0,decode_responses=True)

#class ShowChamp(APIView):
def index(request):
   return render(request, 'build/index.html')

class Data(APIView):

  def get(self, request, league, data_type, format=None):
    if data_type == 'avg':
      query = league.upper() + '_AVG_DICT'
      avg_data = r.hgetall(query)
      return Response(avg_data)
    elif data_type == 'stat':
      query = league.upper() + '_DATA_DICT'
      stat_data = r.hgetall(query)
      return Response(stat_data)
    else:
      return Response(status=404)
