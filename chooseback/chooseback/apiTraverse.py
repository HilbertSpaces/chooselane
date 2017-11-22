from summonerApi import Summoner
from riotApiCalls import RiotInterface
import random
from celery import Celery

app = Celery('tasks', backend='redis://localhost', broker='pyamqp://guest@localhost//')
key = 'RGAPI-72d0a431-a968-44c3-81cd-1339639f3df4'

interface = RiotInterface(key,1)
champions = interface.getChampionById(param_dict = {'dataById':'true'})
champ_lookup = champions['data']
champ = champ_lookup['131']['name']
@app.task
def traverse():
  rp = Summoner('Peng Yiliang', .2, {})
  num = 0
  den = 0
  i = 0
  total =0
  stat_dict = {}
  summoners = list()
  for s in range(5):
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
      total += 1
      if stats.get('firstTowerKill',False) or stats.get('firstTowerAssist',False):
        if stats['win']:
          num += 1
        den += 1
      rand_int = random.randint(0,len(summoners)-1)
      rp.createLeague()
      champ = champ_lookup[str(rp.champ_id)]['name']
      stat_dict[champ] = [total,num,den]
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
