import { lazy, Suspense, useEffect, useState } from "react"
import { Reveal } from "./motion"
import Lightbox from "./Lightbox"
import { gallery } from "../data/content"
import "./PhotoGallery.css"

// Kula legger 140 <img> i DOM-en på en gang og laster alle bildene med det
// samme — flere MB. Samme grep som SplatViewerLazy: hold koden ute av
// hovedbundelen og monter først når seksjonen nærmer seg viewporten.
const DomeGallery = lazy(() => import("./DomeGallery"))

// Bildene plukkes opp automatisk fra src/assets/foto/. Slipp filer inn i den
// mappa, så havner de i galleriet — ingen kodeendring per bilde. Vite hasher og
// kopierer dem inn i bygget, så de blir cachet skikkelig.
const photoModules = import.meta.glob("../assets/foto/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
})
// Fallback så seksjonen kan vurderes før ekte bilder er på plass. Åpenbart
// merket som plassholdere — de forsvinner av seg selv idet foto/ får innhold.
const placeholderModules = import.meta.glob("../assets/foto-placeholder/*.jpg", {
  eager: true,
  import: "default",
})

const toList = (mods) =>
  Object.entries(mods)
    .sort(([a], [b]) => a.localeCompare(b, "nb"))
    .map(([path, src]) => ({
      src,
      // Filnavnet blir alt-tekst: "fjell-i-tåke.jpg" → "fjell i tåke".
      alt: path.split("/").pop().replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
    }))

const realPhotos = toList(photoModules)
const photos = realPhotos.length > 0 ? realPhotos : toList(placeholderModules)
const usingPlaceholders = realPhotos.length === 0

// Kula er tung (140+ fliser i 3D) og spiser touch-dragging, som blir en felle
// nederst på siden på mobil. Under dette bruker vi et vanlig rutenett i stedet.
const DOME_MIN_WIDTH = 768

function useDome() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(
      `(min-width:${DOME_MIN_WIDTH}px) and (hover:hover) and (pointer:fine)`
    )
    const on = () => setOk(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return ok
}

// Armerer når elementet er innenfor 400px av viewporten, som SplatViewerLazy.
// Callback-ref, ikke useRef: verten monteres først når `dome` slår om, og en
// effekt med ref.current ville kjørt før elementet fantes — og aldri igjen.
function useNearViewport() {
  const [host, setHost] = useState(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    if (!host || near) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        io.disconnect()
      },
      { rootMargin: "400px" }
    )
    io.observe(host)
    return () => io.disconnect()
  }, [host, near])
  return [setHost, near]
}

export default function PhotoGallery() {
  const dome = useDome()
  const [domeRef, domeNear] = useNearViewport()
  const [zoom, setZoom] = useState(null)

  if (photos.length === 0) return null

  return (
    <section className="sec photo-gallery" id="foto">
      <div className="wrap">
        <Reveal as="h2" className="shead">{gallery.heading}</Reveal>
        {usingPlaceholders && (
          <p className="photo-gallery-note" role="status">
            Viser plassholdere. Legg bilder i <code>src/assets/foto/</code> — de
            erstatter disse automatisk.
          </p>
        )}
      </div>

      {dome ? (
        <div className="photo-gallery-dome" ref={domeRef}>
          {domeNear && (
            <Suspense fallback={null}>
              <DomeGallery
                images={photos}
                fit={1}
                minRadius={1000}
                dragDampening={0.6}
                grayscale={false}
                /* Belte i stedet for klode: 2 rader i stedet for 5, og nesten
                   ingen vertikal vipping — da leses det som en vannrett ring
                   man snurrer, ikke en kule. */
                rows={2}
                maxVerticalRotationDeg={2}
                autoRotate
                /* grader per sekund — én runde på ~4 min */
                autoRotateSpeed={1.5}
                /* Klikk går til sidas egen Lightbox: fullskjerm og
                   object-fit:contain, altså stort og ubeskåret. */
                onImageClick={setZoom}
                /* px uskarphet helt ute på siden, av i midten */
                edgeBlur={14}
                /* Gjennomsiktig, ikke --paper. Fargen mater tre lag i
                   komponenten: vignetten, masken på blur-ringen og edge-fade
                   topp/bunn. Med en ugjennomsiktig farge maler alle tre en
                   flat flate over .starscape og .page-rays som ligger bak
                   seksjonen. Alfa 0 slår dem av, og uttoningen gjøres i
                   stedet av masken på .stage. */
                overlayBlurColor="rgba(0,0,0,0)"
              />
            </Suspense>
          )}
          <p className="photo-gallery-hint">Dra for å snurre · klikk for å forstørre</p>
        </div>
      ) : (
        <div className="wrap">
          <ul className="photo-gallery-grid">
            {photos.map((p) => (
              <li key={p.src}>
                <button type="button" onClick={() => setZoom(p)}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bevisst inne i <section>. .sec har position:relative + z-index:1 og
          lager en stablekontekst, så lightboxens z-index:100 gjelder bare inne
          i seksjonen — Kontakt-seksjonen under maler derfor over bildet. Det
          er ønsket her. Flytt den ut (som i ProjectDetails) hvis bildet en dag
          skal ligge helt øverst. */}
      <Lightbox src={zoom?.src} alt={zoom?.alt} onClose={() => setZoom(null)} />
    </section>
  )
}
