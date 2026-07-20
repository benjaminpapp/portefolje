import { useState } from "react"
import { Reveal } from "./motion"
import Photo from "./Photo"
import Lightbox from "./Lightbox"
import { projects } from "../data/content"

export default function ProjectDetails() {
  // Aktivt bilde for fullskjerm-visning (null = lukket).
  const [zoom, setZoom] = useState(null)
  const open = (src, alt) => setZoom({ src, alt })

  return (
    <>
      {projects.map((p) => (
        <section className="sec project-detail" id={p.id} key={p.id}>
          <div className="wrap">
            <Reveal as="h2" className="shead">{p.title}</Reveal>
            <Reveal delay={0.05}>
              {p.video ? (
                <div className="video-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${p.video}`}
                    title={p.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : p.beforeAfter ? (
                <div className="before-after">
                  <figure>
                    <Photo
                      src={p.beforeAfter.before}
                      alt={`${p.title} – før`}
                      className="natural"
                      onClick={() => open(p.beforeAfter.before, `${p.title} – før`)}
                    />
                    <figcaption><span className="ba-tag">Før</span></figcaption>
                  </figure>
                  <figure>
                    <Photo
                      src={p.beforeAfter.after}
                      alt={`${p.title} – etter`}
                      className="natural"
                      onClick={() => open(p.beforeAfter.after, `${p.title} – etter`)}
                    />
                    <figcaption><span className="ba-tag ba-tag-after">Etter</span></figcaption>
                  </figure>
                </div>
              ) : p.images ? (
                <div className="project-gallery">
                  {p.images.map((src, i) => (
                    <Photo
                      key={src}
                      src={src}
                      alt={`${p.title} skjermbilde ${i + 1}`}
                      className="project-gallery-photo"
                      onClick={() => open(src, `${p.title} skjermbilde ${i + 1}`)}
                    />
                  ))}
                </div>
              ) : (
                <Photo
                  src={p.image}
                  label="bilde / mockup"
                  alt={p.title}
                  className="project-detail-photo"
                  onClick={p.image ? () => open(p.image, p.title) : undefined}
                />
              )}
            </Reveal>
            <Reveal className="project-detail-meta" delay={0.1}>
              <div className="txt">
                <span className="tag">{p.tag}</span>
                <p>{p.text}</p>
              </div>
              {p.link && (
                <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="btn">
                  {p.link.label}
                </a>
              )}
            </Reveal>
          </div>
        </section>
      ))}
      <Lightbox src={zoom?.src} alt={zoom?.alt} onClose={() => setZoom(null)} />
    </>
  )
}
