# Basket service

### Correct score example:

```bash
curl -X POST -H 'content-type: application/json' -d '{"type":"score", "payload": {"home": 60, "away": 54}}' http://localhost:8000/correct
```

### Correct stats example:

```bash
curl -X POST -H 'content-type: application/json' -d '{"type": "stats", "payload": {"stats": {"score": 14, "assists": 10, "turnovers": 3, "shotsMade": {"2": 2, "1": 1, "3": 3}, "shotsMissed": {"1": 10, "2": 20, "3": 30}}, "team": "A", "playerId": 6428296}}' localhost:8000/correct
```
