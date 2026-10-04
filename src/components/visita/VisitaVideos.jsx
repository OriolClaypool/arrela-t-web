import useFadeIn from '../../hooks/useFadeIn'
import VideoLite from '../VideoLite'

// Secció "Els vídeos" de la visita (id="videos", banda verda): els tres vídeos de la
// visita com a targetes amb pòster il·lustrat. Vegeu VideoLite.jsx.

export default function VisitaVideos({ productor, familia }) {
  const ref = useFadeIn()
  const videos = productor.reportatge?.videos ?? []
  if (videos.length === 0) return null

  return (
    <section id="videos" className="visita-videos" aria-labelledby="videos-titol">
      <div ref={ref} className="visita-videos__inner contenidor fade-in">
        <p className="seccio-etiqueta seccio-etiqueta--clara">Els vídeos</p>
        <h2 id="videos-titol" className="seccio-titol seccio-titol--clar">Tres vídeos, tres mirades</h2>
        <p className="visita-videos__intro">
          La persona, el projecte i el debat. Gravats durant la visita, aquí amb tot el context.
        </p>
        <div className="visita-videos__graella">
          {videos.map((video, i) => (
            <VideoLite key={video.numero ?? i} video={video} indice={i} familia={familia} />
          ))}
        </div>
      </div>
    </section>
  )
}
