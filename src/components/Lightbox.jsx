import { useEffect } from "react"

// Fullskjerm-visning av et bilde. Lukkes med klikk, Escape eller lukkeknapp.
export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    if (!src) return
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [src, onClose])

  if (!src) return null

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt || "Bilde"}>
      <button className="lightbox-close" onClick={onClose} aria-label="Lukk">×</button>
      <img src={src} alt={alt || ""} onClick={(e) => e.stopPropagation()} />
    </div>
  )
}
