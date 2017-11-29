from summonerApi import Summoner
from riotApiCalls import RiotInterface
import random
from celery import Celery
import json
import redis

app = Celery('tasks', broker='pyamqp://guest@localhost//')
key = 'RGAPI-1d6224fd-2a87-4467-9993-a4e6bc27b9ee'
r = redis.StrictRedis('localhost')

interface = RiotInterface(key, .85)
champions = interface.getChampionById(param_dict = {'dataById':'true'})
champ_lookup = champions['data']
roles = {
'TOP': 0,
'MID': 1,
'JUNGLE': 2,
'BOTTOM': 3,
'SUPPORT':4,
}

def buildCache(league):
  league_ids = {
    'BRONZE': '86651600-c4e7-11e6-bff6-c81f66cf135e',
    'SILVER': '1ca60e40-d112-11e6-bf61-c81f66dbb56c',
    'GOLD': 'bc5c2010-4a51-11e7-9773-c81f66dbb56c',
    'PLATINUM': 'ceac10c0-271c-11e7-8151-c81f66dbb56c',
    'DIAMOND': '5d672520-d821-11e6-b50f-c81f66cf2333',
  }
  mid_ranks = ['II', 'III', 'IV']
  summoners_dict = interface.getLeagueById(league_ids[league])
  summ_cache = []
  for entry in summoners_dict['entries']:
    if entry['rank'] in mid_ranks:
      summ_cache.append(entry['playerOrTeamName'])
  return summ_cache

def traverse(summoners, sample_size = 4, summ_cache = 3000):
  summoners = summoners
  summ = Summoner(summoners.pop(), {})
  i = 0
  FILLER = 0
  stat_dict = {}
  least_played_champ = sample_size - 1
  summ.createLeague()
  leagues = summ.league
  for queue in leagues:
    if queue['queueType'] == "RANKED_SOLO_5x5":
      tier = queue['tier']
  while least_played_champ < sample_size:
    print(summ.calls)
    try:
      summ.createMatches()
    except ValueError:
      i = (i+1)%30
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), params = {'beginIndex':i, 'endIndex':i+1})
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
      if summ.role == 'DUO':
        lane = roles['SUPPORT']
      else:
        lane = roles[summ.lane]
      print(champ)
      if champ not in stat_dict:
        stat_dict[champ] = {'sampleSize': 1}
        for key in stats:
          stat_dict[champ][key] = {'averageValue': [{'perSecond': 0, 'perGame': 0} for x in range(5)], 'totalGames': [1,1,1,1,1]}
          if type(stats[key]) == bool:
            continue
          else:
            stat_dict[champ][key]['totalGames'][lane] += 1
            stat_dict[champ][key]['averageValue'][lane]['perSecond'] += stats[key]/summ.match['gameDuration']
            stat_dict[champ][key]['averageValue'][lane]['perGame'] += stats[key]
      else:
        stat_dict[champ]['sampleSize'] += 1
        for key in stats:
          if key not in stat_dict[champ]:
            {'perSecond': 0, 'perGame': 0}
            stat_dict[champ][key] = {'averageValue': [{'perSecond': 0, 'perGame': 0} for x in range(5)], 'totalGames': [1,1,1,1,1]}
          if type(stats[key]) == bool:
            continue
          else:
            stat_dict[champ][key]['totalGames'][lane] += 1
            stat_dict[champ][key]['averageValue'][lane]['perSecond'] += stats[key]/summ.match['gameDuration']
            stat_dict[champ][key]['averageValue'][lane]['perGame'] += stats[key]
      least_played_champ = stat_dict[champ]['sampleSize']
      for champion in stat_dict:
        if stat_dict[champion]['sampleSize'] < least_played_champ:
          least_played_champ = stat_dict[champion]['sampleSize']
      print('Least Played Champ Currently: ' + str(least_played_champ))
      summ = Summoner(summoners.pop(rand_int),params = {'beginIndex':i, 'endIndex':i+1})
    else:
      print('not in queue [420, 440]')
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int),params = {'beginIndex':i, 'endIndex':i+1})
    i = (i+1)%30
    FILLER += 1
  for champ in stat_dict:
    for key in stat_dict[champ]:
      if key not in set(['sampleSize']):
        for lne in roles.values():
          stat_dict[champ][key]['averageValue'][lne]['perSecond'] /= stat_dict[champ][key]['totalGames'][lne]
          stat_dict[champ][key]['averageValue'][lne]['perGame'] /= stat_dict[champ][key]['totalGames'][lne]
  json_data = {'data': stat_dict,'tier': tier}
  r.set(tier + '_AVG_DICT', json_data)
  return json_data


@app.task
def traverseData(league, total_matches, sample_size = 4, cache = 3000):
  summoners = buildCache(league)
  avg_dict_full = traverse(summoners, sample_size = sample_size, summ_cache = cache)
  avg_dict = avg_dict_full['data']
  summ = Summoner(summoners.pop(), {})
  print('length of summ!!!: ',len(summoners))
  num = 0
  den = 0
  i = 0
  total =0
  stat_dict = {}
  for s in range(total_matches):
    num = 0
    den = 0
    total = 0
    try:
      summ.createMatches()
    except ValueError:
      i = (i+1)%30
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), params = {'beginIndex':i, 'endIndex':i+1})
      print('couldn\'t create matches')
      continue
    if summ.match['queueId'] in [420, 440]:
      stats = summ.participant_stats
      if len(summoners) < cache:
        new_summoners = set(summ.summoner_list) - set(summ.summoner_name)
        summoners = list(set(summoners).union(new_summoners))
      total = 1
      rand_int = random.randint(0,len(summoners)-1)
      #summ.createLeague()
      champ = champ_lookup[str(summ.champ_id)]['name']
      lane = roles[summ.lane]
      #INIT the dictionary
      if champ not in stat_dict:
        stat_dict[champ] = {'sampleSize': 1}
        for key in stats:
          if type(stats[key])  == bool:
            stat_dict[champ][key] = {'gamesWon':[0,0,0,0,0], 'gameTotal':[0,0,0,0,0], 'total':[0,0,0,0,0]}
          else:
            stat_dict[champ][key] = {'gamesWon':[{'perSecond': 0, 'perGame': 0} for x in range(5)], 'gameTotal': [{'perSecond': 0, 'perGame': 0} for x in range(5)], 'total':[0,0,0,0,0]}
      #build the dictionary
      stat_dict[champ]['sampleSize'] += 1
      for key in stats:
        stat_dict[champ][key]['total'][lane] += 1
        if type(stats[key]) == bool:
          if stats.get(key,False):
            stat_dict[champ][key]['gameTotal'][lane] += 1
            if stats['win']:
              stat_dict[champ][key]['gamesWon'][lane] += 1
        else:
          if stats.get(key,False):
            if stats[key]/summ.match['gameDuration'] > avg_dict[champ][key]['averageValue'][lane]['perSecond']:
              stat_dict[champ][key]['gameTotal'][lane]['perSecond'] += 1
              if stats['win']:
                stat_dict[champ][key]['gamesWon'][lane]['perSecond'] += 1
            if stats[key] > avg_dict[champ][key]['averageValue'][lane]['perGame']:
              stat_dict[champ][key]['gameTotal'][lane]['perGame'] += 1
              if stats['win']:
                stat_dict[champ][key]['gamesWon'][lane]['perGame'] += 1
      print(summ.calls)
      #print(summ.summoner_list, num, den)
      #print(summ.league)
      summ = Summoner(summoners.pop(rand_int),params = {'beginIndex':i, 'endIndex':i+1})
    else:
      print('not in queue [420, 440]',len(summoners))
      rand_int = random.randint(0,len(summoners)-1)
      summ = Summoner(summoners.pop(rand_int), params = {'beginIndex':i, 'endIndex':i+1})
    i = (i+1)%30
  json_data = {'data': stat_dict,'tier': avg_dict_full['tier']}
  r.set(avg_dict_full['tier'] + '_DATA_DICT', json_data)
  return stat_dict
