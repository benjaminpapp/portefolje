import { useState } from "react"
import { Reveal } from "./motion"
import Photo from "./Photo"
import ProjectGallery from "./ProjectGallery"
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
                <>
                  <div className="video-embed">
                    <iframe
                      src={`https://www.youtube.com/embed/${p.video}`}
                      title={p.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  {p.image && (
                    <Photo
                      src={p.image}
                      alt={`${p.title} – digital tvilling`}
                      className="project-detail-photo video-still"
                      onClick={() => open(p.image, `${p.title} – digital tvilling`)}
                    />
                  )}
                </>
              ) : p.comparisons ? (
                <div className="comparisons">
                  {p.comparisons.map((c) => (
                    <div className="comparison" key={c.label}>
                      <h3 className="comparison-label">{c.label}</h3>
                      <div className="before-after">
                        <figure>
                          <Photo
                            src={c.before}
                            alt={`${p.title} ${c.label} – før`}
                            className="natural"
                            onClick={() => open(c.before, `${p.title} ${c.label} – før`)}
                          />
                          <figcaption><span className="ba-tag">Før</span></figcaption>
                        </figure>
                        <figure>
                          <Photo
                            src={c.after}
                            alt={`${p.title} ${c.label} – etter`}
                            className="natural"
                            onClick={() => open(c.after, `${p.title} ${c.label} – etter`)}
                          />
                          <figcaption><span className="ba-tag ba-tag-after">Etter</span></figcaption>
                        </figure>
                      </div>
                    </div>
                  ))}
                </div>
              ) : p.images ? (
                <ProjectGallery images={p.images} title={p.title} onOpen={open} />
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
                {(Array.isArray(p.text) ? p.text : [p.text]).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
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
