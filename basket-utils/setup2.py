import json
import requests

response = json.load(open("setupCach.json", "r"))


baseUrlToPushResults = "http://localhost:8000/team"


if (response[0][0]['message']['EventType'] == 0):
    requests.post(baseUrlToPushResults, data=json.dumps(
        {'home': {"Players": response[0][0]['message']['HomePlayers']},
         'away': {"Players": response[0][0]['message']['AwayPlayers']}}
    ), headers={'content-type': 'application/json'})
