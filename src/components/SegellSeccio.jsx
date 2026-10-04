import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import passos from '../data/segell'
import Segell from './marca/Segell'
import IconaPas from './marca/IconaPas'
import Fletxa from './marca/Fletxa'

// Secció "El segell" de la portada (maqueta inici.html): el segell de la
// primera visita publicada, els 4 passos del mètode i l'enllaç a /segell.

const primera = productors
  .filter((p) => p.publicat && p.numeroVisita != null)
  .sort((a, b) => a.numeroVisita - b.numeroVisita)[0]

export default function SegellSeccio() {
  const ref = useFadeIn()

  return (
    <section id="segell" className="segell-seccio" aria-labelledby="segell-titol">
      <div ref={ref} className="segell-seccio__inner contenidor fade-in">
        {primera && (
          <div className="segell-seccio__segell">
            <Segell
              numero={primera.numeroVisita}
              nom={primera.nom}
              mida={330}
              style={{ width: '100%', maxWidth: 330, height: 'auto' }}
            />
          </div>
        )}

        <div className="segell-seccio__text">
          <p className="seccio-etiqueta">El segell Arrela&apos;t</p>
          <h2 id="segell-titol" className="seccio-titol">
            Verificat vol dir que hi hem estat
          </h2>
          <p className="seccio-intro seccio-intro--ample">
            No és una certificació oficial: és el nostre compromís. Cada segell porta un número, la
            data de la visita i els vídeos que ho demostren.
          </p>

          <ol className="segell-passos" role="list">
            {passos.map((pas, i) => (
              <li key={pas.id} className="segell-pas">
                <span
                  className={`segell-pas__icona${pas.id === 'segellem' ? ' segell-pas__icona--terracota' : ''}`}
                  aria-hidden="true"
                >
                  <IconaPas pas={pas.id} />
                </span>
                <span>
                  <span className="segell-pas__numero">{String(i + 1).padStart(2, '0')}</span>
                  <span className="segell-pas__nom">{pas.nom}</span>
                  <span className="segell-pas__text">{pas.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <Link to="/segell" className="enllac-fletxa segell-seccio__enllac">
            Com funciona el segell
            <Fletxa />
          </Link>
        </div>
      </div>
    </section>
  )
}
