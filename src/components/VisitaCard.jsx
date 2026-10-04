import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getFamilia } from '../data/families'
import IconaFamilia from './marca/IconaFamilia'
import CapcaleraVisita from './illustracions/CapcaleraVisita'

// Targeta d'una visita (maqueta inici.html, secció "Les visites"). Es reutilitza
// a /entrevistes i /productors.
// Tota la targeta és UN sol enllaç a /productors/:slug: l'enllaç és el títol i
// s'estén per tota la targeta amb ::after (no hi ha enllaços niats).
// Pinta amb el color de la família del productor.

export default function VisitaCard({ productor }) {
  const familia = getFamilia(productor.familia)
  if (!familia) return null

  const reportatge = productor.reportatge
  const titol = reportatge?.titol || productor.nom
  const videos = reportatge?.videos?.length ?? 0
  const codi =
    productor.numeroVisita != null ? String(productor.numeroVisita).padStart(3, '0') : null
  const etiqueta = [productor.categoria, productor.comarca].filter(Boolean).join(' · ')
  // Si el títol del reportatge no és el nom del productor, el nom obre la descripció
  const nomAlText = titol !== productor.nom

  return (
    <article
      className="visita-card lift"
      style={{ '--familia': familia.color, '--familia-text': familia.colorText }}
    >
      <div className="visita-card__capcalera" style={{ background: familia.color }}>
        <CapcaleraVisita familia={familia.id} />
        {codi && <span className="etiqueta visita-card__insignia">Visita nº {codi}</span>}
        <div className="visita-card__icona" aria-hidden="true">
          <IconaFamilia familia={familia.id} mida={54} />
        </div>
      </div>

      <div className="visita-card__cos">
        {etiqueta && <p className="visita-card__etiqueta">{etiqueta}</p>}
        <h3 className="visita-card__titol">
          <Link to={`/productors/${productor.slug}`} className="visita-card__enllac">
            {titol}
          </Link>
        </h3>
        {productor.descripcioCurta && (
          <p className="visita-card__text">
            {nomAlText && `${productor.nom}. `}
            {productor.descripcioCurta}
          </p>
        )}
        <div className="visita-card__peu">
          {videos > 0 ? (
            <span className="visita-card__videos">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill={familia.colorText} />
                <path d="M10 8 L16 12 L10 16 Z" fill="#F5F0E4" />
              </svg>
              {videos} {videos === 1 ? 'vídeo' : 'vídeos'}
            </span>
          ) : (
            <span />
          )}
          <span className="visita-card__llegir" aria-hidden="true">
            Llegir la visita →
          </span>
        </div>
      </div>
    </article>
  )
}

VisitaCard.propTypes = {
  productor: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    familia: PropTypes.string,
    numeroVisita: PropTypes.number,
    categoria: PropTypes.string,
    comarca: PropTypes.string,
    descripcioCurta: PropTypes.string,
    reportatge: PropTypes.shape({
      titol: PropTypes.string,
      videos: PropTypes.array,
    }),
  }).isRequired,
}
