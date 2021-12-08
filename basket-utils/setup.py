import requests
import json
import uuid

# subKey = "sub-c-fa031a92-9639-11e8-8ef1-fea37cdf89b9"
# matchId = "7380067"
numberOfEventsToCapture = 100

baseUrlToPushResults = "http://localhost:8000/team"

supKey = "sub-c-fa031a92-9639-11e8-8ef1-fea37cdf89b9"

matchId = "7450472"

fetchUrl = "https://ps15.pubnub.com/v2/history/sub-key/" + str(supKey) + "/channel/match%3A" + str(
    matchId)+"%3Aall?include_token=true&count=" + str(numberOfEventsToCapture) + "&string_message_token=true&reverse=true&uuid="+str(uuid.uuid4())

print(fetchUrl)

firstData = requests.get(fetchUrl)

response = firstData.json()

print(response)

with open("setupCach.json", "w") as f:
    f.write(json.dumps(response))

# response = json.load(open("setupCach.json", "r"))

lastHomeTeamUpdate = None
lastAwayTeamUpdate = None
numberOfTeamUpdates = 0

for r in response[0]:
    if (r['message']['EventType'] == 3 and (r['message']['MatchEventType'] == "TeamUpdate")):
        numberOfTeamUpdates += 1
        if (r['message']['Team'] == 'H'):
            lastHomeTeamUpdate = r['message']
        else:
            lastAwayTeamUpdate = r['message']

if (lastHomeTeamUpdate != None and lastAwayTeamUpdate != None):
    requests.post(baseUrlToPushResults, data=json.dumps(
        {'home': lastHomeTeamUpdate, 'away': lastAwayTeamUpdate}
    ), headers={'content-type': 'application/json'})
else:
    print("No team updates yet")
