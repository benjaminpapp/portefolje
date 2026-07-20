# Portefølje — Benjamin Thorsen Papp

Vite + React-portefølje. Direction 01 «Redaksjonell»: rolig, sentrert kolonne,
mørk palett med viridiangrønn aksent, og tydelige scroll-animasjoner
(Framer Motion).

## Kjøre lokalt

```bash
npm install
npm run dev      # starter dev-server på http://localhost:5173
npm run build    # bygger til dist/
npm run preview  # forhåndsvis produksjonsbygget
```

## Redigere innhold

Alt innhold (tekst, lenker, bilder) ligger samlet i
[`src/data/content.js`](src/data/content.js). Du trenger ikke røre komponentene
for å oppdatere porteføljen.

- **Bilder:** legg filene i `public/` (f.eks. `public/bilder/case.jpg`) og sett
  `image: "/bilder/case.jpg"` på riktig prosjekt. Tom `image: ""` beholder
  wireframe-plassholderen.
- **Legge til prosjekt:** legg et nytt objekt i `projects`-lista.
- **CV-knapp:** sett `profile.cvUrl` til en ekte PDF, f.eks. `/cv.pdf`.

## Struktur

```
src/
  data/content.js      ← alt innhold redigeres her
  components/          ← én fil per modul (Hero, Featured, Projects, …)
    motion.jsx        ← gjenbrukbare animasjons-byggesteg
    Photo.jsx         ← bilde / wireframe-plassholder
  App.jsx, main.jsx
  index.css           ← design-tokens + stiler
```

`index.static.html` er den opprinnelige statiske enkeltfil-versjonen, beholdt
som referanse.
