from summonerApi import Summoner
from riotApiCalls import RiotInterface
import random

rp = Summoner('RamanujanPrime', .2, {})
'''
rti = RiotInterface('RGAPI-1b0fa30c-917f-43d4-ba3b-4bce3c614508',.1)
print(rti.getMatchlistsByAccountId(rp.summoner['accountId'], {'beginIndex':0, 'endIndex':1}))
'''

num = 0
den = 0
#pt_id = 0
i = 0
summoners = list()
for s in range(2000):
  try:
    rp.createMatches()
  except ValueError:
    i = (i+1)%30
    rand_int = random.randint(0,len(summoners)-1)
    rp = Summoner(summoners.pop(rand_int), sleep = 1, params = {'beginIndex':i, 'endIndex':i+1})
    print('couldn\'t create matches')
    continue
  rp.createLeague()
  if rp.match['queueId'] in [420, 440]:
    stats = rp.participant_stats
    if len(summoners) < 4000:
      new_summoners = set(rp.summoner_list) - set(rp.summoner_name)
      summoners = list(set(summoners).union(new_summoners))
      rand_int = random.randint(0,len(summoners)-1)
    if stats.get('firstTowerKill',False) or stats.get('firstTowerAssist',False):
      if stats['win']:
        num += 1
      den += 1
    print(rp.summoner_list, num, den, rp.match['mapId'])
    print(rp.match_num)
    rp = Summoner(summoners.pop(rand_int),sleep=1,params = {'beginIndex':i, 'endIndex':i+1})
  else:
    print('not in queue [420, 440]')
    rand_int = random.randint(0,len(summoners)-1)
    rp = Summoner(summoners.pop(rand_int), sleep=1, params = {'beginIndex':i, 'endIndex':i+1})
  i = (i+1)%30
'''
class Traversal(object):

  def __init__(self):
    self.order = []

  def traverseUp(self):
    for s in range(2000):
      try:
        rp.createMatches()
      except ValueError:
        i = 0
        summoners.pop(rand_int)
        rand_int = random.randint(0,len(summoners)-1)
        rp = Summoner(summoners.pop(rand_int), sleep = 1, params = {'beginIndex':i, 'endIndex':i+1})
        continue
      rp.createMatchSummoners()
      rp.createLeague()
      if rp.match['queueId'] in [420, 440]:
        stats = rp.participant_stats
        if len(summoners) < 4000:
          new_summoners = set(rp.summoner_list) - set(rp.summ_name)
          summoners = list(set(summoners).union(new_summoners))
          rand_int = random.randint(0,len(summoners)-1)
        if stats.get('firstTowerKill',False) or stats.get('firstTowerAssist',False):
          if stats['win']:
            num += 1
          den += 1
        print(rp.summoner_list, num, den, rp.match['mapId'])
        print(rp.match_num)
        rp = Summoner(summoners.pop(rand_int),sleep=1,params = {'beginIndex':i, 'endIndex':i+1})
      else:
        rand_int = random.randint(0,len(summoners)-1)
        rp = Summoner(summoners.pop(rand_int), sleep=.3, params = {'beginIndex':i, 'endIndex':i+1})
      i = (i+1)%100
'''
