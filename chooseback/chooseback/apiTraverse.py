from summonerApi import Summoner

rp = Summoner('ramanujanprime', .1, {})
rp.createMatches()
rp.createMatchSummoners()
for s in range(1):
  print(rp.summoner_list)
  rp.getNextMatch()
