import { useParams, Link } from 'react-router-dom'
import productors from '../data/productors'
import Seo from './Seo'
import Footer from './Footer'

function IconMapPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 22c4-4 6-8 6-12 0-4 3-8 8-8 0 6-2 10-6 14"/>
      <path d="M2 22c2-2 4-4 6-6"/>
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function IconFlask() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9 3h6M9 3v7l-5 9a2 2 0 001.8 2.8h12.4A2 2 0 0020 19L15 10V3"/>
      <line x1="9.5" y1="14" x2="14.5" y2="14"/>
    </svg>
  )
}

function IconWorld() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 8l10 6 10-6"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 12.84a19.79 19.79 0 01-3.07-8.67A2 2 0 013.92 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  )
}

function IconBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  )
}

function OrganicStrokes() {
  return (
    <svg className="organic-strokes" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="var(--terracotta)" strokeWidth="1" opacity="0.13">
        <path d="M-50 200 Q 150 130 350 175 Q 550 220 750 155 Q 900 110 1050 180"/>
        <path d="M-50 155 Q 200 75 400 125 Q 600 175 800 95 Q 960 55 1060 115"/>
        <path d="M-50 240 Q 100 200 310 225 Q 510 248 710 205 Q 860 175 1010 230"/>
        <path d="M0 95 Q 210 55 360 88 Q 510 122 660 68 Q 810 28 960 82"/>
        <path d="M60 260 Q 260 242 460 258 Q 658 272 808 244"/>
        <path d="M-20 178 Q 185 148 385 170 Q 588 192 782 148"/>
      </g>
    </svg>
  )
}

export default function ProducerProfile() {
  const { slug } = useParams()
  const productor = productors.find((p) => p.slug === slug)

  if (!productor || !productor.publicat) {
    return (
      <div className="profile-not-found">
        <Seo
          title="Productor no trobat — Arrela't"
          description="No hem trobat cap productor amb aquest identificador."
          noindex
        />
        <p className="profile-not-found__label">404</p>
        <h1>Productor no trobat</h1>
        <p>No hem trobat cap productor amb aquest identificador.</p>
        <Link to="/productors" className="profile-not-found__link">← Tots els productors</Link>
      </div>
    )
  }

  const { contacte = {}, reportatge } = productor

  return (
    <>
      <Seo
        title={`${productor.nom} — ${productor.categoria} · Arrela't`}
        description={productor.descripcioCurta}
        path={`/productors/${productor.slug}`}
      />
      <div className="profile-topbar">
        <Link to="/productors" className="profile-topbar__back">
          <IconBack />
          Tots els productors
        </Link>
      </div>

      <div className="profile-hero">
        <OrganicStrokes />
        <div className="profile-hero__gradient" aria-hidden="true" />
        <div className="profile-hero__content">
          <span className="profile-hero__verified">Productor verificat per Arrela't</span>
          <h1 className="profile-hero__nom">{productor.nom}</h1>
          <p className="profile-hero__meta">
            {productor.categoria}
            {productor.comarca && <> · {productor.comarca}</>}
          </p>
        </div>
      </div>

      <div className="profile-infobar">
        <div className="profile-infobar__inner">
          <div className="profile-infobar__item">
            <span className="profile-infobar__icon"><IconMapPin /></span>
            <span className="profile-infobar__label">Comarca</span>
            <span className="profile-infobar__value">{productor.comarca}</span>
          </div>
          <div className="profile-infobar__item">
            <span className="profile-infobar__icon"><IconLeaf /></span>
            <span className="profile-infobar__label">Mètode</span>
            <span className="profile-infobar__value">{productor.metode}</span>
          </div>
          <div className="profile-infobar__item">
            <span className="profile-infobar__icon"><IconCalendar /></span>
            <span className="profile-infobar__label">Inici</span>
            <span className="profile-infobar__value">{productor.anyInici}</span>
          </div>
          <div className="profile-infobar__item">
            <span className="profile-infobar__icon"><IconFlask /></span>
            <span className="profile-infobar__label">Producció</span>
            <span className="profile-infobar__value">{productor.produccio}</span>
          </div>
        </div>
      </div>

      <section className="profile-sobre">
        <div className="profile-sobre__inner">
          <h2 className="profile-label">Sobre el projecte</h2>
          <p className="profile-sobre__curta">{productor.descripcioCurta}</p>
          <p className="profile-sobre__llarga">{productor.descripcioLlarga}</p>
        </div>
      </section>

      {productor.galeria.length > 0 && (
        <section className="profile-galeria">
          <div className="profile-galeria__inner">
            <h2 className="profile-label">Galeria</h2>
            <div className="profile-galeria__grid">
              <div className="profile-galeria__large" style={{ background: productor.galeria[0] }} />
              <div className="profile-galeria__smalls">
                {productor.galeria.slice(1, 5).map((color, i) => (
                  <div key={i} className="profile-galeria__small" style={{ background: color }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {productor.productes.length > 0 && (
        <section className="profile-productes">
          <div className="profile-productes__inner">
            <h2 className="profile-label">Els seus productes</h2>
            <div className="profile-productes__grid">
              {productor.productes.map((p, i) => (
                <div key={i} className="profile-producte-card">
                  <div className="profile-producte-card__color" style={{ background: p.colorPlaceholder }} />
                  <p className="profile-producte-card__nom">{p.nom}</p>
                  <p className="profile-producte-card__detall">{p.detall}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="profile-ubicacio">
        <div className="profile-ubicacio__inner">
          <div className="profile-ubicacio__left">
            <span className="profile-label">Ubicació</span>
            <p className="profile-ubicacio__text">{productor.ubicacio}</p>
            <svg className="profile-ubicacio__map" viewBox="0 0 220 130" aria-hidden="true">
              <rect width="220" height="130" fill="var(--paper-warm)" rx="4"/>
              <path d="M20 90 Q 55 45 100 65 Q 145 85 185 48" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" opacity="0.4"/>
              <path d="M20 105 Q 70 75 120 88 Q 160 98 200 72" fill="none" stroke="var(--terracotta)" strokeWidth="1" opacity="0.2"/>
              <circle cx="105" cy="67" r="6" fill="var(--terracotta)" opacity="0.7"/>
              <circle cx="105" cy="67" r="12" fill="var(--terracotta)" opacity="0.12"/>
            </svg>
          </div>
          <div className="profile-ubicacio__right">
            <span className="profile-label">Contacte</span>
            <div className="profile-contacte">
              {contacte.web && (
                <a href={`https://${contacte.web}`} target="_blank" rel="noopener noreferrer" className="profile-contacte__item">
                  <IconWorld />
                  {contacte.web}
                </a>
              )}
              {contacte.email && (
                <a href={`mailto:${contacte.email}`} className="profile-contacte__item">
                  <IconMail />
                  {contacte.email}
                </a>
              )}
              {contacte.instagram && (
                <a
                  href={`https://instagram.com/${contacte.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-contacte__item"
                >
                  <IconInstagram />
                  {contacte.instagram}
                </a>
              )}
              {contacte.telefon && (
                <span className="profile-contacte__item profile-contacte__item--nolink">
                  <IconPhone />
                  {contacte.telefon}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {reportatge && (
        <Link to={`/entrevistes/${productor.slug}`} className="profile-reportatge-band">
          <p className="profile-reportatge-band__eyebrow">
            Vam visitar-los el {reportatge.dataVisita}
          </p>
          <p className="profile-reportatge-band__title">{reportatge.titol}</p>
          <span className="profile-reportatge-band__cta">
            Llegir el reportatge complet
            <IconArrow />
          </span>
        </Link>
      )}

      <Link to="/professional" className="profile-pro-band">
        <p className="profile-pro-band__eyebrow">Ets botiga o restaurant?</p>
        <p className="profile-pro-band__cta">
          Veure preus i contacte comercial
          <IconArrow />
        </p>
      </Link>

      <Footer />
    </>
  )
}
