import { motion } from "framer-motion"
import { Reveal } from "./motion"
import { experience, education } from "../data/content"

function Track({ items }) {
  return (
    <motion.div
      className="tl"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
    >
      {items.map((e) => (
        <motion.div
          key={e.years + e.title}
          className="row"
          variants={{
            hidden: { opacity: 0, x: -18 },
            show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.21, 0.6, 0.35, 1] } },
          }}
        >
          <motion.span
            className="dot"
            variants={{
              hidden: { scale: 0 },
              show: { scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } },
            }}
          />
          <div className="yr">{e.years}</div>
          <h3 className="ti">{e.title}</h3>
          <p>{e.text}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section className="sec" id="cv">
      <div className="wrap">
        <div className="tl-cols">
          <div>
            <Reveal as="h2" className="label">Erfaring</Reveal>
            <Track items={experience} />
          </div>
          <div>
            <Reveal as="h2" className="label">Utdanning</Reveal>
            <Track items={education} />
          </div>
        </div>
      </div>
    </section>
  )
}
