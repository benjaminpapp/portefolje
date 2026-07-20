// Gjenbrukbare animasjons-byggesteg (Framer Motion).
import { motion } from "framer-motion"

// En seksjon som glir opp og toner inn når den scrolles inn i visning.
export function Reveal({ children, delay = 0, y = 28, as = "div", ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Container som lar barna komme inn etter hverandre (stagger).
export function Stagger({ children, gap = 0.09, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  )
}

// Et enkelt barn i en Stagger-container.
export const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.6, 0.35, 1] },
  },
}
