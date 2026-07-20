import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { MagicCard } from "./MagicCard"
import { profile } from "../data/content"

export default function Hero() {
  // Lett parallax: innholdet beveger seg saktere enn scroll.
  // Slås helt av når brukeren ber om redusert bevegelse.
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, reduce ? 0 : 70])
  const opacity = useTransform(scrollY, [0, 320], [1, reduce ? 1 : 0])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] } },
  }

  return (
    <section className="sec hero center">
      <motion.div className="wrap" style={{ y, opacity }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1 className="display" variants={item}>{profile.name}</motion.h1>
          <motion.div className="role" variants={item}>{profile.role}</motion.div>
          <motion.p className="lead" variants={item}>{profile.lead}</motion.p>
          <motion.div className="btnrow" style={{ justifyContent: "center" }} variants={item}>
            <MagicCard as="a" href={profile.cvUrl} download className="btn" enableStars={false} enableTilt={false}>
              Last ned CV
            </MagicCard>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
