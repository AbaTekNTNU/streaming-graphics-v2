# Basket utils

## Running during games - without docker

1. Update subkey (has not changed yet during 2021 / 2022 season) in config.py
1. Update matchId in config.py
1. Make sure basket service node application (port: 8000) is running
1. Start socket listener: `python3 WebsocketsClient.py`
1. Make sure players information is available at NIF live page
1. Send setup commands `python3 setup.py`
1. Make sure game data is visible in basket service state `curl localhost:8000/state`
1. You don't have to do anything other than stopping WebsocketsClient after game is done.

## Getting started

1. This package is made to gather information from NBBF and push it into our applications.
   In order to get started, add config.py with matchId (the id of the match to gather information about) and subkey (pubunb subscription key).

See config-example.py

1. Install virtual environment

```bash
python3 -m venv venv
```

1. Activate virutual enviroment

```bash
source venv/bin/activate
```

1. Install required packages (only first time)

```bash
pip3 install -r requirements.txt
```

Then you should be good to go!
