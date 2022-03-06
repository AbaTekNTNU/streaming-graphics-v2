# ABATEK stream ui frontend

Mainely used for basket..

Bruk denne bff-en: https://github.com/AbaTekNTNU/stream-bff-v2

For å endre score, bruk fx denne:

```bash
curl -X POST -H 'content-type: application/json' -d '{"type": "score", "payload": {"home":10, "away": 10}}'  localhost:4000/controller
```

## Grafikkelementer

Grafikkelementer må implementeres likt NBBF sine komponenter. Disse finnes i /graphics

## Hvordan sette opp kamper

Eventuelle endringer på en kamp sendes som en commit til kodebasen.

Åpne [teamsConfig](src/modules/basket/teamsConfig.ts), og bytt ut navn, forkortelse (se [team_shortnames](assets/team_shortnames.png)) og logo på alle lagene (se [public/logos](public/logos)).

> Informasjon om kamp ligger på basket.no/firi-ligaen

### Kvinner eller menn på logo

Gå inn i [basketConfig](src/modules/basket/basketconfig.ts) og endre BasketConfig til `BasketSkin.FIRI_WOMEN` eller `BasketSkin.FIRI_MEN`

Send endringer som en commit-melding

## Oppdatere ec2 til å subcscribe til kommende kamp

> Husk å pulle eventuelle endringer!

Informasjon på kommenda kamp ligger på basket.no/firi-ligaen. Finn den kommende kampen og hent **id** fra _Kampinfo_-siden sin url.

Gå inn i basket-utils sin `config.py` og sett verdien til dette.

Endelig bør man gå i sin lokale `config.py` i basket-utils og gjøre det samme.

## Hente kampinformasjon

Kampinformasjon kan også hentes fra _Kampinfo_-siden. Til dette brukes `setup.py` eller `setup2.py`.
