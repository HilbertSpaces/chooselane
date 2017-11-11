from riotApiCalls import RiotInterface
import time

key = 'RGAPI-951c25af-ce88-4021-ac66-29095ba93d9e'
interface = RiotInterface(key, .3)

class Summoner(object):

  def __init__(self, summoner, sleep = .1, params = {}):
    self.sleep = sleep
    self.params = params
    self.summoner = summoner
    self.summoner_id = summoner['id']
    self.interface = interface
    self.matchlists = []
    self.matches_in_matchlist= []
    self.game_ids = []
    self.match = None
    self.matches = None
    self.match_num = -1
    self.leagues = []
    self.champ_id = 0
    self.champion = None
    self.participant_stats = {}
    self.total_games = 0
    self.team_id = 0
    self.team = None
    self.timeline = None
    self.participant_id = 0
    self.participant_timeline = None
    self.length = params.get('endIndex',0) - params.get('beginIndex',0)

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
  def getMatchlists(self):
    summoner_id = self.summoner['accountId']
    summoner_matchlists = self.interface.getMatchlistsByAccountId(
      summoner_id, self.params)
    self.matchlists = summoner_matchlists
    return summoner_matchlists

  # Matches contain lane, gameId, champion, platformId, season, queue, role and
  # timestamp
  def getMatchesInMatchlist(self):
    summoner_matchlists = self.getMatchlists()
    try:
      summoner_matches = summoner_matchlists['matches']
    except:
      self.getNextMatch()
      return
    self.matches_in_matchlist = summoner_matches
    self.length = len(self.matches_in_matchlist)
    return summoner_matches

  def getAllMatchIdsInMatchList(self):
    matchlist_matches = self.getMatchesInMatchlist()
    match_ids = []
    for match in matchlist_matches:
        match_ids.append(match['gameId'])
    self.game_ids = match_ids
    return match_ids

  def getMatches(self):
    game_ids = self.getAllMatchIdsInMatchList()
    for game_id in game_ids:
      self.match = self.interface.getMatchesByGameId(game_id)
      yield self.match

  def createMatches(self):
    self.matches = self.getMatches()
    self.matches.__next__()
    self.createParticipant()
    self.match_num += 1

  def getNextMatch(self):
    if self.match_num == -1:
      self.createMatches()
    else:
      self.matches.__next__()
      self.match_num += 1

  def createLeague(self):
    self.leagues = self.interface.getLeagueBySummonerId(self.summoner_id)

  def createParticipant(self):
    self.total_games = self.matchlists['totalGames']
    current_matchlist = self.matchlists['matches'][self.match_num]
    self.champ_id = current_matchlist['champion']
    participant_list = self.match['participants']
    for participant_data in participant_list:
      if participant_data['championId'] == self.champ_id:
        self.participant_stats = participant_data['stats']
        self.participant_timeline = participant_data['timeline']
        self.participant_id = participant_data['participantId']
        self.team_id = participant_data['teamId']

  def createTeam(self):
    teams = self.match['teams']
    for team in teams:
      if team['teamId'] == self.team_id:
        self.team = team

  def createChampion(self):
    self.champion = self.interface.getChampionById(self.champ_id)

  def initAll(self):
    self.createParticipant()
    self.createTeam()
    self.createChampion()

#class SummonerMatchFlattener(object):

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

rp = interface.getSummonerByName('RamanujanPrime')
print(rp)
rp = Summoner(rp, .2, {})
rp.createMatches()
rp.initAll()
for s in range(rp.length):
  print(rp.champion, ": ", rp.participant_stats['kills'])
  rp.getNextMatch()
  rp.initAll()