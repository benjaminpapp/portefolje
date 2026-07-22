import { useRef, useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"
import "./MagicCard.css"

// MagicBento-effektene (React Bits) gjort gjenbrukbare og tonet til
// deep-space/emerald-paletten. Brukes på eksisterende klikkbare kort
// (prosjekter o.l.) i stedet for demo-rutenettet.

const DEFAULT_GLOW = "54, 224, 160" // --accent emerald som RGB
const DEFAULT_PARTICLES = 10
const DEFAULT_SPOTLIGHT_RADIUS = 320
const MOBILE_BREAKPOINT = 768

const createParticle = (x, y, color) => {
  const el = document.createElement("div")
  el.className = "magic-particle"
  el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;
    background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},.6);
    pointer-events:none;z-index:100;left:${x}px;top:${y}px;`
  return el
}

// true når brukeren ber om redusert bevegelse eller skjermen er liten
const useDisableAnimations = () => {
  const [off, setOff] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width:${MOBILE_BREAKPOINT}px),(prefers-reduced-motion:reduce)`
    )
    const update = () => setOff(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return off
}

export function MagicCard({
  as: Tag = "div",
  className = "",
  children,
  glowColor = DEFAULT_GLOW,
  particleCount = DEFAULT_PARTICLES,
  enableStars = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  style,
  ...rest
}) {
  const ref = useRef(null)
  const liveParticles = useRef([])
  const timeouts = useRef([])
  const hovered = useRef(false)
  const memoParticles = useRef([])
  const seeded = useRef(false)
  const disabled = useDisableAnimations()

  const seedParticles = useCallback(() => {
    if (seeded.current || !ref.current) return
    const { width, height } = ref.current.getBoundingClientRect()
    memoParticles.current = Array.from({ length: particleCount }, () =>
      createParticle(Math.random() * width, Math.random() * height, glowColor)
    )
    seeded.current = true
  }, [particleCount, glowColor])

  const clearParticles = useCallback(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    liveParticles.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      })
    })
    liveParticles.current = []
  }, [])

  const spawnParticles = useCallback(() => {
    if (!ref.current || !hovered.current) return
    if (!seeded.current) seedParticles()
    memoParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!hovered.current || !ref.current) return
        const clone = particle.cloneNode(true)
        ref.current.appendChild(clone)
        liveParticles.current.push(clone)
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 90,
          y: (Math.random() - 0.5) * 90,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        })
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true })
      }, i * 100)
      timeouts.current.push(id)
    })
  }, [seedParticles])

  useEffect(() => {
    const el = ref.current
    if (disabled || !el) return

    // quickTo lager settere én gang og gjenbruker samme tween — ingen ny
    // tween-allokering per mousemove (unngår GC-churn på den varme stien).
    gsap.set(el, { transformPerspective: 1000 })
    const qRotX = gsap.quickTo(el, "rotateX", { duration: 0.2, ease: "power2.out" })
    const qRotY = gsap.quickTo(el, "rotateY", { duration: 0.2, ease: "power2.out" })
    const qX = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" })
    const qY = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" })

    const onEnter = () => {
      hovered.current = true
      if (enableStars) spawnParticles()
    }

    const onLeave = () => {
      hovered.current = false
      clearParticles()
      // Nullstill via de samme quickTo-setterne — ikke en konkurrerende gsap.to,
      // ellers kjemper to tweens om samme transform (rykkete kort-til-kort).
      if (enableTilt) { qRotX(0); qRotY(0) }
      if (enableMagnetism) { qX(0); qY(0) }
    }

    const onMove = (e) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      if (enableTilt) {
        qRotX(((y - cy) / cy) * -7)
        qRotY(((x - cx) / cx) * 7)
      }
      if (enableMagnetism) {
        qX((x - cx) * 0.04)
        qY((y - cy) * 0.04)
      }
      // border-glow følger markøren
      el.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`)
      el.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`)
      el.style.setProperty("--glow-intensity", "1")
    }

    const onGlowOut = () => el.style.setProperty("--glow-intensity", "0")

    const onClick = (e) => {
      if (!clickEffect) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxD = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )
      const ripple = document.createElement("div")
      ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;
        border-radius:50%;left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;
        background:radial-gradient(circle,rgba(${glowColor},.4) 0%,rgba(${glowColor},.2) 30%,transparent 70%);`
      el.appendChild(ripple)
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() }
      )
    }

    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onGlowOut)
    el.addEventListener("click", onClick)
    return () => {
      hovered.current = false
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onGlowOut)
      el.removeEventListener("click", onClick)
      clearParticles()
    }
  }, [disabled, enableStars, enableTilt, enableMagnetism, clickEffect, glowColor, spawnParticles, clearParticles])

  return (
    <Tag
      ref={ref}
      className={`magic-card ${className}`.trim()}
      style={{ "--magic-glow": glowColor, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Global spotlight som lyser opp kortene i et rutenett når markøren er i nærheten.
export function MagicSpotlight({ gridRef, glowColor = DEFAULT_GLOW, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) {
  const spotRef = useRef(null)
  const disabled = useDisableAnimations()

  useEffect(() => {
    const grid = gridRef?.current
    if (disabled || !grid) return

    const spot = document.createElement("div")
    spot.className = "magic-spotlight"
    spot.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
      background:radial-gradient(circle,
        rgba(${glowColor},.12) 0%,rgba(${glowColor},.06) 18%,rgba(${glowColor},.03) 32%,
        rgba(${glowColor},.015) 50%,transparent 70%);`
    document.body.appendChild(spot)
    spotRef.current = spot

    // Kortene hentes én gang (rutenettet er stabilt), ikke per mousemove.
    const cards = grid.querySelectorAll(".magic-card")
    // Gjenbrukbare settere — ingen ny tween per bevegelse.
    const setLeft = gsap.quickTo(spot, "left", { duration: 0.1, ease: "power2.out" })
    const setTop = gsap.quickTo(spot, "top", { duration: 0.1, ease: "power2.out" })
    const setSpotOpacity = gsap.quickTo(spot, "opacity", { duration: 0.3, ease: "power2.out" })

    const proximity = spotlightRadius * 0.5
    const fade = spotlightRadius * 0.75

    const onMove = (e) => {
      if (!spotRef.current) return
      const rect = grid.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      if (!inside) {
        setSpotOpacity(0)
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"))
        return
      }
      let minDist = Infinity
      cards.forEach((c) => {
        const r = c.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2)
        minDist = Math.min(minDist, dist)
        let glow = 0
        if (dist <= proximity) glow = 1
        else if (dist <= fade) glow = (fade - dist) / (fade - proximity)
        c.style.setProperty("--glow-x", `${((e.clientX - r.left) / r.width) * 100}%`)
        c.style.setProperty("--glow-y", `${((e.clientY - r.top) / r.height) * 100}%`)
        c.style.setProperty("--glow-intensity", `${glow}`)
        c.style.setProperty("--glow-radius", `${spotlightRadius}px`)
      })
      setLeft(e.clientX)
      setTop(e.clientY)
      const opacity =
        minDist <= proximity ? 0.8 : minDist <= fade ? ((fade - minDist) / (fade - proximity)) * 0.8 : 0
      setSpotOpacity(opacity)
    }

    const onLeave = () => {
      cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"))
      if (spotRef.current) setSpotOpacity(0)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      spotRef.current?.parentNode?.removeChild(spotRef.current)
    }
  }, [gridRef, disabled, glowColor, spotlightRadius])

  return null
}

export default MagicCard
