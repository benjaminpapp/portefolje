import { motion } from "framer-motion"
import { Reveal, Stagger, itemVariants } from "./motion"
import Photo from "./Photo"
import { about, services } from "../data/content"

export default function About() {
  return (
    <section className="sec" id="om">
      <div className="wrap">
        <div className="om-grid">
          <div className="about-col">
            <Reveal>
              <Photo src={about.image} soft label="portrett" alt="Portrett av Benjamin Thorsen Papp" className="about-photo" />
            </Reveal>
          </div>

          <div className="services-col" id="tjenester">
            <Reveal as="h2" className="shead">Hva jeg synes er interessant</Reveal>
            <Stagger className="services-list">
              {services.map((s) => (
                <motion.div key={s.title} className="service" variants={itemVariants}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>

          <Reveal className="about-bio" delay={0.12}>
            <h2 className="shead">{about.heading}</h2>
            <p>{about.text}</p>
            <p>{about.text2}</p>
            <div className="taglist" style={{ marginTop: 18 }}>
              {about.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
