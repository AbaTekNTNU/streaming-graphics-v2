import json
import requests
import config

response = json.load(open("setupCach.json", "r"))


baseUrlToPushResults = "%s/team" % (config.basketServiceUrl)


if (response[0][0]['message']['EventType'] == 0):
    requests.post(baseUrlToPushResults, data=json.dumps(
        {'home': {"Players": response[0][0]['message']['HomePlayers']},
         'away': {"Players": response[0][0]['message']['AwayPlayers']}}
    ), headers={'content-type': 'application/json'})
