# streaming-graphics-v2

Dette biblioteket håndterer fra og med 8. desember 2021 alt AbaTek leverer av grafikk på streams.

# Modulene

### basket-service

Språk: TS, express\
Port: 8000\
Denne modulen brukes til å motta meldinger fra NBBF sin Pubnub, serialisere disse, håndtere state-endinger og dispatche dette videre til bff-applikasjonen for å endre frontend fremvisning.
Applikasjonen holder all basket-state, for å holde domenet basket i denne applikasjonen. Den er ikke avhengig av database på nåværende tidspunkt, men det kan endre seg.

### basket-utils

Basket utils er en samling av python script for å kunne gjøre et automatisert scoreboard under en basketkamp. Her har vi både scripts for å scrape nif-html-sider, subscribe til pubnub, og å hente history fra pubnub. WebsocketsClient subscriber til pubnub og vil dispatche events til basket-backend.

### bff

Språk: TS, express\
Port: 4000\
BFF er en generell backend som fungerer som en middelservice. Denne mottar events fra basket-service før den sender dem videre til ui-komponenten som lastes i OBS via sockets. Ipad-controlleren bruker også denne for å gjøre endringer på ui-komponenten. BFF-en er statefri og sender kun informasjon videre.
Applikasjonen avhenger på basket-backend for å hente informasjon til ui-komponenten ved forespørsel.

### ipad-controller

Språk: TS, react\
Port: 3001\
Ipad controlleren er en enkel frontend som brukes for å endre hvilke komponenter som renders i ui-komponenten. Her ønsker vi å bygge inn mer state for å kunne distribuere controllers.

### ui

Språk: TS: react\
Port: 3000\
Dette er komponenten som brukes for å lage overlays i OBS. Applikasjonen holder på state om alle grafikkelementene og disse må oppdateres via BFF-en for å endre hva som vises.
