# Bilder til fotogalleriet

Slipp bildene rett inn i denne mappa. `PhotoGallery.jsx` plukker dem opp med
`import.meta.glob`, så det trengs ingen kodeendring per bilde.

- **Format:** `.jpg`, `.jpeg`, `.png`, `.webp` eller `.avif`
- **Rekkefølge:** alfabetisk på filnavn. Prefiks med tall (`01-`, `02-`) for å styre
  den. Det første bildet brukes som helbilde i scroll-seksjonen over kula.
- **Alt-tekst:** hentes fra filnavnet — `fjell-i-take.jpg` blir «fjell i take».
  Bruk beskrivende filnavn, bindestrek mellom ord.

Så lenge mappa er tom vises plassholderne fra `../foto-placeholder/` i stedet.
De forsvinner av seg selv idet det ligger ett ekte bilde her.

## Skaler før du committer

Fullstore bilder rett fra kamera er 5–15 MB. Kula viser dem som små fliser og
lightboxen trenger ikke mer enn ~1600 px. Kjør:

```
npm run foto
```

Skriptet (`scripts/prep-foto.mjs`) skalerer alt i denne mappa ned til maks
1600 px på lengste kant og lagrer som `.webp` med kvalitet 82. Det skriver over
originalen i mappa, så ta vare på råfilene et annet sted — `Bilder til
portefølje/` er allerede utenfor git.
