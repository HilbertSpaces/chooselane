import requests
import json


class RiotInterface(object):
  def __init__(self, key):
    self.key = key
    self.api_key = 'api_key=' + self.key

  def queryBuilder(param_dict):
    full_path = ''
    for key, value in query_dict:
      full_path += key + '=' + value + '&'
    return full_path

  #return a summoner object containing: profileIconId (int), name(str),
  #summonerLevel(int), revisionDate(str), id(int), and accountId(int)
  def getSummonerByName(summ_name):
    summ_name = summ_name + '?'
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'
    summ = requests.get(url + summ_name + self.api_key).json()
    return summoner

  def getSummonerByAccount(summ_account):
    summ_account = summ_account + '?'
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-account/'
    summoner = requests.get(url + summ_account + self.api_key).json()
    return summoner

  def getSummonerById(summ_id):
    summ_id = summ_id + '?'
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/'
    summoner = requests.get(url + summ_id + self.api_key).json()
    return summoner

  #return a matchlist object cointaining: matches (MatchReference),
  #totalGames(int), startIndex(int), endIndex(int)
  #a MatchReference contains: lane(str), gameId(int), champion(int),
  #platformId(str), season(int), queue(int), role(str), timestamp(int)
  def getMatchlistsByAccount(account_id, param_dict):
    account_id = account_id + '?'
    query = self.queryBuilder(param_dict)
    url =  'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'
    matchlists= requests.get(url + account_id + query + self.api_key).json()
    return matchlists

  def getMatchlistsByAccountRecent(account_id):
    account_id = account_id + '?'
    url = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'
    matchlists = requests.get(url + account_id + self.api_key).json()
    return matchlists

  #return a match object containing: seasonId(int), queueId(int),	gameId(int),
  #participantIdentities(List[ParticipantIdentityDto]), gameVersion(str),
  #platformId(str), gameMode(str), mapId(int), gameType(str),
  #teamsList([TeamStatsDto]), participants(List[ParticipantDto]),
  #gameDuration(int), gameCreation(int)
  #participantstats and participanttimeline written in list of 82
  def getMatchesById(match_id):
    match_id = match_id + '?'
    url = 'https://na1.api.riotgames.com/lol/match/v3/matches/'
    match = requests.get(url + match_id + self.api_key).json()
    return match

  def getTimelinesById(match_id):
    match_id = match_id + '?'
    url = 'https://na1.api.riotgames.com/lol/match/v3/timelines/by-match/'
    match = requests.get(url + match_id + self.api_key).json()
