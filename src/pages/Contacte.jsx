import { useState } from 'react'
import Footer from '../components/Footer'

const IconaInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const IconaYoutube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
)

export default function Contacte() {
  const [form, setForm] = useState({ nom: '', email: '', missatge: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm({ nom: '', email: '', missatge: '' })
  }

  return (
    <div className="contacte">
      <div className="contacte__inner">
        <h1>Contacte</h1>
        <p className="contacte__intro">
          Ets productor o productora i vols que et visitem? Treballes en un projecte
          relacionat amb el sector primari i t'interessa col·laborar? Escriu-nos.
        </p>

        <form className="contacte__form" onSubmit={handleSubmit} noValidate>
          <div className="contacte__field">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="contacte__field">
            <label htmlFor="email">Correu electrònic</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="contacte__field">
            <label htmlFor="missatge">Missatge</label>
            <textarea
              id="missatge"
              name="missatge"
              rows="6"
              value={form.missatge}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="contacte__submit">Enviar missatge</button>
        </form>

        <div className="contacte__social">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram d'Arrela't">
            <IconaInstagram />
            @arrelat.cat a Instagram
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube d'Arrela't">
            <IconaYoutube />
            Arrela't a YouTube
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
