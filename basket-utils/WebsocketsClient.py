from pubnub.pubnub import PubNub, SubscribeCallback
from pubnub.pnconfiguration import PNConfiguration
import config
import uuid
import requests
import json

baseUrl = "%s/message" % (config.basketServiceUrl)


class SubscribeHandler(SubscribeCallback):
    def status(self, pubnub, event):
        print("Is there an error? ", event.is_error())
        print("Status value for category: %s" % event.category)
        print("Status value for error_data: %s" % event.error_data)
        print("Status value for error: %s" % event.error)
        print("Status value for status_code: %s" % event.status_code)
        print("Status value for operation: %s" % event.operation)
        print("Status value for tls_enabled: %s" % event.tls_enabled)
        print("Status value for uuid: %s" % event.uuid)
        print("Status value for auth_key: %s" % event.auth_key)
        print("Status value for origin: %s" % event.origin)
        print("Status value for client_request: %s" % event.client_request)
        print("Status value for client_response: %s" % event.client_response)
        print("Status value for original_response: %s" %
              event.original_response)
        print("Status value for affected_channels: %s" %
              event.affected_channels)
        print("Status value for affected_groups: %s" % event.affected_groups)

    def presence(self, pubnub, presence):
        pass  # Handle incoming presence data

    def message(self, pubnub, message):
        print("Got message \n")
        with open("jsonCommands.dat", "a") as f:
            f.write(json.dumps(message.message) + "\n")
        sending = json.dumps(message.message)
        print(message.message)

        print("Sending")
        print(sending)

        requests.post(baseUrl, data=sending, headers={
                      'content-type': 'application/json'})

    def signal(self, pubnub, signal):
        pass  # Handle incoming signals


pnconfig = PNConfiguration()

myUniqueUuid = uuid.uuid4()

print("Using unique uuid", myUniqueUuid)

pnconfig.subscribe_key = config.subKey
pnconfig.uuid = str(myUniqueUuid)
pubnub = PubNub(pnconfig)


pubnub.add_listener(SubscribeHandler())
pubnub.subscribe().channels("match:%s:all" % (config.matchId)).execute()
