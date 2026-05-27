import { useParams, Link } from 'react-router-dom'
import productors from '../data/productors'
import Footer from './Footer'

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  )
}

function OrganicStrokes() {
  return (
    <svg className="organic-strokes" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="var(--terracotta)" strokeWidth="1.2" opacity="0.1">
        <path d="M-50 240 Q 150 155 350 205 Q 550 255 750 182 Q 910 145 1060 210"/>
        <path d="M-50 178 Q 205 95 405 148 Q 605 200 808 115 Q 960 68 1065 138"/>
        <path d="M-50 288 Q 105 248 308 272 Q 510 294 712 252 Q 862 220 1014 275"/>
        <path d="M0 118 Q 205 78 358 112 Q 512 145 664 88 Q 815 48 968 105"/>
        <path d="M55 308 Q 258 290 458 308 Q 658 328 808 298"/>
        <path d="M-22 198 Q 202 168 402 196 Q 602 225 785 178"/>
        <path d="M105 58 Q 308 28 508 55 Q 708 85 912 48"/>
      </g>
    </svg>
  )
}

export default function ProducerReportage() {
  const { slug } = useParams()
  const productor = productors.find((p) => p.slug === slug)

  if (!productor || !productor.publicat || !productor.reportatge) {
    return (
      <>
        <div className="report-topbar">
          <Link to="/" className="report-topbar__logo">Arrela't</Link>
          <Link to="/productors" className="report-topbar__back">← Tornar als productors</Link>
        </div>
        <div className="profile-not-found">
          <p className="profile-not-found__label">404</p>
          <h1>Reportatge no trobat</h1>
          <p>No hem trobat cap reportatge amb aquest identificador.</p>
          <Link to="/productors" className="profile-not-found__link">← Tots els productors</Link>
        </div>
        <Footer />
      </>
    )
  }

  const r = productor.reportatge
  const isVi = productor.categoria.toLowerCase().includes('vi')

  return (
    <>
      <div className="report-topbar">
        <Link to="/" className="report-topbar__logo">Arrela't</Link>
        <Link to="/productors" className="report-topbar__back">← Tornar als productors</Link>
      </div>

      <div className="report-hero">
        <OrganicStrokes />
        <div className="report-hero__gradient" aria-hidden="true" />
        <div className="report-hero__content">
          <span className="report-hero__pill">{r.subtitol || `Reportatge · ${productor.categoria}`}</span>
          <h1 className="report-hero__titol">{r.titol}</h1>
        </div>
      </div>

      <div className="report-metabar">
        <div className="report-metabar__inner">
          <div className="report-metabar__item">
            <span className="report-metabar__label">Productor</span>
            <span className="report-metabar__value">{productor.nom}</span>
          </div>
          <div className="report-metabar__item">
            <span className="report-metabar__label">Comarca</span>
            <span className="report-metabar__value">{productor.comarca}</span>
          </div>
          <div className="report-metabar__item">
            <span className="report-metabar__label">Visita</span>
            <span className="report-metabar__value">{r.dataVisita}</span>
          </div>
        </div>
      </div>

      <section className="report-intro">
        <div className="report-body-col">
          <p className="report-intro__text">{r.intro}</p>
        </div>
      </section>

      <section className="report-body">
        <div className="report-body-col">
          {r.cos.map((parag, i) => (
            <p key={i} className="report-body__p">{parag}</p>
          ))}
        </div>
      </section>

      <div className="report-pullquote">
        <div className="report-pullquote__inner">
          <svg className="report-pullquote__mark" viewBox="0 0 60 50" aria-hidden="true">
            <path d="M0 30 Q10 0 30 0 Q20 15 20 30 Q20 43 10 43 Q0 43 0 30Z" fill="var(--terracotta-pale)"/>
            <path d="M32 30 Q42 0 60 0 Q50 15 50 30 Q50 43 40 43 Q30 43 30 30Z" fill="var(--terracotta-pale)"/>
          </svg>
          <blockquote className="report-pullquote__text">{r.citacio.text}</blockquote>
          <p className="report-pullquote__autor">— {r.citacio.autor}</p>
        </div>
      </div>

      <section className="report-body report-body--final">
        <div className="report-body-col">
          {r.cosFinal.map((parag, i) => (
            <p key={i} className="report-body__p">{parag}</p>
          ))}
        </div>
      </section>

      {productor.productes.length > 0 && (
        <section className="report-productes">
          <div className="report-productes__inner">
            <h2 className="report-productes__title">
              {isVi ? 'Els seus vins' : 'Els seus productes'}
            </h2>
            <div className="report-productes__grid">
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

      <Link to="/professional" className="profile-pro-band">
        <p className="profile-pro-band__eyebrow">Ets botiga o restaurant?</p>
        <p className="profile-pro-band__cta">
          Veure preus i contacte comercial
          <IconArrow />
        </p>
      </Link>

      <section className="report-videos">
        <div className="report-videos__inner">
          <span className="profile-label">Les entrevistes</span>
          <div className="report-videos__grid">
            {r.videos.map((video, i) => (
              <div key={i} className="report-video-card">
                <div className="report-video-card__embed">
                  <span className="report-video-card__num">{video.numero}</span>
                </div>
                <p className="report-video-card__title">{video.titol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
