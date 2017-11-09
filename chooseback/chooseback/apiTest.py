from riotApiCalls import RiotInterface

key = 'RGAPI-3a6d1b7a-201f-4e53-b209-85db84e44beb'

Ramanujanprime = RiotInterface(key)

name = Ramanujanprime.getSummonerByName('RamanujanPrime')
print(name)
