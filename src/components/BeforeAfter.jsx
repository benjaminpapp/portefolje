import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from "react-compare-slider"

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
        // Håndtaket setter --rcs-handle-color inline på sin egen rot, så
        // variabelen må overstyres her — ikke fra .ba-slider-frame i CSS-en.
        // Hvit forsvant mot det lyse før-bildet; aksentgrønn holder mot begge.
        handle={<ReactCompareSliderHandle style={{ "--rcs-handle-color": "var(--accent)" }} />}
      />
      <figcaption className="ba-slider-tags">
        <span className="ba-tag ba-tag-after">Etter</span>
        <span className="ba-tag">Før</span>
      </figcaption>
    </figure>
  )
}
