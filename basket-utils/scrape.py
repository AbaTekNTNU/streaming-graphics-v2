import json
import requests
from bs4 import BeautifulSoup
import os
import uuid
import datetime
import psycopg2

from aggregate import getLastMatchDetails

conn = psycopg2.connect(host="localhost", user="postgres",
                        password="password", port=5432)


def searchForStatsInScript(statsKey, source):
    startPosition = source.find(statsKey)
    if (startPosition == -1 or startPosition == None):
        return None

    endPosition = startPosition + len(statsKey)

    startParanteses = -1
    offset = 0

    for i, char in enumerate(source[endPosition:]):
        if (char == "("):
            if(startParanteses == -1):
                offset = i
            startParanteses += 1
        else:
            if (char == ")"):
                if (startParanteses == 0):
                    return source[endPosition + offset + 1:endPosition + i]
                else:
                    if (startParanteses >= 0):
                        startParanteses -= 1

    return None


def getHomeTeamScore(matchData):
    return matchData['nif.matchDetails.matchSummary']['HomeGoals']


def getAwayTeamScore(matchData):
    return matchData['nif.matchDetails.matchSummary']['AwayGoals']


def getHomeTeam(matchData):
    return matchData['nif.matchDetails.matchSummary']['HomeTeam']


def getAwayTeam(matchData):
    return matchData['nif.matchDetails.matchSummary']['AwayTeam']


def getTimeStamp():
    return datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()


def checkMatchIntegrty(matchId):
    if (os.path.isfile("data/summary.json")):
        with open("data/summary.json", "r") as f:
            return matchId == json.loads(f.read())['matchId']
    return True


def updateSummary(newHash, matchData, matchId):

    def addResultToDb():
        conn.cursor().execute("insert into score (matchid, hometeam, awayteam) values(%s, %s, %s)",
                              (matchId, getHomeTeamScore(matchData), getAwayTeamScore(matchData)))
        conn.commit()

    def generateSummary():
        timeStamp = getTimeStamp()
        return {'createdAt': timeStamp, 'modifiedAt': timeStamp, 'versions': [], 'homeTeam': getHomeTeam(matchData), 'awayTeam': getAwayTeam(matchData), 'matchId': matchId}

    def appendHash(config, newHash):
        newVersion = {'version': newHash,
                      'created': getTimeStamp()}
        config['versions'].append(newVersion)
        return config

    def saveSummary(config):
        with open("data/summary.json", "w", encoding="utf8") as f:
            json.dump(config, f)

    if (not os.path.exists("data/summary.json")):
        saveSummary(generateSummary())

    previousSummaryFile = open("data/summary.json", "r")
    previousSummary = json.load(previousSummaryFile)
    previousSummaryFile.close()

    addResultToDb()
    summary = appendHash(previousSummary, newHash)
    saveSummary(summary)


def appendSummaryFile(matchData, hash):
    os.mkdir("data/%s" % hash)
    with open("data/%s/matchData.json" % hash, "w", encoding="utf8") as f:
        json.dump(matchData, f)


def formatData(key, data):
    # the plan is to sanitize some data here
    if (key == "nif.matchDetails.matchSummary"):
        return json.loads(data)
    elif (key == "nif.matchDetails.matchStatistics"):
        return json.loads(data)
    return key


matchId = "7380067"

baseUrl = "https://wp.nif.no/MatchDetails?id=%s" % matchId

# unconnemnt to refetch
matchDetails = requests.get(baseUrl)

# comment in order to stop using dummy data
#inFile = open("matchDetails.html", "r", encoding="utf8")

# uncomment
matchDetailsBody = BeautifulSoup(
    matchDetails.text, features="html.parser")

# comment to use sharp data
# matchDetailsBody = BeautifulSoup(
# inFile.read().encode("utf8"), features="html.parser")
# inFile.close()

# uncomment to cache file for development
outFile = open("matchDetails.html", "w")
outFile.write(matchDetailsBody.prettify())
outFile.close()


result = matchDetailsBody.findAll("script")


# print(result)
# print(len(result))
#
# print(result.find("nif.matchDetails.matchSummary"))
# print(result[159:169])

interestingKeys = ["nif.matchDetails.matchSummary",
                   "nif.matchDetails.matchEvents",
                   "nif.matchDetails.matchStatistics"]

matchData = {}

for script in result:
    for searchKey in interestingKeys:
        searchResult = (searchForStatsInScript(searchKey, str(script)))
        if (searchResult != None):
            interestingKeys.remove(searchKey)
            matchData[searchKey] = formatData(searchKey, searchResult)


if not os.path.exists("data"):
    os.mkdir("data")

generatedFileHash = uuid.uuid4().hex


if (checkMatchIntegrty(matchId)):
    appendSummaryFile(matchData, generatedFileHash)
    updateSummary(generatedFileHash,
                  matchData, matchId)
else:
    print("Current match id is not the same as fetched")


currentMatchDetalis = getLastMatchDetails(matchId)
print(currentMatchDetalis)
