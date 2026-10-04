import { Link } from 'react-router-dom'
import useFadeIn from '../../hooks/useFadeIn'
import Segell from '../marca/Segell'
import Fletxa from '../marca/Fletxa'
import { codiVisita, minuscula } from '../../utils/format'

// Banda del segell de la visita (--rosa-terra, maqueta visita.html): el segell numerat,
// "Visita nº 001, verificada", la data de la visita (si existeix) i l'enllaç a /segell.
// Només es mostra si la visita té número.

export default function VisitaSegell({ productor }) {
  const ref = useFadeIn()
  if (productor.numeroVisita == null) return null

  const codi = codiVisita(productor.numeroVisita)
  const data = productor.reportatge?.dataVisita
  const videos = productor.reportatge?.videos?.length ?? 0
  const prova = videos > 0 ? 'Els tres vídeos i aquest reportatge en són la prova.' : 'Aquest reportatge en és la prova.'

  return (
    <section className="visita-segell" aria-labelledby="segell-p-titol">
      <div ref={ref} className="visita-segell__inner contenidor fade-in">
        <Segell numero={productor.numeroVisita} mida={190} className="visita-segell__segell" />
        <div className="visita-segell__text">
          <p className="seccio-etiqueta">El segell</p>
          <h2 id="segell-p-titol" className="visita-segell__titol">Visita nº {codi}, verificada</h2>
          <p className="visita-segell__frase">
            {data ? `Visita feta: ${minuscula(data)}. ` : ''}
            {prova}
          </p>
          <Link to="/segell" className="enllac-fletxa">
            Com funciona el segell
            <Fletxa />
          </Link>
        </div>
      </div>
    </section>
  )
}
