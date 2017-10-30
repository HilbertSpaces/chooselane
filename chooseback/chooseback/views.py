from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests

#class ShowChamp(APIView):
champ_url = requests.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=RGAPI-4d7a2890-5a6f-4f79-a230-3f2b7902bc4b').json()
champ_name = champ_url['name']

def index(request):
  return HttpResponse(champ_name)
