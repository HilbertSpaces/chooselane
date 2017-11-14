from riotApiCalls import RiotInterface
import time

key = 'RGAPI-1b0fa30c-917f-43d4-ba3b-4bce3c614508'


class Summoner(object):

  def __init__(self, summoner_name, sleep = .1, params = {}):
    self.sleep = sleep
    self.interface = RiotInterface(key, sleep)
    self.matches_in_matchlist= []
    self.summoner_list = []
    self.game_ids = []
    self.match = None
    self.matches = None
    self.match_num = -1
    self.league = []
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
    try:
      self.summoner = self.interface.getSummonerByName(summoner_name)
      self.matchlists = self.interface.getMatchlistsByAccountId(self.summoner['accountId'], params)
    except:
      raise(ValueError('Could not retrieve summoner'))

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

  # Matches contain lane, gameId, champion, platformId, season, queue, role and
  # timestamp
  def getMatchesInMatchlist(self):
    try:
      summoner_matches = self.matchlists['matches']
    except:
      self.getNextMatch()
      return 'match number:' + str(match_num) + 'failed to build'
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
    self.match_num += 1
    self.matches = self.getMatches()
    self.matches.__next__()
    self.createParticipant()
    self.createTeam()

  def getNextMatch(self):
    if self.match_num == -1:
      self.createMatches()
    else:
      self.matches.__next__()
      self.match_num += 1
      self.createParticipant()
      self.createTeam()

  def createLeague(self):
    self.league = self.interface.getLeagueBySummonerId(self.summoner['id'])

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

  def createMatchSummoners(self):
    participant_ids = self.match['participantIdentities']
    for participant_id in participant_ids:
      self.summoner_list.append(participant_id['player']['summonerName'])
