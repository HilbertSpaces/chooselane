from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests

#class ShowChamp(APIView):
champ_url = requests.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=RGAPI-7af6caed-5cb4-440a-b57c-2e310614d0d6').json()
champ_name = champ_url['name']

def index(request):
  return HttpResponse(champ_name)
