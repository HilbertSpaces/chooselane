from summonerApi import Summoner
from riotApiCalls import RiotInterface
import random
from celery import Celery

app = Celery('tasks', backend='redis://localhost', broker='pyamqp://guest@localhost//')
key = 'RGAPI-60ba35c9-27b6-461f-866c-2544a8d7f39d'

interface = RiotInterface(key,1)
champions = interface.getChampionById(param_dict = {'dataById':'true'})
champ_lookup = champions['data']
roles = {
'TOP': 0,
'BOTTOM': 1,
'MID': 2,
'JUNGLE': 3
}
@app.task
def traverse():
  rp = Summoner('RamanujanPrime', .2, {})
  num = 0
  den = 0
  i = 0
  total =0
  stat_dict = {}
  summoners = list()
  for s in range(9000):
    num = 0
    den = 0
    total = 0
    try:
      rp.createMatches()
    except ValueError:
      i = (i+1)%30
      rand_int = random.randint(0,len(summoners)-1)
      rp = Summoner(summoners.pop(rand_int), sleep = 1, params = {'beginIndex':i, 'endIndex':i+1})
      print('couldn\'t create matches')
      continue
    if rp.match['queueId'] in [420, 440]:
      stats = rp.participant_stats
      if len(summoners) < 4000:
        new_summoners = set(rp.summoner_list) - set(rp.summoner_name)
        summoners = list(set(summoners).union(new_summoners))
      total = 1
      rand_int = random.randint(0,len(summoners)-1)
      rp.createLeague()
      champ = champ_lookup[str(rp.champ_id)]['name']
      if champ not in stat_dict:
        stat_dict[champ] = {}
        for key in stats:
          stat_dict[champ][key] = {'gamesWon':[0,0,0,0], 'gamesTotal': [0,0,0,0], 'AverageValue':[0,0,0,0]}
      else:
        for key in stats:
        if stats.get('firstTowerKill',False) or stats.get('firstTowerAssist',False):
          if stats['win']:
            stat_dict[champ]['gamesWon'] += 1
          stat_dict[champ]['gameTotal'] += 1
        stat_dict[champ]['total'] += 1
      print(stat_dict)
      #print(rp.summoner_list, num, den)
      #print(rp.league)
      rp = Summoner(summoners.pop(rand_int),sleep=1,params = {'beginIndex':i, 'endIndex':i+1})
    else:
      print('not in queue [420, 440]')
      rand_int = random.randint(0,len(summoners)-1)
      rp = Summoner(summoners.pop(rand_int), sleep=1, params = {'beginIndex':i, 'endIndex':i+1})
    i = (i+1)%30
  return stat_dict
