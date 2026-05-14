import { useState } from 'react'
import useFadeIn from '../hooks/useFadeIn'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const ref = useFadeIn()

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div ref={ref} className="newsletter__inner fade-in">
        <h2 className="newsletter__title">Rep les nostres històries</h2>
        <p className="newsletter__subtitle">
          Una newsletter sobre productors catalans, territori i producte de proximitat.
        </p>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <label htmlFor="nl-email" className="sr-only">Correu electrònic</label>
          <input
            id="nl-email"
            type="email"
            className="newsletter__input"
            placeholder="El teu correu electrònic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <button type="submit" className="newsletter__btn">Subscriure'm</button>
        </form>
      </div>
    </section>
  )
}
