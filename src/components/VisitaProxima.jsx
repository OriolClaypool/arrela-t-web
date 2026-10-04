import { Link } from 'react-router-dom'
import Fletxa from './marca/Fletxa'

// Targeta discontínua de la llista de visites: convida a proposar el pròxim productor.
// Mateixa llengua que "La pròxima visita" de la llista del mapa de la portada.

export default function VisitaProxima() {
  return (
    <article className="visita-proxima">
      <span className="visita-proxima__mes" aria-hidden="true">+</span>
      <p className="seccio-etiqueta">La pròxima visita</p>
      <h3 className="visita-proxima__titol">Ens recomanes algú?</h3>
      <p className="visita-proxima__text">
        Si coneixes un productor o una productora que hauríem de visitar, explica&apos;ns-ho.
      </p>
      <Link to="/contacte" className="btn btn--terracota btn--petit lift">
        Proposa&apos;ns-el
        <Fletxa />
      </Link>
    </article>
  )
}
