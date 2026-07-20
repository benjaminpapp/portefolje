import { useRef } from "react"
import { motion } from "framer-motion"
import { Reveal, Stagger, itemVariants } from "./motion"
import { MagicCard, MagicSpotlight } from "./MagicCard"
import Photo from "./Photo"
import { projects } from "../data/content"

export default function Projects() {
  // Rutenettet brukes av spotlight'en til å finne kortene (.magic-card).
  const gridRef = useRef(null)
  return (
    <section className="sec" id="arbeid">
      <div className="wrap">
        <Reveal as="h2" className="shead">Prosjekter</Reveal>
        <div ref={gridRef}>
          <Stagger className="grid3">
            {projects.map((p) => (
              // ytre motion.div: inn-animasjon (transform). indre MagicCard:
              // gsap-drevet hover (tilt/magnetisme) — atskilte noder = ingen
              // transform-konflikt mellom Framer og gsap.
              <motion.div key={p.title} variants={itemVariants}>
                <MagicCard as="a" href={`#${p.id}`} className="card">
                  <Photo src={p.image} label="bilde" alt={p.title} />
                  <div className="cap">
                    <strong><span className="num">{p.num}</span> {p.title}</strong>
                    <span className="tag">{p.tag}</span>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </Stagger>
        </div>
        <MagicSpotlight gridRef={gridRef} />
      </div>
    </section>
  )
}
