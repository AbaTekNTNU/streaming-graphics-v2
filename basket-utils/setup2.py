import json
import requests
import config

response = json.load(open("domainData/setupCach.json", "r"))


baseUrlToPushResults = "%s/team" % (config.basketServiceUrl)


if (response[0][0]['message']['EventType'] == 0):
    requests.post(baseUrlToPushResults, data=json.dumps(
        {'home': {"Players": response[0][0]['message']['HomePlayers'] + response[0][0]['message']['HomeCoaches']},
         'away': {"Players": response[0][0]['message']['AwayPlayers'] + response[0][0]['message']['AwayCoaches']}}
    ), headers={'content-type': 'application/json'})
