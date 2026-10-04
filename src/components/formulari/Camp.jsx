import PropTypes from 'prop-types'

// Camp de formulari amb <label> real. Tipus: text, email, tel, select, textarea.
// - opcional: el camp no és obligatori (es marca amb "(opcional)" a l'etiqueta;
//   tots els altres són `required`)
// - ample: el camp ocupa tota la fila
// - opcions: per a select, llista de { valor, text } o de textos simples

export default function Camp({
  id,
  nom,
  etiqueta,
  tipus = 'text',
  opcions,
  opcional = false,
  ample = false,
  ajuda,
  placeholder,
  autoComplete,
  files = 4,
}) {
  const idAjuda = ajuda ? `${id}-ajuda` : undefined
  const comuns = {
    id,
    name: nom,
    required: !opcional,
    'aria-describedby': idAjuda,
    autoComplete,
  }

  let control
  if (tipus === 'select') {
    control = (
      <select className="camp__control camp__control--select" defaultValue="" {...comuns}>
        <option value="" disabled>
          Tria una opció
        </option>
        {opcions.map((opcio) => {
          const { valor, text } = typeof opcio === 'string' ? { valor: opcio, text: opcio } : opcio
          return (
            <option key={valor} value={valor}>
              {text}
            </option>
          )
        })}
      </select>
    )
  } else if (tipus === 'textarea') {
    control = (
      <textarea className="camp__control camp__control--text" rows={files} placeholder={placeholder} {...comuns} />
    )
  } else {
    control = <input className="camp__control" type={tipus} placeholder={placeholder} {...comuns} />
  }

  return (
    <div className={`camp${ample ? ' camp--ample' : ''}`}>
      <label className="camp__etiqueta" htmlFor={id}>
        {etiqueta}
        {opcional && <span className="camp__opcional"> (opcional)</span>}
      </label>
      {control}
      {ajuda && (
        <p id={idAjuda} className="camp__ajuda">
          {ajuda}
        </p>
      )}
    </div>
  )
}

Camp.propTypes = {
  id: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  etiqueta: PropTypes.string.isRequired,
  tipus: PropTypes.oneOf(['text', 'email', 'tel', 'select', 'textarea']),
  opcions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ valor: PropTypes.string.isRequired, text: PropTypes.string.isRequired }),
    ])
  ),
  opcional: PropTypes.bool,
  ample: PropTypes.bool,
  ajuda: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  files: PropTypes.number,
}
