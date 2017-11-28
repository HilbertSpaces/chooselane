from riotApiCalls import RiotInterface
import time

key = 'RGAPI-64fbd489-7047-4c61-bb06-86f1c59c13de'


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
    self.params = params
    self.league = []
    self.champ_id = 0
    self.game_ids = []
    self.champion = None
    self.participant_stats = {}
    self.total_games = 0
    self.team_id = 0
    self.summoner_name = summoner_name
    self.team = None
    self.timeline = None
    self.participant_id = 0
    self.participant_timeline = None
    self.length = params.get('endIndex',0) - params.get('beginIndex',0)
    self.matchlists = []
    self.lane = ''

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
      raise(ValueError('Could not build matchlist'))
    self.matches_in_matchlist = summoner_matches
    self.length = len(self.matches_in_matchlist)
    return summoner_matches

  def getAllMatchIdsInMatchList(self):
    matchlist_matches = self.getMatchesInMatchlist()
    match_ids = []
    for match in matchlist_matches:
        try:
          match_ids.append(match['gameId'])
        except:
          raise(ValueError('Match IDs failed to build'))
    self.game_ids = match_ids
    return match_ids

  def getMatches(self):
    self.game_ids = self.getAllMatchIdsInMatchList()
    for game_id in self.game_ids:
      self.match = self.interface.getMatchesByGameId(game_id)
      yield self.match

  def createMatches(self):
    try:
      self.summoner = self.interface.getSummonerByName(self.summoner_name)
    except ValueError:
      raise(ValueError('Could not retrieve summoner'))
    try:
      self.matchlists = self.interface.getMatchlistsByAccountId(
         self.summoner['accountId'], self.params)
    except:
      raise(ValueError('Could not retrieve matchlist'))
    self.match_num += 1
    self.matches = self.getMatches()
    try:
      next(self.matches)
    except StopIteration:
      raise(ValueError('Could not retrieve match'))
    self.createParticipant()
    self.createTeam()
    self.createMatchSummoners()

  def getNextMatch(self):
    if self.match_num == -1:
      self.createMatches()
    else:
      try:
        next(self.matches)
      except ValueError:
        raise(ValueError('Could not retrieve match id: '+str(
          self.game_ids[self.match_num])))
      except StopIteration:
        raise(ValueError('Could not retrieve match number: '+str(
          self.params.get(
            'beginIndex',0) + self.match_num)+' for: ' + self.summoner_name))
      self.match_num += 1
      self.createParticipant()
      self.createTeam()
      self.createMatchSummoners()

  def createLeague(self):
    try:
      self.summoner = self.interface.getSummonerByName(self.summoner_name)
    except ValueError:
      raise(ValueError('Could not retrieve summoner'))
    self.league = self.interface.getLeagueBySummonerId(self.summoner['id'])

  def createParticipant(self):
    self.total_games = self.matchlists['totalGames']
    current_matchlist = self.matchlists.get('matches', [None])[self.match_num]
    self.champ_id = current_matchlist['champion']
    self.lane = current_matchlist['lane']
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
