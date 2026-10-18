import { useState } from 'react'
import useFadeIn from '../hooks/useFadeIn'
import Onada from './marca/Onada'
import IlustracioSobre from './illustracions/IlustracioSobre'
import { FORMULARIS_ACTIUS, INSTAGRAM_URL, enviaFormulari } from '../utils/enviament'

// "La carta del camp" (maqueta inici.html): ona de separació sobre la banda verda
// de dalt, sobre il·lustrat i formulari de correu.
//
// L'alta arriba a l'equip pel mateix Formspree que els altres formularis
// (src/utils/enviament.js). Sense Formspree configurat, no es demana el correu: es diu
// que la carta arriba aviat i s'enllaça Instagram.

export default function Newsletter() {
  const [email, setEmail] = useState('')
  // inici | enviant | fet | error
  const [estat, setEstat] = useState('inici')
  const ref = useFadeIn()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (estat === 'enviant') return
    setEstat('enviant')
    const resultat = await enviaFormulari({
      email,
      tipus: 'La carta del camp',
      _subject: 'Alta a La carta del camp',
    })
    if (resultat.ok) {
      setEmail('')
      setEstat('fet')
    } else {
      setEstat('error')
    }
  }

  let accio
  if (!FORMULARIS_ACTIUS) {
    accio = (
      <div className="carta__form">
        <p className="carta__avis">
          Estem preparant la primera carta. Mentrestant, expliquem les visites noves a Instagram.
        </p>
        <a
          href={INSTAGRAM_URL}
          className="carta__boto carta__boto--enllac"
          target="_blank"
          rel="noopener noreferrer"
        >
          Segueix-nos a Instagram
          <span className="sr-only">(s&apos;obre en una pestanya nova)</span>
        </a>
      </div>
    )
  } else if (estat === 'fet') {
    accio = (
      <div className="carta__form">
        <p className="carta__avis" role="status">
          Fet. T&apos;escriurem quan surti la propera carta.
        </p>
      </div>
    )
  } else {
    accio = (
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
          <button
            type="submit"
            className="carta__boto"
            disabled={estat === 'enviant'}
            aria-busy={estat === 'enviant'}
          >
            {estat === 'enviant' ? 'Un moment...' : 'Vull rebre-la'}
          </button>
        </div>
        {estat === 'error' && (
          <p className="carta__error" role="alert">
            No t&apos;hem pogut apuntar. Torna-ho a provar d&apos;aquí a una estona.
          </p>
        )}
        <p className="carta__privacitat">
          Només farem servir el teu correu per enviar-te la carta. Per donar-te de baixa,
          respon qualsevol carta.
        </p>
      </form>
    )
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

        {accio}
      </div>
    </section>
  )
}
