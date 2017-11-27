from summonerApi import Summoner
from riotApiCalls import RiotInterface
import random
from celery import Celery
import json

app = Celery('tasks', backend='redis://localhost', broker='pyamqp://guest@localhost//')
key = 'RGAPI-8bc28692-079c-4001-8b70-69ed20eddc3b'

interface = RiotInterface(key,1)
champions = interface.getChampionById(param_dict = {'dataById':'true'})
champ_lookup = champions['data']
roles = {
'TOP': 0,
'MID': 1,
'JUNGLE': 2,
'BOTTOM': 3
}
@app.task
def traverse(sample_size = 100, summ_cache = 3000):
  summ = Summoner('RamanujanPrime', .2, {})
  i = 0
  FILLER = 0
  stat_dict = {}
  summoners = list()
  least_played_champ = sample_size - 1
  summ.createLeague()
  rank = summ.league
  #while least_played_champ < sample_size:
  while FILLER < 2:
    iter_list = []
    try:
      summ.createMatches()
    except ValueError:
      i = (i+1)%30
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), sleep = 1, params = {'beginIndex':i, 'endIndex':i+1})
      print('couldn\'t create matches')
      continue
    if summ.match['queueId'] in [420, 440]:
      stats = summ.participant_stats
      if len(summoners) < summ_cache:
        new_summoners = set(summ.summoner_list) - set(summ.summoner_name)
        summoners = list(set(summoners).union(new_summoners))
      total = 1
      rand_int = random.randint(0,len(summoners)-1)
      champ = champ_lookup[str(summ.champ_id)]['name']
      lane = roles[summ.lane]
      print(least_played_champ, champ, end = ' ')
      if champ not in stat_dict:
        stat_dict[champ] = {'sampleSize': 1}
        for key in stats:
          stat_dict[champ][key] = {'averageValue': [0,0,0,0], 'totalGames': [1,1,1,1]}
          if type(stats[key]) == int:
            stat_dict[champ][key]['totalGames'][lane] += 1
            stat_dict[champ][key]['averageValue'][lane] += stats[key]
          else:
            continue
      else:
        stat_dict[champ]['sampleSize'] += 1
        for key in stats:
          if key not in stat_dict[champ]:
            stat_dict[champ][key] = {'averageValue': [0,0,0,0], 'totalGames': [1,1,1,1]}
          if type(stats[key]) == int:
            stat_dict[champ][key]['totalGames'][lane] += 1
            stat_dict[champ][key]['averageValue'][lane] += stats[key]
          else:
            continue
      least_played_champ = stat_dict[champ]['sampleSize']
      for champion in stat_dict:
        if stat_dict[champion]['sampleSize'] < least_played_champ:
          least_played_champ = stat_dict[champion]['sampleSize']
      summ = Summoner(summoners.pop(rand_int),sleep=1,params = {'beginIndex':i, 'endIndex':i+1})
    else:
      print('not in queue [420, 440]')
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), sleep=1, params = {'beginIndex':i, 'endIndex':i+1})
    i = (i+1)%30
    for champ in stat_dict:
      for key in stat_dict[champ]:
        if key not in set(['sampleSize']):
          for lane in roles.values():
            total_value = stat_dict[champ][key]['averageValue'][lane]
            stat_dict[champ][key]['averageValue'][lane] = total_value/stat_dict[champ][key]['totalGames'][lane]
    FILLER += 1
  json_data = {'data': stat_dict,}
  return stat_dict

'''
@app.task
def traverse():
  summ = Summoner('RamanujanPrime', .2, {})
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
      summ.createMatches()
    except ValueError:
      i = (i+1)%30
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), sleep = 1, params = {'beginIndex':i, 'endIndex':i+1})
      print('couldn\'t create matches')
      continue
    if summ.match['queueId'] in [420, 440]:
      stats = summ.participant_stats
      if len(summoners) < 4000:
        new_summoners = set(summ.summoner_list) - set(summ.summoner_name)
        summoners = list(set(summoners).union(new_summoners))
      total = 1
      rand_int = random.randint(0,len(summoners)-1)
      summ.createLeague()
      champ = champ_lookup[str(summ.champ_id)]['name']
      if champ not in stat_dict:
        stat_dict[champ] = {}
        for key in stats:
          stat_dict[champ][key] = {'gamesWon':[0,0,0,0], 'gamesTotal': [0,0,0,0], 'AverageValue':[0,0,0,0]}
      else:
        for key in stats:
        if stats.get('firstTowerKill',False) or stats.get('firstTowerAssist',False):
          if stats['win']:
            stat_dict[champ]['game2qq+sWon'] += 1
          stat_dict[champ]['gameTotal'] += 1
        stat_dict[champ]['total'] += 1
      print(stat_dict)
      #print(summ.summoner_list, num, den)
      #print(summ.league)
      summ = Summoner(summoners.pop(rand_int),sleep=1,params = {'beginIndex':i, 'endIndex':i+1})
    else:
      print('not in queue [420, 440]')
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), sleep=1, params = {'beginIndex':i, 'endIndex':i+1})
    i = (i+1)%30
  return stat_dict
'''
