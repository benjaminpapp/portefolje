// Bildefelt: viser et ekte bilde hvis `src` er satt, ellers en
// wireframe-plassholder med etikett.
export default function Photo({ src, alt, label, soft, className = "", style }) {
  const cls = `photo${soft ? " soft" : ""}${src ? " has-img" : ""} ${className}`.trim()
  return (
    <div className={cls} style={style}>
      {src ? <img src={src} alt={alt || label || ""} /> : <span>{label}</span>}
    </div>
  )
}
