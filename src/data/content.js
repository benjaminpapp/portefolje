// =====================================================================
// ALT INNHOLD REDIGERES HER
// Bytt tekst, lenker og bilder ett sted. Legg ekte bildefiler i
// public/ (f.eks. public/bilder/case.jpg) og referer dem som
// "/bilder/case.jpg", eller bruk en full https-URL. La `image` stå
// tom ("") for å beholde wireframe-plassholderen.
// =====================================================================

export const profile = {
  brand: "BTP",
  name: "Benjamin Thorsen Papp",
  role: "Bachelor i IT & Informasjonssystemer",
  eyebrow: "Portefølje 2026",
  lead:
    "Fersk fra bachelor i IT og informasjonssystemer. Jeg er nysgjerrig på alt fra " +
    "systemutvikling og dataanalyse til grensesnitt som er enkle å bruke, og " +
    "ivrig etter å lære mer for hvert prosjekt.",
  cvUrl: `${import.meta.env.BASE_URL}cv.pdf`,
}

export const projects = [
  {
    id: "farmchart",
    num: "01",
    title: "Farmchart",
    tag: "Digital Twin",
    image: `${import.meta.env.BASE_URL}projects/farmchart/twin.png`,
    video: "9AF6lGd-Tv8",
    text:
      "Bacheloroppgaven min: En  pipeline tech-stack for presisjonslandbruk. " +
      "Vi lagde en pipeline som kan generere en digital twin som er nøyaktige helt ned " +
      "på bærnivå",
  },
  {
    id: "3dgs",
    num: "02",
    title: "Gaussian splatting",
    tag: "3D",
    // Stillbilde av scenen: brukes som kortminiatyr og som uskarp plassholder
    // mens splat-filen lastes.
    image: `${import.meta.env.BASE_URL}projects/3dgs/poster.png`,
    // .spz, ikke .ply: 65 MB → 7,4 MB. Rå .ply ligger utenfor git (se .gitignore).
    splat: `${import.meta.env.BASE_URL}projects/3dgs/Potteplante.spz`,
    text:
      "Plante som har blitt rekonstruert som en 3DGS ved bruk av fotogrammetri og structure from motion.",
  },
  {
    id: "nettside",
    num: "03",
    title: "Nettside",
    tag: "Web",
    image: `${import.meta.env.BASE_URL}projects/nettside/forside-after.png`,
    // Alle fire er normalisert til 2200x1100 (2:1), og nettleserkrommet
    // (fanerad, adressefelt, rullefelt) er beskåret bort fra etter-bildene.
    // Slideren wiper mellom dem, så utsnittene må matche.
    comparisons: [
      {
        label: "Forside",
        before: `${import.meta.env.BASE_URL}projects/nettside/forside-before.png`,
        after: `${import.meta.env.BASE_URL}projects/nettside/forside-after.png`,
      },
      {
        label: "Om oss",
        before: `${import.meta.env.BASE_URL}projects/nettside/omoss-before.png`,
        after: `${import.meta.env.BASE_URL}projects/nettside/omoss-after.png`,
      },
    ],
    text:
      "Revisorsenteret Mandal hadde en utdatert nettside. Jeg redesignet og " +
      "bygde den på nytt fra bunnen, med ny visuell identitet, tydeligere " +
      "struktur og bearbeidet innhold, til en mer moderne og tillitsvekkende side. " +
      "Under ser du før og etter.",
    link: { label: "Besøk revisorsenteretmandal.no →", href: "https://revisorsenteretmandal.no" },
  },
  {
    id: "revisjonsprogram",
    num: "04",
    title: "Revisjonsprogram",
    tag: "Desktop",
    image: `${import.meta.env.BASE_URL}projects/revisjonsprogram/oppsett.png`,
    images: [
      `${import.meta.env.BASE_URL}projects/revisjonsprogram/oppsett.png`,
      `${import.meta.env.BASE_URL}projects/revisjonsprogram/lookup.png`,
      `${import.meta.env.BASE_URL}projects/revisjonsprogram/autoexcel.png`,
    ],
    text: [
      "Sideprosjekt med bachelorgruppa ved siden av bacheloroppgaven. RS-Innsyn " +
        "er en skrivebordsapplikasjon som slår opp krav og betalinger mot " +
        "Skatteetatens API-er: enkeltoppslag på organisasjonsnummer, eller " +
        "batchkjøring av en hel Excel-fil.",
      "Kobler seg til via Maskinporten og automatiserer revisjonsdokumentasjon. " +
        "I daglig drift hos kunden og erstatter manuelle prosesser.",
    ],
  },
  {
    id: "luna",
    num: "05",
    title: "Luna App",
    tag: "App",
    image: `${import.meta.env.BASE_URL}projects/luna/home.jpg`,
    images: [
      `${import.meta.env.BASE_URL}projects/luna/home.jpg`,
      `${import.meta.env.BASE_URL}projects/luna/cycle.jpg`,
      `${import.meta.env.BASE_URL}projects/luna/foryou.jpg`,
      `${import.meta.env.BASE_URL}projects/luna/fasting.jpg`,
      `${import.meta.env.BASE_URL}projects/luna/diary.jpg`,
    ],
    text:
      "En mobilapp for syklussporing, bygget rundt fasepersonlig innsikt. Luna " +
      "kombinerer syklus- og p-pillepåminnelser med en fasteklokke som " +
      "tilpasser seg hvor i syklusen du er, pluss en dagbok som lærer " +
      "mønstrene dine over tid og finjusterer anbefalingene.",
  },
  {
    id: "skisser",
    num: "06",
    title: "Fra skisse til prototype",
    tag: "UX/UI",
    image: `${import.meta.env.BASE_URL}projects/campuscoach/03-hjem-mentee.webp`,
    // Skissene følger flyten gjennom appen, ikke rekkefølgen de ble tegnet i.
    images: [
      "01-login",
      "02-registrering",
      "03-hjem-mentee",
      "04-hjem-mentor",
      "05-sok-mentor",
      "06-sok-mentee",
      "07-mentorliste",
      "08-match",
      "09-match-mentor",
      "10-chat",
      "11-kalender",
      "12-fremdrift",
      "13-profil-mentor",
      "14-profil-mentee",
      "15-innstillinger",
    ].map((n) => `${import.meta.env.BASE_URL}projects/campuscoach/${n}.webp`),
    text: [
      "Skissing er første steg i måten jeg jobber på med UX og grensesnitt. " +
        "Hver skjerm tegnes ut for hånd, med piler og notater på hva som skjer " +
        "hvor og hvor brukeren havner videre. En skisse er billig: den kan " +
        "kastes og tegnes på nytt uten at noe går tapt.",
      "Skissene her ble tegnet i forkant av en klikkbar prototype i Figma.",
    ],
  },
]

export const about = {
  heading: "Hei, jeg er Benjamin!",
  image: `${import.meta.env.BASE_URL}meg.jpg`,
  text:
    "Nyutdannet med en bachelor i IT og informasjonssystemer, og det jeg synes er spennende er " +
    "å få et problem, jobbe meg gjennom det, og kjenne mestringsfølelsen " +
    "når brikkene endelig faller på plass. Veldig nysgjerrig, strukturert og glad i å " +
    "være kreativ, med sansen for å gjøre kompliserte ting enkle. Jeg er en stor AI entusiast " +
    "og ser verdien av å kunne bruke AI teknologi på riktig måte.",
  text2:
    "Jeg har erfaring med å jobbe i team gjennom både studier og prosjekter, hvor " +
    "samarbeid, kommunikasjon og felles måloppnåelse har vært sentralt. Jeg har " +
    "også arbeidet etter agile arbeidsmetoder, med fokus på fleksibilitet, " +
    "kontinuerlig forbedring og effektiv koordinering mellom teammedlemmer.",
  skills: ["Kreativ", "Nysgjerrig", "Gir ikke opp"],
}

export const services = [
  {
    title: "Systemutvikling",
    text: "Å bygge ting fra bunnen, fra datamodell til ferdig grensesnitt. Fersk fra studiet og klar til å bryne meg på ekte prosjekter.",
  },
  {
    title: "Data & analyse",
    text: "Å finne struktur og innsikt i rotete data.",
  },
  {
    title: "UX & grensesnitt",
    text: "Rene, enkle grensesnitt bygget rundt hvordan folk faktisk jobber. Her vil jeg lære mest mulig.",
  },
  {
    title: "Gaussian splatting",
    text: "Foto-realistiske 3D objekter.",
  },
]

// Speiler Yrkeserfaring-delen i CV-en. De to Revisorsenteret-oppdragene
// ligger under `cvProjects`, slik CV-en selv plasserer dem.
export const experience = [
  {
    years: "2024 — 2026",
    title: "Resepsjonist og nattevakt, SKAP Hostell Mandal",
    text: "Sommerjobb tre sesonger. Resepsjonsdrift med inn- og utsjekk, booking og kundekontakt, nattevakt med selvstendig ansvar for bygget, og administrative oppgaver som forbedring av interne rutiner.",
  },
  {
    years: "2022 — 2023",
    title: "Operativ leder ved vaktsentral, Skan-Kontroll",
    text: "Nattlig drift og operativ ledelse: overvåkning og respons på innbrudds- og brannalarmer, koordinering med nødetater, og selvstendig beslutnings- og bemanningsansvar utenfor kontortid.",
  },
  {
    years: "2021 — 2022",
    title: "Objektleder, Skan-Kontroll",
    text: "Risikovurdering og sikkerhetsarbeid ved kundeobjekter, med operativt ansvar for gjennomføring og oppfølging av sikkerhetstiltak.",
  },
  {
    years: "2016 — 2021",
    title: "Butikkmedarbeider, Grensen Skotøymagasin",
    text: "Kundeservice, salg og daglig drift i butikk, parallelt med studier og andre arbeidsforhold.",
  },
  {
    years: "2013 — 2016",
    title: "Servitør og bartender, SMOI Restaurant",
    text: "Høyt tempo og mye kundekontakt. Bidro til daglig drift, kundeopplevelse og opplæring av nye ansatte.",
  },
  {
    years: "2012 — 2014",
    title: "Støttekontakt, Mandal kommune",
    text: "Tilrettelagt fritids- og aktivitetstilbud for brukere med særskilte behov, tildelt av kommunens tjenestekontor, med sosialisering og inkludering som hovedfokus.",
  },
]

export const education = [
  {
    years: "2023 — 2026",
    title: "Bachelor i IT og informasjonssystemer",
    text: "Universitetet i Agder, treårig heltidsstudium. Fullført juni 2026.",
  },
  {
    years: "2025",
    title: "Utveksling, Chung-Ang University",
    text: "Vårsemesteret 2025 ved School of Computer Science and Engineering i Seoul, Sør-Korea.",
  },
  {
    years: "2017 — 2019",
    title: "Lyd- og musikkproduksjon, Noroff",
    text: "Toårig fagskoleutdanning som ga meg det kreative grunnlaget jeg fortsatt bygger videre på.",
  },
  {
    years: "2013 — 2014",
    title: "Årsenhet i grunnmedisin, Norges Helsehøyskole",
    text: "Ettårig studium med anatomi og fysiologi, sykdomslære, samt samfunn, individ og helse.",
  },
  {
    years: "2010 — 2013",
    title: "Medier og kommunikasjon, Mandal vgs",
    text: "Med påbygg til generell studiekompetanse.",
  },
]

// Tredje tidslinje i CV-seksjonen, ved siden av Erfaring og Utdanning.
// Speiler Prosjekter-delen i CV-en. `stack` er valgfri og vises som en
// liten mono-linje under tittelen.
export const cvProjects = [
  {
    years: "Jun 2026",
    title: "Revisorsenteret Mandal — Webutvikler",
    stack: "Astro · Tailwind · Docker · GitHub webhooks",
    text: "Ny nettside for et etablert revisjonsfirma, med vekt på ytelse, tilgjengelighet og lesbarhet. Docker-leveranse med automatisert deploy via webhook, og GDPR-kompatibel skjemahåndtering utarbeidet sammen med daglig leder.",
  },
  {
    years: "Jan — Jun 2026",
    title: "Farmchart — bacheloroppgave",
    stack: "Python · 3DGS · LiDAR/SLAM · fotogrammetri · SAM3",
    text: "Proof-of-concept digital tvilling av frukt- og bærøker, i samarbeid med Digin. Instanssegmenterte 3D-rekonstruksjoner i et delt koordinatsystem, med mulighet for semantiske data til presisjonsovervåking.",
  },
  {
    years: "Jan — Apr 2026",
    title: "Revisorsenteret Mandal — Utvikler",
    stack: "TypeScript · React · Electron · Node.js",
    text: "Sideprosjekt med bachelorgruppa. Skrivebordsapplikasjon som spør Skatteetatens API via Maskinporten (OAuth2/JWT) og effektiviserer den daglige driften. I aktivt bruk hos virksomheten.",
  },
  {
    years: "Sep — Nov 2025",
    title: "Pairfect",
    stack: "PHP · MySQL · Gemini API",
    text: "KI-drevet chatbot som anbefaler vin ut fra matrett, bygget på Google Gemini API. Gruppeprosjekt i universitetsemnet for PHP.",
  },
  {
    years: "Aug — Des 2024",
    title: "Kartverket",
    stack: "C# · ASP.NET Core MVC · MariaDB · Docker · EF",
    text: "Webapplikasjon for innmelding av kartfeil, med interaktiv kartløsning og geolokasjon, filtrerbar saksoversikt og rollebasert tilgangskontroll. Gruppeprosjekt.",
  },
]

export const contact = {
  heading: "La oss ta en prat →",
  links: [
    { label: "✉ benjamin.thorsen.papp@gmail.com", href: "mailto:benjamin.thorsen.papp@gmail.com" },
    { label: "in / LinkedIn", href: "https://www.linkedin.com/in/benjaminthorsenpapp" },
    { label: "⌥ GitHub", href: "https://github.com/" },
  ],
}

export const nav = [
  { label: "Arbeid", href: "#arbeid" },
  { label: "Om", href: "#om" },
  { label: "CV", href: "#cv" },
]
