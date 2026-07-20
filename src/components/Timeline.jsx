import { motion } from "framer-motion"
import { Reveal } from "./motion"
import { experience } from "../data/content"

export default function Timeline() {
  return (
    <section className="sec" id="cv">
      <div className="wrap">
        <Reveal as="h2" className="label">Erfaring</Reveal>
        <motion.div
          className="tl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {experience.map((e) => (
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
      </div>
    </section>
  )
}
