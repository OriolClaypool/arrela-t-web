import { useState } from 'react'
import PropTypes from 'prop-types'
import Camp from './Camp'
import Confirmacio from './Confirmacio'
import Fletxa from '../marca/Fletxa'
import { FORMULARIS_ACTIUS, INSTAGRAM_URL, enviaFormulari } from '../../utils/enviament'

// Formulari genèric dels formularis d'Arrela't (/professional i /contacte).
// - prefix: es posa davant dels id dels camps (a una mateixa pàgina hi pot haver
//   diversos formularis)
// - camps: llista de descriptors per a <Camp> ({ nom, etiqueta, tipus, ... })
// - confirmacio: { text, textTorna, onTorna } de l'estat posterior a l'enviament
//   (onTorna: què fa el botó de la confirmació; per defecte torna a mostrar el formulari)
// - ocults: parelles nom/valor que viatgen amb l'enviament sense mostrar-se
// - assumpte: l'assumpte del correu que arriba a l'equip (per defecte, segons el prefix)
//
// Enviament (src/utils/enviament.js): amb Formspree configurat, la confirmació només
// surt quan el missatge ha arribat; si falla, es diu i el que s'ha escrit es manté. Sense
// Formspree, en lloc del formulari es mostra com escriure'ns per Instagram.

export default function Formulari({
  prefix,
  camps,
  boto,
  classeBoto = 'btn btn--terracota btn--gran',
  confirmacio,
  ocults,
  assumpte,
}) {
  // inici | enviant | enviat | error
  const [estat, setEstat] = useState('inici')

  if (!FORMULARIS_ACTIUS) {
    return (
      <div className="formulari-avis" role="note">
        <p className="formulari-avis__titol">Ara mateix, el més ràpid és Instagram</p>
        <p className="formulari-avis__text">
          Encara no rebem missatges per aquest formulari. Escriu-nos un missatge directe a
          @arrela_t_ i et respondrem.
        </p>
        <a
          href={INSTAGRAM_URL}
          className="btn btn--terracota"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escriu-nos per Instagram
          <Fletxa />
          <span className="sr-only">(s&apos;obre en una pestanya nova)</span>
        </a>
      </div>
    )
  }

  const gestionaEnviament = async (e) => {
    e.preventDefault()
    if (estat === 'enviant') return
    const dades = Object.fromEntries(new FormData(e.currentTarget))
    setEstat('enviant')
    const resultat = await enviaFormulari({
      ...dades,
      _subject: assumpte || `Arrela't · formulari de ${prefix}`,
    })
    setEstat(resultat.ok ? 'enviat' : 'error')
  }

  if (estat === 'enviat') {
    return (
      <Confirmacio
        text={confirmacio.text}
        textTorna={confirmacio.textTorna}
        onTorna={confirmacio.onTorna ?? (() => setEstat('inici'))}
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
      {estat === 'error' && (
        <p className="formulari__error" role="alert">
          No s&apos;ha pogut enviar. Torna-ho a provar d&apos;aquí a una estona o escriu-nos per{' '}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        className={`${classeBoto} formulari__boto`}
        disabled={estat === 'enviant'}
        aria-busy={estat === 'enviant'}
      >
        {estat === 'enviant' ? 'Enviant...' : boto}
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
  assumpte: PropTypes.string,
}
