import useFadeIn from '../hooks/useFadeIn'
import PROCESSOS from '../data/processos'
import IconaProces from './illustracions/IconaProces'

// Secció "El procés" de la visita (maqueta visita.html): els passos de la família
// (vi: vinya a ampolla; formatge: pastura a maduració; horta: llavor a cistella) com a
// icones rodones numerades, units per una línia de punts només en escriptori.
// Dades: src/data/processos.js; icones: components/illustracions/IconaProces.jsx.

export default function ProcesPassos({ familia }) {
  const ref = useFadeIn()
  const proces = PROCESSOS[familia.id]
  if (!proces) return null

  return (
    <section className="visita-proces" aria-labelledby="proces-titol">
      <div ref={ref} className="visita-proces__inner contenidor fade-in">
        <p className="seccio-etiqueta">El procés</p>
        <h2 id="proces-titol" className="seccio-titol">{proces.titol}</h2>

        <div className="visita-proces__cos">
          <div className="visita-proces__linia" aria-hidden="true" />
          <ol className="visita-proces__passos" role="list">
            {proces.passos.map((pas, i) => (
              <li key={pas.id} className="visita-proces__pas">
                <IconaProces familia={familia.id} pas={pas.id} />
                <span className="visita-proces__numero">{String(i + 1).padStart(2, '0')}</span>
                <span className="visita-proces__nom">{pas.nom}</span>
                <span className="visita-proces__text">{pas.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
