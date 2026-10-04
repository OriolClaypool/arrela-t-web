import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import { getFamilia } from '../data/families'
import MapaSkeleton from './MapaSkeleton'

// Secció "El mapa" de la portada: el mapa a un costat i la llista numerada de
// visites a l'altre (a sota en mòbil). El mapa (i el GeoJSON de comarques) es
// carrega amb lazy i només quan la secció és a prop de la pantalla.

const MapaCatalunya = lazy(() => import('./MapaCatalunya'))

const visites = productors
  .filter((p) => p.publicat && p.numeroVisita != null && getFamilia(p.familia))
  .sort((a, b) => a.numeroVisita - b.numeroVisita)

/** true quan l'element s'acosta a la pantalla (una sola vegada) */
function useProper(marge = '500px') {
  const ref = useRef(null)
  // Sense IntersectionObserver (navegadors molt vells) el mapa es carrega directament
  const [proper, setProper] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProper(true)
          observer.disconnect()
        }
      },
      { rootMargin: marge }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [marge])

  return [ref, proper]
}

export default function MapaSeccio() {
  const refFade = useFadeIn()
  const [refMapa, mapaProper] = useProper()

  return (
    <section id="mapa" className="mapa-home" aria-labelledby="mapa-titol">
      <div ref={refFade} className="mapa-home__inner contenidor fade-in">
        <div ref={refMapa} className="mapa-home__mapa">
          {mapaProper ? (
            <Suspense fallback={<MapaSkeleton />}>
              <MapaCatalunya />
            </Suspense>
          ) : (
            <MapaSkeleton />
          )}
        </div>

        <div>
          <p className="seccio-etiqueta">El mapa</p>
          <h2 id="mapa-titol" className="seccio-titol">
            On hem estat, visita a visita
          </h2>
          <p className="seccio-intro">
            Cada punt és una explotació on hem entrat, hem escoltat i hem filmat. La línia segueix
            l&apos;ordre de les visites: el mapa s&apos;omple a mesura que avancem.
          </p>

          <ol className="mapa-llista" role="list">
            {visites.map((p) => {
              const familia = getFamilia(p.familia)
              return (
                <li key={p.slug}>
                  <Link to={`/productors/${p.slug}`} className="mapa-llista__item">
                    <span
                      className="mapa-llista__numero"
                      style={{ background: familia.colorPin, color: familia.colorSobre }}
                    >
                      {p.numeroVisita}
                    </span>
                    <span>
                      <span className="mapa-llista__nom">{p.nom}</span>
                      {p.comarca && <span className="mapa-llista__comarca">{p.comarca}</span>}
                    </span>
                    {p.categoria && (
                      <span className="mapa-llista__categoria" style={{ color: familia.colorText }}>
                        {p.categoria}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}

            <li className="mapa-llista__proxima">
              <span className="mapa-llista__mes" aria-hidden="true">+</span>
              <span>
                <span className="mapa-llista__nom">La pròxima visita</span>
                <span className="mapa-llista__comarca">Ens recomanes algú?</span>
              </span>
              <Link to="/contacte" className="mapa-llista__proposa">
                Proposa&apos;ns-el
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
