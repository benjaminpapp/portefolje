import { useState } from "react"
import { MagicCard } from "./MagicCard"
import { profile, nav } from "../data/content"

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <MagicCard as="a" href="#top" className="brand" enableStars={false} enableTilt={false} enableMagnetism={false}>
        {profile.brand}
      </MagicCard>
      <button
        className="menu-btn"
        aria-label={open ? "Lukk meny" : "Åpne meny"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "✕" : "☰"}
      </button>
      <nav
        id="nav-links"
        aria-label="Hovedmeny"
        className={`links${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      >
        {nav.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <MagicCard as="a" href="#kontakt" className="cta" enableStars={false} enableTilt={false} enableMagnetism={false}>
          Kontakt
        </MagicCard>
      </nav>
    </header>
  )
}
