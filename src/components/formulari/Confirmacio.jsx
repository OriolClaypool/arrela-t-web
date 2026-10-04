import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import IconaCheck from '../marca/IconaCheck'

// Estat de confirmació d'un formulari enviat: substitueix el formulari (no el deixa
// buit en silenci). Rep el focus perquè el lector de pantalla el llegeixi.

export default function Confirmacio({ titol = 'Gràcies.', text, textTorna, onTorna }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div ref={ref} className="confirmacio" role="status" tabIndex={-1}>
      <IconaCheck fons="#1F4A34" check="#F5F0E4" mida={44} />
      <p className="confirmacio__text">
        <span className="confirmacio__titol">{titol}</span> {text}
      </p>
      {onTorna && (
        <button type="button" className="btn btn--contorn btn--petit" onClick={onTorna}>
          {textTorna}
        </button>
      )}
    </div>
  )
}

Confirmacio.propTypes = {
  titol: PropTypes.string,
  text: PropTypes.string.isRequired,
  textTorna: PropTypes.string,
  onTorna: PropTypes.func,
}
