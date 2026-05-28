import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import productors from '../data/productors'

const MESOS = ['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre']

function parseDataVisita(str) {
  if (!str) return 0
  const [mes, any] = str.toLowerCase().split(' ')
  const m = MESOS.indexOf(mes)
  return parseInt(any || 0) * 12 + (m >= 0 ? m : 0)
}

function Card({ productor }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const r = productor.reportatge
  return (
    <Link
      ref={ref}
      to={`/entrevistes/${productor.slug}`}
      className="ultimes-card fade-in"
    >
      <div
        className="ultimes-card__img"
        style={{ background: `linear-gradient(150deg, ${productor.galeria[0] || '#5a6b3f'} 0%, ${productor.galeria[2] || '#3a2e22'} 100%)` }}
        aria-hidden="true"
      />
      <div className="ultimes-card__body">
        <p className="ultimes-card__comarca">{productor.comarca}</p>
        <h3 className="ultimes-card__titol">{r.titol}</h3>
        <p className="ultimes-card__data">{r.dataVisita}</p>
      </div>
    </Link>
  )
}

export default function UltimesEntrevistes() {
  const sorted = productors
    .filter((p) => p.publicat && p.reportatge)
    .sort((a, b) => parseDataVisita(b.reportatge.dataVisita) - parseDataVisita(a.reportatge.dataVisita))
    .slice(0, 3)

  return (
    <section className="ultimes-entrevistes">
      <div className="ultimes-entrevistes__inner">
        <div className="ultimes-entrevistes__header">
          <p className="ultimes-entrevistes__label">Reportatges</p>
          <h2 className="ultimes-entrevistes__title">Últimes entrevistes</h2>
        </div>
        <div className="ultimes-entrevistes__grid">
          {sorted.map((p) => <Card key={p.slug} productor={p} />)}
        </div>
        <div className="ultimes-entrevistes__more">
          <Link to="/entrevistes" className="ultimes-entrevistes__more-btn">
            Veure totes les entrevistes
          </Link>
        </div>
      </div>
    </section>
  )
}
