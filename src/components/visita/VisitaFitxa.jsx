import useFadeIn from '../../hooks/useFadeIn'
import Comarca from '../infografies/Comarca'
import Trajectoria from '../infografies/Trajectoria'
import Quadres from '../infografies/Quadres'
import Pictograma from '../infografies/Pictograma'

// Secció "La fitxa" de la visita: una targeta d'infografia per cada element de
// `productor.fitxa` (comarca, trajectòria, quadres, pictograma), en el color de la família.
// Cada infografia només es dibuixa si en té les dades.

export default function VisitaFitxa({ productor, familia }) {
  const ref = useFadeIn()
  const targetes = (productor.fitxa ?? []).map((item, i) => {
    switch (item.tipus) {
      case 'comarca':
        return <Comarca key={i} productor={productor} familia={familia} />
      case 'trajectoria':
        return <Trajectoria key={i} productor={productor} familia={familia} />
      case 'quadres':
        return <Quadres key={i} item={item} />
      case 'pictograma':
        return <Pictograma key={i} item={item} familia={familia} />
      default:
        return null
    }
  })

  return (
    <section className="visita-fitxa" aria-labelledby="fitxa-titol">
      <div ref={ref} className="visita-fitxa__inner contenidor fade-in">
        <p className="seccio-etiqueta">La fitxa</p>
        <h2 id="fitxa-titol" className="seccio-titol">
          {productor.nom} en un cop d&apos;ull
        </h2>
        <ul className="visita-fitxa__graella" role="list">
          {targetes}
        </ul>
      </div>
    </section>
  )
}
