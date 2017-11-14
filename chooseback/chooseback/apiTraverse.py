from summonerApi import Summoner
from riotApiCalls import RiotInterface
import random

rp = Summoner('I Eát Áss', .2, {})
'''
rti = RiotInterface('RGAPI-1b0fa30c-917f-43d4-ba3b-4bce3c614508',.1)
print(rti.getMatchlistsByAccountId(rp.summoner['accountId'], {'beginIndex':0, 'endIndex':1}))
'''

num = 0
den = 0
pt_id = 0
i = 0
for s in range(2000):
  rp.createMatches()
  rp.createMatchSummoners()
  rp.createLeague()
  stats = rp.participant_stats
  if stats.get('firstTowerKill',False) or stats.get('firstTowerAssist',False):
    if stats['win']:
      num += 1
    den += 1
  print(rp.summoner_list,num,den)
  try:
    rp = Summoner(rp.summoner_list[pt_id],sleep=.3,params = {'beginIndex':i, 'endIndex':i+1})
  except:
    i = 0
    rp = Summoner(rp.summoner_list[pt_id],sleep=.3,params = {'beginIndex':i, 'endIndex':i+1})
  pt_id = (pt_id+1)%10
  i+=1
