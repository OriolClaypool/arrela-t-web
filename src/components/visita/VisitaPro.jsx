import { Link } from 'react-router-dom'
import Fletxa from '../marca/Fletxa'

// Banda "Espai professional" de la visita (terracota, maqueta visita.html): porta a la
// fitxa comercial a /professional.

export default function VisitaPro({ productor }) {
  return (
    <section className="visita-pro" aria-label="Espai professional">
      <div className="visita-pro__inner contenidor">
        <div>
          <p className="visita-pro__etiqueta">Ets botiga o restaurant?</p>
          <p className="visita-pro__titol">Consulta la fitxa comercial de {productor.nom}</p>
        </div>
        <Link to="/professional" className="visita-pro__boto lift">
          Espai professional
          <Fletxa />
        </Link>
      </div>
    </section>
  )
}
