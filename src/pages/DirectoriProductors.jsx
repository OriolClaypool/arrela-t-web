import { lazy, Suspense, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Footer from '../components/Footer'
import CapcaleraPagina from '../components/CapcaleraPagina'
import FiltreFamilies from '../components/FiltreFamilies'
import VisitaCard from '../components/VisitaCard'
import MapaSkeleton from '../components/MapaSkeleton'
import Fletxa from '../components/marca/Fletxa'
import Onada from '../components/marca/Onada'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import families, { getFamilia } from '../data/families'

// /productors — "El mapa": el mapa de Catalunya i, a sota, les visites. Es pot filtrar
// per família (xips; es llegeix i s'escriu a ?familia=, que és on porta el destacat de
// "Temporada" de la portada) i per comarca (clic al mapa o selector).

const MapaCatalunya = lazy(() => import('../components/MapaCatalunya'))

const visites = productors
  .filter((p) => p.publicat && getFamilia(p.familia))
  .sort((a, b) => (a.numeroVisita ?? 0) - (b.numeroVisita ?? 0))

// Només les famílies que tenen alguna visita publicada
const familiesAmbVisites = families.filter((f) => visites.some((p) => p.familia === f.id))

export default function DirectoriProductors() {
  const [params, setParams] = useSearchParams()
  const [comarca, setComarca] = useState(null)
  const refGraella = useRef(null)
  const refFiltres = useFadeIn()

  const idFamilia = params.get('familia')
  const familia = familiesAmbVisites.some((f) => f.id === idFamilia) ? getFamilia(idFamilia) : null

  const canviaFamilia = (id) => {
    const seguents = new URLSearchParams(params)
    if (id) seguents.set('familia', id)
    else seguents.delete('familia')
    setParams(seguents, { replace: true })
  }

  const canviaComarca = (nom) => {
    setComarca(nom)
    if (nom && refGraella.current) {
      const reduit = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      setTimeout(() => {
        refGraella.current?.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' })
      }, 100)
    }
  }

  const treuFiltres = () => {
    setComarca(null)
    canviaFamilia(null)
  }

  const filtrades = visites.filter(
    (p) => (!familia || p.familia === familia.id) && (!comarca || p.comarca === comarca)
  )
  const hiHaFiltres = Boolean(familia || comarca)

  const criteris = [familia && `família ${familia.nom}`, comarca].filter(Boolean).join(' · ')
  const recompte = `${filtrades.length} ${filtrades.length === 1 ? 'productor visitat' : 'productors visitats'}`

  return (
    <>
      <Seo
        title="El mapa dels productors — Arrela't"
        description="On hem estat, visita a visita: el mapa dels productors que hem visitat, filtrables per família de producte i per comarca, amb la seva història i els vídeos."
        path="/productors"
      />

      <main className="portada">
        <CapcaleraPagina
          id="mapa-pagina-titol"
          etiqueta="El mapa"
          titol="On hem estat, visita a visita"
          intro="Cada punt és una explotació on hem entrat, hem escoltat i hem filmat. Filtra per família o per comarca per trobar el que busques."
          fons="#F5F0E4"
        />

        <section className="pagina-cos" aria-label="Filtres i mapa">
          <div ref={refFiltres} className="pagina-cos__inner contenidor fade-in">
            <FiltreFamilies
              families={familiesAmbVisites}
              activa={familia ? familia.id : null}
              onCanvi={canviaFamilia}
            />
            <div className="directori-mapa">
              <Suspense fallback={<MapaSkeleton />}>
                <MapaCatalunya onSelect={canviaComarca} selected={comarca} />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="pagina-cos pagina-cos--fosc" aria-label="Visites">
          {/* L'ona porta el color de la secció del mapa (--lli) */}
          <Onada color="#F5F0E4" />
          <div ref={refGraella} className="pagina-cos__inner contenidor">
            <div className="directori-resultats">
              <p className="directori-resultats__titol" role="status">
                {recompte}
                {criteris && <span className="directori-resultats__criteris"> — {criteris}</span>}
              </p>
              {hiHaFiltres && (
                <button type="button" className="btn btn--contorn btn--petit" onClick={treuFiltres}>
                  Treu els filtres
                </button>
              )}
            </div>

            {filtrades.length > 0 ? (
              <div className="graella-visites">
                {filtrades.map((p) => (
                  <VisitaCard key={p.slug} productor={p} />
                ))}
              </div>
            ) : (
              <div className="buit">
                <p className="buit__titol">Encara no hem visitat cap productor amb aquests filtres.</p>
                <p className="buit__text">
                  Treu algun filtre per veure les altres visites, o digue&apos;ns qui hauríem d&apos;anar a veure.
                </p>
                <div className="buit__botons">
                  <button type="button" className="btn btn--bosc btn--petit" onClick={treuFiltres}>
                    Treu els filtres
                  </button>
                  <Link to="/contacte" className="enllac-fletxa">
                    Ens recomanes algú?
                    <Fletxa />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
