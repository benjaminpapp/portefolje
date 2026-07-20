import { motion } from "framer-motion"
import { Reveal, Stagger, itemVariants } from "./motion"
import { contact, profile } from "../data/content"

export default function Contact() {
  return (
    <section className="sec center" id="kontakt">
      <div className="wrap">
        <Reveal as="h2" className="bigcontact">{contact.heading}</Reveal>
        <Stagger className="btnrow" style={{ justifyContent: "center", marginTop: 26 }}>
          {contact.links.map((l) => (
            <motion.a key={l.label} href={l.href} className="pill" variants={itemVariants}>
              {l.label}
            </motion.a>
          ))}
        </Stagger>
      </div>
      <footer className="wrap">
        <div className="foot">
          <span>© 2026 {profile.name}</span>
          <span>Bygget med React</span>
        </div>
      </footer>
    </section>
  )
}
