import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getFamilia } from '../../data/families'
import IconaFamilia from '../marca/IconaFamilia'
import IconaInfo from '../marca/IconaInfo'
import CapcaleraVisita from '../illustracions/CapcaleraVisita'

// Fitxa comercial d'un productor (/professional): pintada amb el color de la família.
// Dades de repartiment: `comercial.zonesDistribucio` (font única).

export default function FitxaComercial({ productor, onContacte }) {
  const familia = getFamilia(productor.familia)
  const { comercial } = productor
  if (!familia || !comercial) return null

  const zones = comercial.zonesDistribucio ?? []

  return (
    <article
      className="fitxa-comercial lift"
      style={{ '--familia': familia.color, '--familia-text': familia.colorText }}
    >
      <div className="fitxa-comercial__capcalera" style={{ background: familia.color }}>
        <CapcaleraVisita familia={familia.id} />
        <div className="fitxa-comercial__icona" aria-hidden="true">
          <IconaFamilia familia={familia.id} mida={50} />
        </div>
      </div>

      <div className="fitxa-comercial__cos">
        <p className="fitxa-comercial__categoria">{productor.categoria}</p>
        <h3 className="fitxa-comercial__nom">{productor.nom}</h3>

        <dl className="fitxa-comercial__dades">
          {productor.comarca && (
            <div className="fitxa-comercial__dada">
              <IconaInfo tipus="pin" />
              <dt>Comarca</dt>
              <dd>{productor.comarca}</dd>
            </div>
          )}
          {zones.length > 0 && (
            <div className="fitxa-comercial__dada">
              <IconaInfo tipus="camio" />
              <dt>Reparteix a</dt>
              <dd>{zones.join(', ')}</dd>
            </div>
          )}
          {comercial.comandaMinima && (
            <div className="fitxa-comercial__dada">
              <IconaInfo tipus="caixa" />
              <dt>Comanda mínima</dt>
              <dd>{comercial.comandaMinima}</dd>
            </div>
          )}
        </dl>

        <div className="fitxa-comercial__peu">
          <button type="button" className="btn btn--bosc btn--petit" onClick={() => onContacte(productor)}>
            Sol·licitar contacte
            <span className="sr-only"> amb {productor.nom}</span>
          </button>
          <Link to={`/productors/${productor.slug}`} className="enllac-fletxa fitxa-comercial__visita">
            Veure la visita
            <span className="sr-only"> de {productor.nom}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

FitxaComercial.propTypes = {
  productor: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    familia: PropTypes.string,
    categoria: PropTypes.string,
    comarca: PropTypes.string,
    comercial: PropTypes.shape({
      zonesDistribucio: PropTypes.arrayOf(PropTypes.string),
      comandaMinima: PropTypes.string,
    }),
  }).isRequired,
  onContacte: PropTypes.func.isRequired,
}
