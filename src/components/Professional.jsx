import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function Professional() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

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
        </div>
      </div>
      <Footer />
    </>
  )
}
