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
    image: "",
    video: "9AF6lGd-Tv8",
    text:
      "Bacheloroppgaven min: en uavhengig tech-stack for presisjonslandbruk. " +
      "Vi bygde en pipeline som genererer digitale tvillinger nøyaktige helt ned " +
      "på bærnivå, med AI i kjernen.",
  },
  {
    id: "nettside",
    num: "02",
    title: "Nettside",
    tag: "Web",
    image: `${import.meta.env.BASE_URL}projects/nettside/after.png`,
    beforeAfter: {
      before: `${import.meta.env.BASE_URL}projects/nettside/before.png`,
      after: `${import.meta.env.BASE_URL}projects/nettside/after.png`,
    },
    text:
      "Revisorsenteret Mandal hadde en utdatert nettside. Jeg redesignet og " +
      "bygde den på nytt fra bunnen, med ny visuell identitet, tydeligere " +
      "struktur og bearbeidet innhold, til en moderne og tillitsvekkende side. " +
      "Under ser du før og etter.",
    link: { label: "Besøk revisorsenteretmandal.no →", href: "https://revisorsenteretmandal.no" },
  },
  {
    id: "revisjonsprogram",
    num: "03",
    title: "Revisjonsprogram",
    tag: "Desktop",
    image: "",
    text:
      "Sideprosjekt med bachelorgruppa ved siden av bacheloroppgaven. En " +
      "skrivebordsapplikasjon som henter data fra Skatteetatens API-er og " +
      "automatiserer revisjonsdokumentasjon. I daglig drift hos kunden og " +
      "erstatter manuelle prosesser.",
  },
  {
    id: "luna",
    num: "04",
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
]

export const about = {
  heading: "Hei, jeg er Benjamin!",
  image: `${import.meta.env.BASE_URL}meg.jpg`,
  text:
    "Jeg er nyutdannet med bachelor i IT og informasjonssystemer, og det jeg synes er morro er " +
    "å stå fast i et problem, grave meg gjennom det, og kjenne mestringsfølelsen " +
    "når brikkene endelig faller på plass. Veldig nysgjerrig, strukturert og glad i å " +
    "være kreativ, med sansen for å gjøre kompliserte ting enkle. Jeg er en stor AI entusiast " +
    "og ser verdien av å kunne bruke den type teknologi på riktig måte.",
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
    text: "Å finne struktur og innsikt i rotete data. Spørringer som svarer på noe ekte er det jeg liker best.",
  },
  {
    title: "UX & grensesnitt",
    text: "Rene, rolige grensesnitt bygget rundt hvordan folk faktisk jobber. Her vil jeg lære mest mulig.",
  },
]

export const experience = [
  {
    years: "2023 — 2026",
    title: "Bachelor i IT og informasjonssystemer",
    text: "Universitetet i Agder, fullført 2026. Bachelorprosjektet Farmchart var en pipeline for digitale tvillinger til presisjonslandbruk, nøyaktige helt ned på bærnivå.",
  },
  {
    years: "2026",
    title: "Webutvikler for Revisorsenteret Mandal",
    text: "Etter studieslutt designet og bygde jeg nettsiden revisorsenteretmandal.no for revisjonsselskapet.",
  },
  {
    years: "2026",
    title: "Utvikler hos Revisorsenteret Mandal",
    text: "Sideprosjekt med bachelorgruppa ved siden av bacheloroppgaven: en skrivebordsapplikasjon som henter data fra Skatteetatens API-er og automatiserer revisjonsdokumentasjon. I daglig drift hos kunden.",
  },
  {
    years: "2021 — 2023",
    title: "Operatør og objektleder hos Skan-Kontroll",
    text: "Overvåkning, hendelseshåndtering, risikovurdering og operativt ansvar ved vaktsentral.",
  },
  {
    years: "2017 — 2019",
    title: "Lyd- og musikkproduksjon, Noroff",
    text: "Fagskoleutdanning som ga meg det kreative grunnlaget jeg fortsatt bygger videre på.",
  },
]

export const contact = {
  heading: "La oss ta en prat →",
  links: [
    { label: "✉ hei@benjaminpapp.no", href: "mailto:hei@benjaminpapp.no" },
    { label: "in / LinkedIn", href: "https://www.linkedin.com/in/benjaminthorsenpapp" },
    { label: "⌥ GitHub", href: "https://github.com/" },
  ],
}

export const nav = [
  { label: "Arbeid", href: "#arbeid" },
  { label: "Om", href: "#om" },
  { label: "CV", href: "#cv" },
]
