// Bildefelt: viser et ekte bilde hvis `src` er satt, ellers en
// wireframe-plassholder med etikett.
export default function Photo({ src, alt, label, soft, className = "", style, onClick }) {
  const zoom = src && onClick
  const cls = `photo${soft ? " soft" : ""}${src ? " has-img" : ""}${zoom ? " zoomable" : ""} ${className}`.trim()
  return (
    <div
      className={cls}
      style={style}
      onClick={zoom ? onClick : undefined}
      role={zoom ? "button" : undefined}
      tabIndex={zoom ? 0 : undefined}
      onKeyDown={zoom ? (e) => (e.key === "Enter" || e.key === " ") && onClick(e) : undefined}
      aria-label={zoom ? `Åpne bilde: ${alt || label || ""}` : undefined}
    >
      {src ? <img src={src} alt={alt || label || ""} /> : <span>{label}</span>}
    </div>
  )
}
