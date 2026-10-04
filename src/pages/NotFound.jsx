import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Footer from '../components/Footer'
import Fletxa from '../components/marca/Fletxa'
import IlustracioPerdut from '../components/illustracions/IlustracioPerdut'

// Pàgina 404. També la mostra /productors/:slug quan el productor no existeix.

export default function NotFound() {
  return (
    <>
      <Seo
        title="Pàgina no trobada — Arrela't"
        description="No hem trobat la pàgina que busques."
        noindex
      />

      <main className="perdut portada">
        <div className="perdut__inner contenidor">
          <IlustracioPerdut className="perdut__il" />
          <p className="seccio-etiqueta">Error 404</p>
          <h1 className="seccio-titol seccio-titol--gran">Aquest camí no porta enlloc</h1>
          <p className="seccio-intro">
            No hem trobat la pàgina que busques. Potser l&apos;enllaç és antic o t&apos;has desviat pel camí.
          </p>
          <div className="perdut__botons">
            <Link to="/" className="btn btn--terracota btn--gran lift">
              Torna a l&apos;inici
              <Fletxa />
            </Link>
            <Link to="/entrevistes" className="btn btn--contorn btn--gran">
              Mira les visites
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
