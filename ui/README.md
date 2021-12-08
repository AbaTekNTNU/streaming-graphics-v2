# ABATEK stream ui frontend

Mainely used for basket..

Bruk denne bff-en: https://github.com/AbaTekNTNU/stream-bff-v2

For å endre score, bruk fx denne: 

```bash
curl -X POST -H 'content-type: application/json' -d '{"type": "score", "payload": {"home":10, "away": 10}}'  localhost:4000/controller
``` 

## Grafikkelementer
Grafikkelementer må implementeres likt NBBF sine komponenter. Disse finnes i /graphics

