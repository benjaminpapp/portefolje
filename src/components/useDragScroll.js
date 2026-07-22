import { useRef, useEffect } from "react"

// Klikk-og-dra for å scrolle en horisontal overflow-container med mus.
// Touch/pen beholder native scroll. Undertrykker klikket hvis brukeren
// faktisk dro, så et dra ikke åpner lightboxen.
export default function useDragScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let down = false
    let moved = false
    let startX = 0
    let startLeft = 0

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return // bare primær museknapp
      down = true
      moved = false
      startX = e.clientX
      startLeft = el.scrollLeft
    }

    const onMove = (e) => {
      if (!down) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) > 5) {
        moved = true
        el.classList.add("dragging")
      }
      if (moved) el.scrollLeft = startLeft - dx
    }

    const onUp = () => {
      if (!down) return
      down = false
      if (moved) el.classList.remove("dragging")
      // La klikk-fangeren under se `moved`; nullstill på neste frame.
      requestAnimationFrame(() => { moved = false })
    }

    // Fang klikk i capture-fasen: hvis vi nettopp dro, stopp det før det når bildet.
    const onClickCapture = (e) => {
      if (moved) { e.stopPropagation(); e.preventDefault() }
    }

    el.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    el.addEventListener("click", onClickCapture, true)

    return () => {
      el.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      el.removeEventListener("click", onClickCapture, true)
    }
  }, [])

  return ref
}
