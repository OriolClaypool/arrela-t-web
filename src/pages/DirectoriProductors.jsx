import { useState, useRef, lazy, Suspense } from 'react'
import Seo from '../components/Seo'
import ProductorGrid from '../components/ProductorGrid'
import MapaSkeleton from '../components/MapaSkeleton'
import Footer from '../components/Footer'

const MapaCatalunya = lazy(() => import('../components/MapaCatalunya'))

export default function DirectoriProductors() {
  const [comarcaSeleccionada, setComarcaSeleccionada] = useState(null)
  const gridRef = useRef(null)

  const handleSelect = (comarca) => {
    setComarcaSeleccionada(comarca)
    if (comarca && gridRef.current) {
      setTimeout(() => {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <>
      <Seo
        title="Els productors — Arrela't"
        description="El directori de productors verificats per Arrela't: pagesos, formatgers i cellers d'arreu de Catalunya visitats i validats en persona."
        path="/productors"
      />
      <div className="directori">
        <div className="directori__header">
          <h1 className="directori__title">Els productors</h1>
          <p className="directori__subtitle">
            Tots els productors han estat visitats i validats personalment per l'equip d'Arrela't.
          </p>
        </div>

        <div className="directori__body">
          <section className="mapa-seccio" style={{ padding: '0 0 3rem', background: 'transparent' }}>
            <div className="mapa-seccio__inner">
              <h2 className="mapa-seccio__title">Descobreix per comarca</h2>
              <p className="mapa-seccio__subtitle">
                Selecciona una comarca del mapa per filtrar els productors d'aquella zona.
              </p>
              <Suspense fallback={<MapaSkeleton />}>
                <MapaCatalunya onSelect={handleSelect} selected={comarcaSeleccionada} />
              </Suspense>
              {comarcaSeleccionada && (
                <p style={{ textAlign: 'center', color: 'var(--terracotta)', fontWeight: 500, marginBottom: '1rem' }}>
                  Mostrant productors de: {comarcaSeleccionada}
                  {' '}
                  <button
                    onClick={() => setComarcaSeleccionada(null)}
                    style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
                  >
                    Veure tots
                  </button>
                </p>
              )}
            </div>
          </section>

          <div ref={gridRef}>
            <ProductorGrid comarcaFilter={comarcaSeleccionada} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
