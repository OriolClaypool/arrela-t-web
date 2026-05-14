import { useParams, Link } from 'react-router-dom'
import productors from '../data/productors'
import Footer from '../components/Footer'

export default function ProductorDetall() {
  const { slug } = useParams()
  const productor = productors.find((p) => p.slug === slug)

  if (!productor || !productor.publicat) {
    return (
      <>
        <div className="not-found">
          <h1>Productor no trobat</h1>
          <p>No hem trobat cap productor amb aquest identificador.</p>
          <Link to="/productors">Torna al directori</Link>
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
            {productor.categoria && <span className="tag">{productor.categoria}</span>}
            {productor.comarca && <span className="comarca">{productor.comarca}</span>}
          </div>
          <h1 className="detall-hero__nom">{productor.nom}</h1>
        </div>
      </div>

      <div className="detall-body">
        {productor.descripcio && (
          <div className="detall-seccio">
            <h2 className="detall-seccio__title">Descripció</h2>
            <p className="detall-seccio__text">{productor.descripcio}</p>
          </div>
        )}

        {productor.recomanacio && (
          <div className="detall-recomanacio">
            <h2>Per què els hem visitat</h2>
            <p>{productor.recomanacio}</p>
          </div>
        )}

        {productor.productes.length > 0 && (
          <div className="detall-seccio">
            <h2 className="detall-seccio__title">Productes</h2>
            <div className="detall-productes">
              {productor.productes.map((p) => (
                <span key={p} className="detall-producte-tag">{p}</span>
              ))}
            </div>
          </div>
        )}

        {productor.videos.length > 0 && (
          <div className="detall-videos">
            <h2>Les entrevistes</h2>
            <div className="detall-videos__grid">
              {productor.videos.map((video, i) => (
                <div key={i} className="video-item">
                  <div className="video-item__iframe">
                    <iframe
                      src={video.url === '#' ? 'about:blank' : `https://www.youtube-nocookie.com/embed/${video.url}`}
                      title={`${productor.nom} — ${video.titol}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="video-item__title">{video.titol}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(productor.xarxes.instagram || productor.xarxes.web) && (
          <div className="detall-seccio">
            <h2 className="detall-seccio__title">Contacte</h2>
            <div className="detall-xarxes">
              {productor.xarxes.instagram && (
                <a
                  href={productor.xarxes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detall-xarxa-link"
                >
                  Instagram →
                </a>
              )}
              {productor.xarxes.web && (
                <a
                  href={productor.xarxes.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detall-xarxa-link"
                >
                  Web →
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="detall-back">
        <Link to="/productors">← Tornar al directori</Link>
      </div>

      <Footer />
    </>
  )
}
