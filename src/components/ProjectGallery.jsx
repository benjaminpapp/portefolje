import Photo from "./Photo"
import useDragScroll from "./useDragScroll"

// Horisontal bildestripe med klikk-og-dra-scroll (se useDragScroll).
export default function ProjectGallery({ images, title, onOpen }) {
  const ref = useDragScroll()
  return (
    <div className="project-gallery" ref={ref}>
      {images.map((src, i) => (
        <Photo
          key={src}
          src={src}
          alt={`${title} skjermbilde ${i + 1}`}
          className="project-gallery-photo"
          onClick={() => onOpen(src, `${title} skjermbilde ${i + 1}`)}
        />
      ))}
    </div>
  )
}
