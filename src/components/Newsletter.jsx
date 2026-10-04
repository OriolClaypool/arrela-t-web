import { useState } from 'react'
import useFadeIn from '../hooks/useFadeIn'
import Onada from './marca/Onada'
import IlustracioSobre from './illustracions/IlustracioSobre'

// "La carta del camp" (maqueta inici.html): ona de separació sobre la banda verda
// de dalt, sobre il·lustrat i formulari de correu.

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const ref = useFadeIn()

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <section className="carta" aria-labelledby="carta-titol">
      {/* L'ona té el color de la secció de dalt (l'espai professional, --bosc) */}
      <Onada color="#1F4A34" />
      <div ref={ref} className="carta__inner contenidor fade-in">
        <IlustracioSobre className="carta__il" />

        <div className="carta__text">
          <p className="seccio-etiqueta seccio-etiqueta--clara">La carta del camp</p>
          <h2 id="carta-titol" className="carta__titol">
            Cada mes, què és temporada i qui hem visitat
          </h2>
          <p className="carta__subtitol">Una carta curta, un cop al mes. Sense soroll.</p>
        </div>

        <form className="carta__form" onSubmit={handleSubmit}>
          <label htmlFor="carta-email" className="carta__label">El teu correu</label>
          <div className="carta__camps">
            <input
              id="carta-email"
              type="email"
              className="carta__input"
              placeholder="nom@correu.cat"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <button type="submit" className="carta__boto">Vull rebre-la</button>
          </div>
        </form>
      </div>
    </section>
  )
}
