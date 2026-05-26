import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import productors from '../data/productors'

const todesLesZones = [...new Set(
  productors
    .filter((p) => p.publicat && p.zonesDistribucio)
    .flatMap((p) => p.zonesDistribucio)
)].sort()

export default function Professional() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [zona, setZona] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  const productorsPerZona = zona
    ? productors.filter((p) => p.publicat && p.zonesDistribucio?.includes(zona))
    : []

  return (
    <>
      <div className="professional">
        <div className="professional__inner">
          <h1 className="professional__title">Espai professional</h1>
          <p className="professional__text">
            Aviat, les botigues i restaurants podran accedir a informació comercial dels nostres productors: preus, quantitats, distribució i contacte directe.
          </p>

          {sent ? (
            <p className="professional__confirm">
              T'avisarem quan estigui disponible. Gràcies!
            </p>
          ) : (
            <form className="professional__form" onSubmit={handleSubmit}>
              <input
                className="professional__input"
                type="email"
                placeholder="El teu correu electrònic"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Correu electrònic"
              />
              <button className="professional__btn" type="submit">
                Avisa'm quan estigui disponible
              </button>
            </form>
          )}

          <p className="professional__note">
            Si ets botiga o restaurant i vols contactar amb algun productor, escriu-nos a{' '}
            <Link to="/contacte">contacte</Link>.
          </p>

          <div className="pro-filtre">
            <h2 className="pro-filtre__title">On tens el teu negoci?</h2>
            <p className="pro-filtre__subtitle">
              Comprova quins productors reparteixen a la teva zona.
            </p>
            <select
              className="pro-filtre__select"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              aria-label="Selecciona la teva comarca"
            >
              <option value="">Selecciona una comarca</option>
              {todesLesZones.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>

            {zona && (
              productorsPerZona.length === 0 ? (
                <p className="pro-filtre__empty">
                  Encara no tenim productors que reparteixin a {zona}.
                </p>
              ) : (
                <>
                  <div className="pro-filtre__results">
                    {productorsPerZona.map((p) => (
                      <div key={p.slug} className="pro-filtre__result-item">
                        <span className="pro-filtre__result-nom">{p.nom}</span>
                        <span className="pro-filtre__result-cat">{p.categoria}</span>
                      </div>
                    ))}
                  </div>
                  <p className="pro-filtre__nota">
                    Quan l'espai professional estigui actiu, podràs veure preus, quantitats i contactar directament amb els productors que reparteixen a la teva zona.
                  </p>
                </>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
