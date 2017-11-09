from riotApiCalls import RiotInterface
import time

key = 'RGAPI-3a6d1b7a-201f-4e53-b209-85db84e44beb'


class SummonerMatchFiltration(object):

  def __init__(self, name_id, sleep = .1, params = {}):
    self.sleep = sleep
    self.params = params
    self.summoner_name_id = name_id
    self.interface = RiotInterface(key)

  def description(self):
    desc = '''Takes a summoner name (str) or id(int), a sleep(float) and a
        query dictionary(dict). The summoner name or id is the name (id)
        of the summoner you would like to query. The sleep parameter indicates
        how long you would like to pause to avoid hitting rate limits. The
        dictionary  is the set of all queries you would like to apply to the
        matchlist. \n queue: set of Ids for filtering \n endTime: the endtime
        for filtering matchlists in epoch. \n beginIndex: index for first game
        to look for \n beginTime: begintime for filtering matches in epoch
        \n season: the season to look for \n champion: set of champion IDs to
        filter matchlist \n endIndex: index for last game to look for
        '''
    return desc

  # A matchlist is a list with matches[MatchReference], totalGames startIndex
  # and endIndex
  def getToMatchlists(self):
    if type(self.summoner_name_id) == str:
      summoner = self.interface.getSummonerByName(self.summoner_name_id)
    else:
      summoner = self.interface.getSummonerByAccountId(self.summoner_name_id)
    summoner_id = summoner['accountId']
    summoner_matchlists = self.interface.getMatchlistsByAccountId(
      summoner_id, params)
    return summoner_matchlists

  # Matches contain lane, gameId, champion, platformId, season, queue, role and
  # timestamp
  def getToMatchesInMatchlist(self):
    summoner_matchlists = self.getToMatchlists()
    summoner_matches = summoner_matchlists['matches']
    return summoner_matches

  def getAllMatchIdsInMatchList(self):
    matchlist_matches = self.getToMatchesInMatchlist()
    match_ids = []
    for match in matchlist_matches:
        match_ids.append(match['gameId'])
    return match_ids

  def getMatch(self, game_id):
      return self.interface.getMatchesByGameId(game_id)

'''
  match_len = len(rp_matches)
  wins = 0
  total = 0
  for i in range(match_len):
    time.sleep(.1)
    rp_match_id = rp_matches[i]['gameId']
    rp_match = interface.getMatchesByMatchId(rp_match_id)
  # ParticipantIdentityDto
    try:
      rp_match['participantIdentities']
    except:
      continue
    for pos, participant in enumerate(rp_match['participantIdentities']):
      if participant['player']['summonerName'] == 'RamanujanPrime':
        save = pos
      else:
        continue
    rp_participant = rp_match['participants'][save]
    rp_stats = rp_participant['stats']
    rp_win = rp_stats['win']
    print(rp_stats)
    try:
      if rp_stats['firstTowerKill'] or rp_stats['firstTowerAssist']:
        total+=1
        if rp_win:
          wins+=1
    except:
      continue
'''

rpMatchFiltration = SummonerMatchFiltration('RamanujanPrime', .1, {})

print(Trans.description())
