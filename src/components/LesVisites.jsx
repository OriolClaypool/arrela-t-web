import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import VisitaCard from './VisitaCard'
import Fletxa from './marca/Fletxa'

// Secció "Les visites" de la portada: les 3 visites publicades més recents
// (per numeroVisita, de més nova a més antiga).

const NOMBRES = { 1: ['Una', 'una'], 2: ['Dues', 'dues'], 3: ['Tres', 'tres'] }

const recents = productors
  .filter((p) => p.publicat && p.reportatge && p.familia)
  .sort((a, b) => (b.numeroVisita ?? 0) - (a.numeroVisita ?? 0))
  .slice(0, 3)

function titolSegonsNombre(n) {
  const [majuscula, minuscula] = NOMBRES[n]
  const visita = n === 1 ? 'visita' : 'visites'
  const manera = n === 1 ? 'manera' : 'maneres'
  return `${majuscula} ${visita}, ${minuscula} ${manera} de cuidar la terra`
}

export default function LesVisites() {
  const ref = useFadeIn()

  if (recents.length === 0) return null

  return (
    <section id="visites" className="visites-seccio" aria-labelledby="visites-titol">
      <div ref={ref} className="visites-seccio__inner contenidor fade-in">
        <div className="seccio-capcalera">
          <div className="seccio-capcalera__titols">
            <p className="seccio-etiqueta">Les visites</p>
            <h2 id="visites-titol" className="seccio-titol seccio-titol--gran">
              {titolSegonsNombre(recents.length)}
            </h2>
          </div>
          <Link to="/entrevistes" className="enllac-fletxa">
            Totes les visites
            <Fletxa />
          </Link>
        </div>

        <div className="visites-seccio__graella">
          {recents.map((p) => (
            <VisitaCard key={p.slug} productor={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
