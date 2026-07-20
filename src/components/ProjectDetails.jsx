import { Reveal } from "./motion"
import Photo from "./Photo"
import { projects } from "../data/content"

export default function ProjectDetails() {
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
              ) : (
                <Photo src={p.image} label="bilde / mockup" alt={p.title} className="project-detail-photo" />
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
    </>
  )
}
