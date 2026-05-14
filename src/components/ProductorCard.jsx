import { Link } from 'react-router-dom'

export default function ProductorCard({ productor, compact = false }) {
  if (!productor.publicat) {
    return (
      <div className="dir-card dir-card--pending" aria-hidden="true">
        <div className="dir-card__image" />
        <div className="dir-card__content">
          <p className="dir-card__pending-label">Aviat disponible</p>
          <h3 className="dir-card__nom">{productor.nom}</h3>
        </div>
      </div>
    )
  }

  return (
    <article className="dir-card">
      <div className="dir-card__image" aria-hidden="true" />
      <div className="dir-card__content">
        <div className="dir-card__meta">
          {productor.categoria && (
            <span className="dir-card__tag">{productor.categoria}</span>
          )}
          {productor.comarca && (
            <span className="dir-card__comarca">{productor.comarca}</span>
          )}
        </div>
        <h3 className="dir-card__nom">{productor.nom}</h3>
        {!compact && productor.descripcio && (
          <p className="dir-card__desc">{productor.descripcio}</p>
        )}
        <Link to={`/productors/${productor.slug}`} className="dir-card__link">
          Veure perfil →
        </Link>
      </div>
    </article>
  )
}
