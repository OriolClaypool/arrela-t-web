import { useParams, Link } from 'react-router-dom'
import productors from '../data/productors'
import Footer from '../components/Footer'

export default function ProductorDetall() {
  const { slug } = useParams()
  const productor = productors.find((p) => p.slug === slug)

  if (!productor) {
    return (
      <>
        <div className="not-found">
          <h1>Productor no trobat</h1>
          <p>No hem trobat cap productor amb aquest identificador.</p>
          <Link to="/#productors">Veure tots els productors</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="detall-hero">
        <div className="detall-hero__bg" aria-hidden="true" />
        <div className="detall-hero__content">
          <div className="detall-hero__meta">
            <span className="tag">{productor.categoria}</span>
            <span className="comarca">{productor.comarca}</span>
          </div>
          <h1 className="detall-hero__nom">{productor.nom}</h1>
        </div>
      </div>

      <div className="detall-body">
        <div className="detall-recomanacio">
          <h2>Per què els hem visitat</h2>
          <p>{productor.recomanacio}</p>
        </div>

        <div className="detall-videos">
          <h2>Vídeos</h2>
          <div className="detall-videos__list">
            {productor.videos.map((video, i) => (
              <div key={i} className="video-item">
                <h3>Vídeo {i + 1} · {video.titol}</h3>
                {video.url === '#' ? (
                  <div className="video-item__placeholder">Vídeo aviat disponible</div>
                ) : (
                  <div className="video-item__iframe">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.url}`}
                      title={`${productor.nom} — ${video.titol}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detall-back">
        <Link to="/#productors">← Tots els productors</Link>
      </div>

      <Footer />
    </>
  )
}
