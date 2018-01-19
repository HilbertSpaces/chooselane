from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context, loader
import os
import urlparse
import requests
import redis
#heroku settings
url = urlparse.urlparse(os.environ.get('REDISCLOUD_URL'))
r = redis.Redis(host=url.hostname, port=url.port, password=url.password)


#r = redis.StrictRedis(host='localhost', port=6379, db=0)

#class ShowChamp(APIView):
def index(request):
   return render(request, 'build/index.html')

class Data(APIView):

  def get(self, request, league, data_type, format=None):
    if data_type == 'avg':
      query = league.upper() + '_AVG_DICT'
      avg_data = r.get(query)
      return Response(avg_data)
    elif data_type == 'stat':
      query = league.upper() + '_DATA_DICT'
      stat_data = r.get(query)
      return Response(stat_data)
    else:
      return Response(status=404)
