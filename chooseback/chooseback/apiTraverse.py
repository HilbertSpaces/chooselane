from summonerApi import Summoner
import random

rp = Summoner('ramanujanprime', .2, {})
num = 0
den = 0
pt_id = 0
i = 0
for s in range(2000):
  rp.createMatches()
  rp.createMatchSummoners()
  rp.createLeague()
  stats = rp.participant_stats
  if stats['firstTowerKill'] or stats['firstTowerAssist']:
    if stats['win']:
      num += 1
    den += 1
  print(rp.summoner_list, rp.participant_id, pt_id)
  rp = Summoner(rp.summoner_list[pt_id],sleep=.3,params= {'beginIndex':i, 'endIndex':i+1})
  pt_id = (pt_id+1)%10
