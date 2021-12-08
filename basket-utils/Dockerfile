FROM python:3.8

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY config.py config.py

COPY WebsocketsClient.py WebsocketsClient.py
COPY setup.py setup.py

CMD [ "python3", "-u", "WebsocketsClient.py" ]