import useFadeIn from '../../hooks/useFadeIn'
import ProducteIllustracio from '../ProducteIllustracio'

// Secció "Els seus productes" de la visita (maqueta visita.html, "Els seus vins"): una
// targeta per producte amb la il·lustració de la família, el nom i el detall.

const TEXTOS = {
  vi: { etiqueta: 'Els seus vins', titol: 'El que surt de la vinya' },
  formatge: { etiqueta: 'Els seus formatges', titol: "El que surt de l'obrador" },
  horta: { etiqueta: 'Els seus productes', titol: "El que surt de l'hort" },
}

export default function VisitaProductes({ productor, familia }) {
  const ref = useFadeIn()
  const productes = productor.productes ?? []
  if (productes.length === 0) return null
  const text = TEXTOS[familia.id] ?? { etiqueta: 'Els seus productes', titol: 'El que surt de la terra' }

  return (
    <section className="visita-productes" aria-labelledby="productes-titol">
      <div ref={ref} className="visita-productes__inner contenidor fade-in">
        <div className="seccio-capcalera">
          <div className="seccio-capcalera__titols">
            <p className="seccio-etiqueta">{text.etiqueta}</p>
            <h2 id="productes-titol" className="seccio-titol">{text.titol}</h2>
          </div>
          <p className="visita-productes__nota">
            Una mostra del que fan. La fitxa comercial completa és a l&apos;espai professional.
          </p>
        </div>

        <ul className="visita-productes__graella" role="list">
          {productes.map((producte, i) => (
            <li key={producte.nom} className="visita-producte targeta">
              <ProducteIllustracio familia={familia} producte={producte} indice={i} />
              <h3 className="visita-producte__nom">{producte.nom}</h3>
              {producte.detall && <p className="visita-producte__detall">{producte.detall}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
