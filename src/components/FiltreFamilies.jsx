import PropTypes from 'prop-types'
import IconaFamilia from './marca/IconaFamilia'

// Filtre per família de producte: una fila de xips (icona petita + nom) més "Totes".
// Són botons reals amb aria-pressed. `families` ja ve filtrat (només les que tenen
// productors publicats); `activa` és l'id de la família o null.

export default function FiltreFamilies({ families, activa, onCanvi }) {
  return (
    <div className="filtre-families" role="group" aria-label="Filtra per família de producte">
      <button
        type="button"
        className="xip"
        aria-pressed={activa === null}
        onClick={() => onCanvi(null)}
      >
        Totes
      </button>
      {families.map((familia) => (
        <button
          key={familia.id}
          type="button"
          className="xip"
          aria-pressed={activa === familia.id}
          onClick={() => onCanvi(activa === familia.id ? null : familia.id)}
        >
          <IconaFamilia familia={familia.id} mida={30} />
          {familia.nom}
        </button>
      ))}
    </div>
  )
}

FiltreFamilies.propTypes = {
  families: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, nom: PropTypes.string.isRequired })
  ).isRequired,
  activa: PropTypes.string,
  onCanvi: PropTypes.func.isRequired,
}
