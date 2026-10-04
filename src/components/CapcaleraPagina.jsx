import PropTypes from 'prop-types'
import PaisatgeCapcalera from './illustracions/PaisatgeCapcalera'

// Capçalera de les pàgines interiors (/entrevistes, /productors, /agenda):
// etiqueta de secció, títol, introducció i, a la dreta, un paisatge suau.
// Va sobre --lli; `fons` és el color de la secció que ve a sota.

export default function CapcaleraPagina({ id, etiqueta, titol, intro, fons, children }) {
  return (
    <header className="pagina-capcalera" aria-labelledby={id}>
      <PaisatgeCapcalera fons={fons} />
      <div className="pagina-capcalera__inner contenidor">
        <p className="seccio-etiqueta">{etiqueta}</p>
        <h1 id={id} className="seccio-titol seccio-titol--gran">
          {titol}
        </h1>
        {intro && <p className="seccio-intro seccio-intro--ample">{intro}</p>}
        {children}
      </div>
    </header>
  )
}

CapcaleraPagina.propTypes = {
  id: PropTypes.string.isRequired,
  etiqueta: PropTypes.string.isRequired,
  titol: PropTypes.string.isRequired,
  intro: PropTypes.string,
  fons: PropTypes.string,
  children: PropTypes.node,
}
