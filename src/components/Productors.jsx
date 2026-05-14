import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'

function ProductorCard({ productor, index }) {
  const ref = useFadeIn(0.1)
  const isReverse = index % 2 !== 0

  return (
    <article
      ref={ref}
      className={`productor-card fade-in${isReverse ? ' productor-card--reverse' : ''}`}
    >
      <div className="productor-card__image-wrap">
        <div className="productor-card__image-placeholder" aria-hidden="true" />
      </div>

      <div className="productor-card__content">
        <div className="productor-card__meta">
          <span className="productor-card__tag">{productor.categoria}</span>
          <span className="productor-card__comarca">{productor.comarca}</span>
        </div>

        <h3 className="productor-card__nom">{productor.nom}</h3>

        <p className="productor-card__recomanacio">{productor.recomanacio}</p>

        <div className="productor-card__videos">
          {productor.videos.map((video, i) => (
            <a
              key={i}
              href={video.url}
              className="productor-card__video-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Vídeo {i + 1} · {video.titol}
            </a>
          ))}
        </div>

        <Link to={`/productors/${productor.slug}`} className="productor-card__link">
          Veure productor →
        </Link>
      </div>
    </article>
  )
}

export default function Productors() {
  const titleRef = useFadeIn()

  return (
    <section id="productors" className="productors">
      <div className="productors__inner">
        <h2 ref={titleRef} className="productors__title fade-in">
          Els productors
        </h2>
        <div className="productors__list">
          {productors.map((productor, i) => (
            <ProductorCard key={productor.slug} productor={productor} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
