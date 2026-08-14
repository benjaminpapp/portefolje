import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider"

// Før/etter i én ramme: dra skillelinjen for å avdekke den gamle siden.
// Begge bildene er normalisert til 2200x1100 (2:1) og beskåret likt, så
// wipen treffer samme utsnitt på hver side av håndtaket.
//
// Etter-bildet ligger til venstre (itemOne) og før-bildet til høyre: det er
// den nye siden som møter deg, og den gamle man drar fram som referanse.
export default function BeforeAfter({ label, before, after, alt }) {
  return (
    <figure className="ba-slider">
      {label && <h3 className="comparison-label">{label}</h3>}
      <ReactCompareSlider
        className="ba-slider-frame"
        // Litt til høyre for midten, så den nye siden får mest plass.
        defaultPosition={55}
        keyboardIncrement="4%"
        itemOne={
          <ReactCompareSliderImage src={after} alt={`${alt} – etter`} loading="lazy" decoding="async" />
        }
        itemTwo={
          <ReactCompareSliderImage src={before} alt={`${alt} – før`} loading="lazy" decoding="async" />
        }
        // Ingen `handle`-prop: vi bruker bibliotekets eget håndtak som det er
        // (hvit ring og piler med blur bak). Skal fargen endres senere, merk at
        // håndtaket setter --rcs-handle-color inline på sin egen rot — den kan
        // ikke overstyres fra .ba-slider-frame i CSS-en, bare via `style` her.
      />
      <figcaption className="ba-slider-tags">
        <span className="ba-tag ba-tag-after">Etter</span>
        <span className="ba-tag">Før</span>
      </figcaption>
    </figure>
  )
}
