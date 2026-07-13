import { useState, useEffect, useRef } from 'react'
import productors from '../data/productors'
import Footer from './Footer'
import Seo from './Seo'

const COMARQUES = [
  "Alt Camp", "Alt Empordà", "Alt Penedès", "Alt Urgell", "Alta Ribagorça",
  "Anoia", "Bages", "Baix Camp", "Baix Ebre", "Baix Empordà",
  "Baix Llobregat", "Baix Penedès", "Barcelonès", "Berguedà", "Cerdanya",
  "Conca de Barberà", "Garraf", "Garrigues", "Garrotxa", "Gironès",
  "Lluçanès", "Maresme", "Moianès", "Montsià", "Noguera", "Osona",
  "Pallars Jussà", "Pallars Sobirà", "Pla d'Urgell", "Pla de l'Estany",
  "Priorat", "Ribera d'Ebre", "Ripollès", "Segarra", "Segrià", "Selva",
  "Solsonès", "Tarragonès", "Terra Alta", "Urgell", "Val d'Aran",
  "Vallès Occidental", "Vallès Oriental",
]

function IconPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconTruck() {
  return (
    <svg width="14" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  )
}

function IconPackage() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function ContactModal({ productor, onClose }) {
  const [form, setForm] = useState({ nomNegoci: '', nomContacte: '', email: '', missatge: '' })
  const [sent, setSent] = useState(false)
  const backdropRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleBackdrop = (e) => { if (e.target === backdropRef.current) onClose() }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.nomNegoci && form.email) setSent(true)
  }

  return (
    <div className="pro-modal-backdrop" ref={backdropRef} onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label="Sol·licitar contacte">
      <div className="pro-modal">
        <button className="pro-modal__close" onClick={onClose} aria-label="Tancar">
          <IconX />
        </button>

        {sent ? (
          <div className="pro-modal__confirm">
            <p className="pro-modal__confirm-title">Gràcies, et contactarem</p>
            <p className="pro-modal__confirm-text">
              Hem rebut la teva sol·licitud per contactar amb <strong>{productor.nom}</strong>. Et posarem en contacte aviat.
            </p>
            <button className="pro-modal__done" onClick={onClose}>Tancar</button>
          </div>
        ) : (
          <>
            <p className="pro-modal__pre">Sol·licitar contacte amb</p>
            <h2 className="pro-modal__nom">{productor.nom}</h2>
            <p className="pro-modal__cat">{productor.categoria} · {productor.comarca}</p>

            <form className="pro-modal__form" onSubmit={handleSubmit}>
              <div className="pro-modal__field">
                <label className="pro-modal__label" htmlFor="pm-nom-negoci">Nom del negoci</label>
                <input
                  id="pm-nom-negoci"
                  className="pro-modal__input"
                  type="text"
                  value={form.nomNegoci}
                  onChange={(e) => setForm({ ...form, nomNegoci: e.target.value })}
                  required
                  placeholder="La teva botiga o restaurant"
                />
              </div>
              <div className="pro-modal__field">
                <label className="pro-modal__label" htmlFor="pm-nom-contacte">Nom de contacte</label>
                <input
                  id="pm-nom-contacte"
                  className="pro-modal__input"
                  type="text"
                  value={form.nomContacte}
                  onChange={(e) => setForm({ ...form, nomContacte: e.target.value })}
                  placeholder="El teu nom"
                />
              </div>
              <div className="pro-modal__field">
                <label className="pro-modal__label" htmlFor="pm-email">Correu electrònic</label>
                <input
                  id="pm-email"
                  className="pro-modal__input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="tu@negoci.cat"
                />
              </div>
              <div className="pro-modal__field">
                <label className="pro-modal__label" htmlFor="pm-missatge">Missatge</label>
                <textarea
                  id="pm-missatge"
                  className="pro-modal__textarea"
                  value={form.missatge}
                  onChange={(e) => setForm({ ...form, missatge: e.target.value })}
                  rows="3"
                  placeholder="Explica'ns el que necessites..."
                />
              </div>
              <button className="pro-modal__submit" type="submit">Enviar sol·licitud</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function ProCard({ p, onContact }) {
  return (
    <div className="pro-card">
      <div
        className="pro-card__swatch"
        style={{ background: p.galeria[0] || '#5a6b3f' }}
        aria-hidden="true"
      />
      <div className="pro-card__body">
        <div className="pro-card__top">
          <h3 className="pro-card__nom">{p.nom}</h3>
          <span className="pro-card__cat-pill">{p.categoria}</span>
        </div>
        <div className="pro-card__meta">
          <span className="pro-card__meta-item">
            <IconPin /> {p.comarca}
          </span>
          <span className="pro-card__meta-item">
            <IconTruck /> {p.comercial.zonesDistribucio.join(', ')}
          </span>
          <span className="pro-card__meta-item">
            <IconPackage /> {p.comercial.comandaMinima}
          </span>
        </div>
      </div>
      <div className="pro-card__action">
        <button className="pro-card__btn" onClick={onContact}>
          Sol·licitar contacte
        </button>
      </div>
    </div>
  )
}

export default function Professional() {
  const [comarca, setComarca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [contactModal, setContactModal] = useState(null)
  const [accessForm, setAccessForm] = useState({ nom: '', nomNegoci: '', email: '', comarca: '', missatge: '' })
  const [accessSent, setAccessSent] = useState(false)
  const accessRef = useRef(null)

  const tots = productors.filter((p) => p.publicat && p.comercial)
  const categories = [...new Set(tots.map((p) => p.categoria))].sort()

  const filtered = tots.filter((p) => {
    const okComarca =
      !comarca ||
      p.comercial.zonesDistribucio.includes(comarca) ||
      p.comercial.zonesDistribucio.includes('Tot Catalunya')
    const okCat = !categoria || p.categoria === categoria
    return okComarca && okCat
  })

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    document.getElementById('pro-results-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAccessSubmit = (e) => {
    e.preventDefault()
    if (accessForm.nomNegoci && accessForm.email) setAccessSent(true)
  }

  return (
    <div className="pro-page">
      <Seo
        title="Espai professional — Arrela't"
        description="Troba productors verificats per Arrela't que reparteixen a la teva zona. Preus, quantitats i contacte directe per a botigues i restaurants."
        path="/professional"
      />

      {/* Top bar */}
      <div className="pro-topbar">
        <div className="pro-topbar__left">
          <span className="pro-topbar__wordmark">Arrela't</span>
          <span className="pro-topbar__badge">PROFESSIONAL</span>
        </div>
        <div className="pro-topbar__right">
          <span className="pro-topbar__account">El meu compte</span>
          <span className="pro-topbar__verified">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            Botiga verificada
          </span>
        </div>
      </div>

      {/* Hero band */}
      <div className="pro-hero">
        <p className="pro-hero__label">Espai professional</p>
        <h1 className="pro-hero__title">Troba productors per a la teva botiga</h1>
        <p className="pro-hero__subtitle">
          Productors verificats per Arrela't que reparteixen a la teva zona. Preus, quantitats i contacte directe.
        </p>
      </div>

      {/* Filter bar */}
      <div className="pro-filterbar">
        <form className="pro-filterbar__form" onSubmit={handleFilterSubmit}>
          <div className="pro-filterbar__field">
            <label className="pro-filterbar__label" htmlFor="pf-comarca">On tens el negoci?</label>
            <div className="pro-filterbar__select-wrap">
              <select
                id="pf-comarca"
                className="pro-filterbar__select"
                value={comarca}
                onChange={(e) => setComarca(e.target.value)}
                aria-label="Comarca del negoci"
              >
                <option value="">Totes les comarques</option>
                {COMARQUES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pro-filterbar__field">
            <label className="pro-filterbar__label" htmlFor="pf-cat">Categoria</label>
            <div className="pro-filterbar__select-wrap">
              <select
                id="pf-cat"
                className="pro-filterbar__select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                aria-label="Categoria de producte"
              >
                <option value="">Totes les categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="pro-filterbar__btn" type="submit">Filtrar</button>
        </form>
      </div>

      {/* Results */}
      <div className="pro-results" id="pro-results-anchor">
        <p className="pro-results__count">
          {comarca
            ? `${filtered.length} ${filtered.length === 1 ? 'productor' : 'productors'} — reparteixen a: ${comarca}`
            : `${filtered.length} productors disponibles`}
        </p>

        {filtered.length === 0 ? (
          <p className="pro-results__empty">
            Encara no tenim productors que reparteixin a {comarca}.
          </p>
        ) : (
          <div className="pro-cards">
            {filtered.map((p) => (
              <ProCard key={p.slug} p={p} onContact={() => setContactModal(p)} />
            ))}
          </div>
        )}
      </div>

      {/* Access request band */}
      <div className="pro-access" ref={accessRef}>
        <div className="pro-access__inner">
          <div className="pro-access__text">
            <p className="pro-access__pre">Accés professional</p>
            <h2 className="pro-access__title">Encara no ets botiga verificada?</h2>
            <p className="pro-access__sub">
              Sol·licita l'accés professional i et verificarem en menys de 48 hores.
            </p>
          </div>

          {accessSent ? (
            <p className="pro-access__confirm">
              Gràcies! Revisarem la teva sol·licitud i et contactarem aviat.
            </p>
          ) : (
            <form className="pro-access__form" onSubmit={handleAccessSubmit}>
              <div className="pro-access__row">
                <input
                  className="pro-access__input"
                  type="text"
                  placeholder="El teu nom"
                  value={accessForm.nom}
                  onChange={(e) => setAccessForm({ ...accessForm, nom: e.target.value })}
                  aria-label="Nom"
                />
                <input
                  className="pro-access__input"
                  type="text"
                  placeholder="Nom del negoci"
                  value={accessForm.nomNegoci}
                  onChange={(e) => setAccessForm({ ...accessForm, nomNegoci: e.target.value })}
                  required
                  aria-label="Nom del negoci"
                />
              </div>
              <div className="pro-access__row">
                <input
                  className="pro-access__input"
                  type="email"
                  placeholder="Correu electrònic"
                  value={accessForm.email}
                  onChange={(e) => setAccessForm({ ...accessForm, email: e.target.value })}
                  required
                  aria-label="Correu electrònic"
                />
                <div className="pro-access__select-wrap">
                  <select
                    className="pro-access__select"
                    value={accessForm.comarca}
                    onChange={(e) => setAccessForm({ ...accessForm, comarca: e.target.value })}
                    aria-label="Comarca del negoci"
                  >
                    <option value="">Comarca del negoci</option>
                    {COMARQUES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea
                className="pro-access__textarea"
                placeholder="Explica'ns breument el teu negoci..."
                value={accessForm.missatge}
                onChange={(e) => setAccessForm({ ...accessForm, missatge: e.target.value })}
                rows="3"
                aria-label="Missatge"
              />
              <button className="pro-access__btn" type="submit">
                Sol·licitar accés professional
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />

      {contactModal && (
        <ContactModal productor={contactModal} onClose={() => setContactModal(null)} />
      )}
    </div>
  )
}
