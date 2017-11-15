from requests.utils import quote
import requests
import json
import time

class RiotInterface(object):

  def __init__(self, key, limiter):
    self.key = key
    self.api_key = 'api_key=' + self.key
    self.limiter = limiter
    self.calls = 0
  def summNameJoin(self, summ_name):
    summ_split = summ_name.split()
    summ_percent = ''
    for i in range(len(summ_split)-1):
      summ_percent += summ_split[i] +'%20'
    summ_percent += summ_split[-1]
    return summ_percent

  def queryBuilder(self, param_dict):
    full_path = ''
    for key in param_dict:
      full_path += key + '=' + str(param_dict[key]) + '&'
    return full_path

  #return a summoner object containing: profileIconId (int), name(str),
  #summonerLevel(int), revisionDate(str), id(int), and accountId(int)
  def getSummonerByName(self, summ_name):
    summ_name = quote(summ_name)
    print(summ_name)
    summ_name += '?'
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'
    summoner = requests.get(url + summ_name + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return summoner

  def getSummonerByAccountId(self, summ_account):
    summ_account = str(summ_account) + '?'
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-account/'
    summoner = requests.get(url + summ_account + self.api_key).json()
    self.calls += 1
    return summoner

  def getSummonerBySummonerId(self, summ_id):
    summ_id = str(summ_id) + '?'
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/'
    summoner = requests.get(url + summ_id + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return summoner

  #return a matchlist object cointaining: matches (MatchReference),
  #totalGames(int), startIndex(int), endIndex(int)
  #a MatchReference contains: lane(str), gameId(int), champion(int),
  #platformId(str), season(int), queue(int), role(str), timestamp(int)
  def getMatchlistsByAccountId(self, account_id, param_dict = {}):
    account_id = str(account_id) + '?'
    query = self.queryBuilder(param_dict)
    url =  'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'
    matchlists= requests.get(url + account_id + query + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return matchlists

  def getMatchlistsByAccountRecent(self, account_id):
    account_id = str(account_id) + '?'
    url = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'
    matchlists = requests.get(url + account_id + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return matchlists

  #return a match object containing: seasonId(int), queueId(int),	gameId(int),
  #participantIdentities(List[ParticipantIdentityDto]), gameVersion(str),
  #platformId(str), gameMode(str), mapId(int), gameType(str),
  #teamsList([TeamStatsDto]), participants(List[ParticipantDto]),
  #gameDuration(int), gameCreation(int)
  #participantstats and participanttimeline written in list of 82
  def getMatchesByGameId(self, game_id):
    match_id = str(game_id) + '?'
    url = 'https://na1.api.riotgames.com/lol/match/v3/matches/'
    match = requests.get(url + match_id + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return match

  def getTimelinesByMatchId(self, match_id):
    match_id = str(match_id) + '?'
    url = 'https://na1.api.riotgames.com/lol/match/v3/timelines/by-match/'
    timelines = requests.get(url + match_id + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return timelines

  def getLeagueBySummonerId(self, summ_id):
    summ_id = str(summ_id) + '?'
    url = 'https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/'
    league = requests.get(url + summ_id +self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return league

  def getChampList(self, param_dict = {}):
    url = 'https://na1.api.riotgames.com/lol/league/v3/champions/?'
    query = self.queryBuilder(param_dict)
    champions = requests.get(url + query + self.api_key)
    time.sleep(self.limiter)
    self.calls += 1
    return champions

  def getChampionById(self, champ_id = '', locale = 'en_US', param_dict = {}):
    if champ_id is not '':
      champ_id = str(champ_id) + '?'
    query = self.queryBuilder(param_dict)
    url ='https://na1.api.riotgames.com/lol/static-data/v3/champions/'
    locale = 'locale=' + locale + '&'
    champion = requests.get(url + champ_id + locale + self.api_key).json()
    time.sleep(self.limiter)
    self.calls += 1
    return champion
