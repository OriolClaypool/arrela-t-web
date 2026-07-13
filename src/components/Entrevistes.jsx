import { Link } from 'react-router-dom'
import productors from '../data/productors'
import Seo from './Seo'
import Footer from './Footer'

const MESOS = ['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre']

function parseDataVisita(str) {
  if (!str) return 0
  const [mes, any] = str.toLowerCase().split(' ')
  const m = MESOS.indexOf(mes)
  return parseInt(any || 0) * 12 + (m >= 0 ? m : 0)
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  )
}

export default function Entrevistes() {
  const amb = productors
    .filter((p) => p.publicat && p.reportatge)
    .sort((a, b) => parseDataVisita(b.reportatge.dataVisita) - parseDataVisita(a.reportatge.dataVisita))

  const [featured, ...resta] = amb

  return (
    <div className="entrevistes">
      <Seo
        title="Les entrevistes — Arrela't"
        description="Visitem els productors a casa seva. Aquestes són les seves històries."
        path="/entrevistes"
      />

      {/* Header */}
      <header className="entrevistes__header">
        <p className="entrevistes__label">Reportatges</p>
        <h1 className="entrevistes__title">Les entrevistes</h1>
        <p className="entrevistes__intro">
          Visitem els productors a casa seva. Aquestes són les seves històries.
        </p>
      </header>

      {/* Featured */}
      {featured && (
        <section className="entrevistes__featured-wrap">
          <Link to={`/entrevistes/${featured.slug}`} className="entrevistes__featured">
            <div
              className="entrevistes__featured-img"
              style={{ background: `linear-gradient(160deg, ${featured.galeria[0] || '#5a6b3f'} 0%, ${featured.galeria[2] || '#3a2e22'} 100%)` }}
              aria-hidden="true"
            >
              <div className="entrevistes__featured-overlay" />
            </div>
            <div className="entrevistes__featured-meta">
              <span className="entrevistes__featured-cat">
                Reportatge · {featured.categoria}
              </span>
              <p className="entrevistes__featured-titol">
                {featured.reportatge.titol}
              </p>
              <span className="entrevistes__featured-comarca">
                {featured.comarca}
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      {resta.length > 0 && (
        <section className="entrevistes__grid-wrap">
          <div className="entrevistes__grid">
            {resta.map((p) => (
              <Link key={p.slug} to={`/entrevistes/${p.slug}`} className="entrevistes__card">
                <div
                  className="entrevistes__card-img"
                  style={{ background: `linear-gradient(150deg, ${p.galeria[0] || '#5a6b3f'} 0%, ${p.galeria[2] || '#3a2e22'} 100%)` }}
                  aria-hidden="true"
                />
                <div className="entrevistes__card-body">
                  <p className="entrevistes__card-comarca">{p.comarca}</p>
                  <h2 className="entrevistes__card-titol">{p.reportatge.titol}</h2>
                  <p className="entrevistes__card-intro">{p.reportatge.intro}</p>
                  <p className="entrevistes__card-data">{p.reportatge.dataVisita}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA footer band */}
      <section className="entrevistes__cta">
        <p className="entrevistes__cta-text">
          Coneixes algun productor que hauríem de visitar?
        </p>
        <Link to="/contacte" className="entrevistes__cta-btn">
          Proposa'ns un productor <IconArrowRight />
        </Link>
      </section>

      <Footer />
    </div>
  )
}
