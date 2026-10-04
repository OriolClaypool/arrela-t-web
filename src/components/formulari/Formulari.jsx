import { useState } from 'react'
import PropTypes from 'prop-types'
import Camp from './Camp'
import Confirmacio from './Confirmacio'
import Fletxa from '../marca/Fletxa'

// Formulari genèric dels formularis d'Arrela't (/professional i /contacte).
// - prefix: es posa davant dels id dels camps (a una mateixa pàgina hi pot haver
//   diversos formularis)
// - camps: llista de descriptors per a <Camp> ({ nom, etiqueta, tipus, ... })
// - confirmacio: { text, textTorna, onTorna } de l'estat posterior a l'enviament
//   (onTorna: què fa el botó de la confirmació; per defecte torna a mostrar el formulari)
// - ocults: parelles nom/valor que viatgen amb l'enviament sense mostrar-se
// Encara no hi ha servidor: en enviar només es mostra la confirmació.

export default function Formulari({
  prefix,
  camps,
  boto,
  classeBoto = 'btn btn--terracota btn--gran',
  confirmacio,
  ocults,
}) {
  const [enviat, setEnviat] = useState(false)

  const gestionaEnviament = (e) => {
    e.preventDefault()
    // TODO: connectar a Formspree
    // Aquí hi aniria la petició amb les dades: Object.fromEntries(new FormData(e.currentTarget))
    setEnviat(true)
  }

  if (enviat) {
    return (
      <Confirmacio
        text={confirmacio.text}
        textTorna={confirmacio.textTorna}
        onTorna={confirmacio.onTorna ?? (() => setEnviat(false))}
      />
    )
  }

  return (
    <form className="formulari" onSubmit={gestionaEnviament}>
      <p className="formulari__nota">
        {camps.some((camp) => camp.opcional)
          ? 'Tots els camps són obligatoris, llevat dels marcats com a opcionals.'
          : 'Tots els camps són obligatoris.'}
      </p>
      {ocults &&
        Object.entries(ocults).map(([nom, valor]) => (
          <input key={nom} type="hidden" name={nom} value={valor} />
        ))}
      <div className="formulari__camps">
        {camps.map((camp) => (
          <Camp key={camp.nom} id={`${prefix}-${camp.nom}`} {...camp} />
        ))}
      </div>
      <button type="submit" className={`${classeBoto} formulari__boto`}>
        {boto}
        <Fletxa />
      </button>
    </form>
  )
}

Formulari.propTypes = {
  prefix: PropTypes.string.isRequired,
  camps: PropTypes.arrayOf(PropTypes.object).isRequired,
  boto: PropTypes.string.isRequired,
  classeBoto: PropTypes.string,
  confirmacio: PropTypes.shape({
    text: PropTypes.string.isRequired,
    textTorna: PropTypes.string,
    onTorna: PropTypes.func,
  }).isRequired,
  ocults: PropTypes.objectOf(PropTypes.string),
}
