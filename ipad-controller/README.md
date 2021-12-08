# Abatek stream gui controller

Denne webappen brukes på en iPad eller datamaskin for å styre ui-et som vises i stream. VI skriver den modular, så baset-delen skal finnes på /basket.

### Valg vi tar i appen

Vi står fritt til å ta de valg vi ønsker. Kanskje vi skal bruke noe lett for å gjøre css her? Evt liker jeg styled-components hvis vi skriver css selv.

Litt ting jeg tenker må gjøres riktig:
For å håndtere client side state ønsker vi på sikt å bruke RTK, men dette er ikke et krav i første omgang.

For å sende events til backenden foreslår jeg at vi lager en /basketball post i backenden som tar inn en body: {event: <name>} i stedet for å lage mange forskjellige endepunketer. Dette kan gjøre at vi kan skrive frontenden med mindre kode.

Punkter med :white_check_mark: er allerede fullført!
Resten venter vi med.

## De forskjellige delene av appen:

### Forsiden:

- Dette skal være en enkel side med de forskjellige modulene man kan velge :white_check_mark:
- Det skal også være mulig å koble til en backend fra denne siden. Type "Skriv inn addresse som vi kan bruke som bff"
- På sikt kan den gjøre automatisk tilkobling til backenden med fping eller lignende?

### Basket:

- Dette er en modul som er tightly koblet mot basket-servicene. Her trenger vi følgende funksjonlaitet:
  - Når kanpper er aktive vil jeg at de skal ha en utfyllende farge, slik at det er lett å se når de er disabled og ikke :white_check_mark:
  - Knapp for å toggle visning av score (event: show_score / hide_score) :white_check_mark:
  - Knapp for å vise klokken (event: show_game_clock / hide_game_clock) :white_check_mark:
  - En genrell komponent for å opprette lignende knapper som over
  - Knapp for å åpne spillerstats-visning
    - Knapper for å velge type stats som skal vises og hvilke spiller som skal vises stats for
  - Knapp for å toggle total score utfyllende visning (total score utfyllende = sånn som dekker hele undersiden; vi kommer til å definere dette bedre i domenet i bffen) (event: show_game_scoring_stats / hide_game_scoring_stats)
  - Knapp for å toggle visning av lagstats (event: show_team_stats / hide_team_stats)
