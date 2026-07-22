// Bildefelt: viser et ekte bilde hvis `src` er satt, ellers en
// wireframe-plassholder med etikett.
// `eager` lastes med en gang (over folden); alt annet lazy så bildene
// ikke konkurrerer med bakgrunns-animasjonene om hovedtråden.
export default function Photo({ src, alt, label, soft, className = "", style, onClick, eager = false }) {
  const zoom = src && onClick
  const cls = `photo${soft ? " soft" : ""}${src ? " has-img" : ""}${zoom ? " zoomable" : ""} ${className}`.trim()
  return (
    <div
      className={cls}
      style={style}
      onClick={zoom ? onClick : undefined}
      role={zoom ? "button" : undefined}
      tabIndex={zoom ? 0 : undefined}
      onKeyDown={zoom ? (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e) }
      } : undefined}
      aria-label={zoom ? `Åpne bilde: ${alt || label || ""}` : undefined}
    >
      {src
        ? <img src={src} alt={alt || label || ""} loading={eager ? "eager" : "lazy"} decoding="async" />
        : <span>{label}</span>}
    </div>
  )
}
