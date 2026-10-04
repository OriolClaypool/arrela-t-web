import { CONTORN_CATALUNYA } from '../../data/mapaContorn'

// Silueta mini de Catalunya de la pàgina de la visita (maqueta visita.html): el
// contorn de src/data/mapaContorn.js escalat a 0,2, dins d'un viewBox de 120 x 120.
// Els fills (pin, punt) es dibuixen sobre la silueta, en aquestes mateixes coordenades
// (vegeu utils/mapaMini.js per a la projecció de [lon, lat]).
// - gruix: gruix del traç verd en unitats del viewBox (1,3 a la fitxa, 1 al mapa gran)
// - titol: text alternatiu; sense titol, la silueta és decorativa

export default function MiniCatalunya({ gruix = 1.3, titol, className, style, children }) {
  const props = titol ? { role: 'img', 'aria-label': titol } : { 'aria-hidden': 'true', focusable: 'false' }
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} {...props}>
      <path
        d={CONTORN_CATALUNYA}
        transform="scale(0.2)"
        fill="#D6DDBA"
        stroke="#6E7B2F"
        strokeWidth={gruix / 0.2}
        strokeLinejoin="round"
      />
      {children}
    </svg>
  )
}
