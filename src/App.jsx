import { useEffect, useRef } from "react"
import { MotionConfig, useReducedMotion } from "framer-motion"
import SideRays from "./components/SideRays"
import DotField from "./components/DotField"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import ProjectDetails from "./components/ProjectDetails"
import About from "./components/About"
import Timeline from "./components/Timeline"
import Contact from "./components/Contact"

export default function App() {
  const reduce = useReducedMotion()
  const dotBgRef = useRef(null)

  // Prikkene fader ut med scroll og er helt borte etter "om"-seksjonen;
  // bare cursor-gløden (egen SVG) blir igjen. Setter --dots-opacity på laget.
  useEffect(() => {
    if (reduce) return
    const el = dotBgRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const about = document.getElementById("om")
      const fadeEnd = about ? about.offsetTop + about.offsetHeight : window.innerHeight * 2
      const p = Math.min(Math.max(window.scrollY / fadeEnd, 0), 1)
      el.style.setProperty("--dots-opacity", String(1 - p))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    // reducedMotion="user" lar Framer Motion respektere prefers-reduced-motion
    // også for JS-drevne animasjoner (transform/parallax), ikke bare CSS.
    <MotionConfig reducedMotion="user">
      <div className="starscape" aria-hidden="true" />
      {/* Interaktivt prikk-felt: fast bakgrunnslag bak strålene, av ved redusert bevegelse. */}
      {!reduce && (
        <div className="dot-bg" aria-hidden="true" ref={dotBgRef}>
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(54,224,160,0.20)"
            gradientTo="rgba(108,242,192,0.08)"
            glowColor="rgba(54,224,160,0.10)"
          />
        </div>
      )}
      <a href="#main" className="skip">Hopp til innhold</a>
      <Nav />
      <span id="top" />
      <main id="main">
        {/* Lysstråler fra øvre høyre hjørne — bakgrunnslag som strekker seg
            forbi hero og inn bak arbeid-seksjonen. Av ved redusert bevegelse. */}
        {!reduce && (
          <div className="page-rays" aria-hidden="true">
            <SideRays
              speed={0.6}
              rayColor1="#36e0a0"
              rayColor2="#5fd8ff"
              intensity={1.9}
              spread={2.0}
              origin="top-right"
              saturation={1.2}
              blend={0.5}
              falloff={1.3}
              opacity={0.85}
            />
          </div>
        )}
        <Hero />
        <About />
        <Projects />
        <ProjectDetails />
        <Timeline />
        <Contact />
      </main>
    </MotionConfig>
  )
}
