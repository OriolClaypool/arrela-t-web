import Seo from '../components/Seo'
import Footer from '../components/Footer'
import CapcaleraPagina from '../components/CapcaleraPagina'
import VisitaCard from '../components/VisitaCard'
import VisitaProxima from '../components/VisitaProxima'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import { getFamilia } from '../data/families'

// /entrevistes — "Les visites": totes les visites publicades, de la més recent a la
// primera (numeroVisita descendent), i una targeta final que convida a proposar-ne una.

const publicades = productors.filter((p) => p.publicat && getFamilia(p.familia))

const visites = publicades
  .filter((p) => p.etapa !== 'primera')
  .sort((a, b) => (b.numeroVisita ?? 0) - (a.numeroVisita ?? 0))

// Primera etapa (2024): les visites recuperades de l'antic web, en el mateix ordre
// en què hi sortien
const primeraEtapa = publicades.filter((p) => p.etapa === 'primera')

export default function Entrevistes() {
  const ref = useFadeIn(0.02)

  return (
    <>
      <Seo
        title="Les visites — Arrela't"
        description="Cada visita, una història del territori: visitem els productors a casa seva, els escoltem i ho filmem. Aquestes són les visites d'Arrela't, de la més recent a la primera."
        path="/entrevistes"
      />

      <main className="portada">
        <CapcaleraPagina
          id="visites-pagina-titol"
          etiqueta="Les visites"
          titol="Cada visita, una història del territori"
          intro="Dues persones, una càmera i un dia a casa de cada productor. Aquestes són les visites, de la més recent a la primera."
        />

        <section className="pagina-cos pagina-cos--fosc" aria-label="Totes les visites">
          <div ref={ref} className="pagina-cos__inner contenidor fade-in">
            <div className="graella-visites">
              {visites.map((p) => (
                <VisitaCard key={p.slug} productor={p} />
              ))}
              <VisitaProxima />
            </div>
          </div>
        </section>

        {primeraEtapa.length > 0 && (
          <section className="pagina-cos" aria-labelledby="primera-etapa-titol">
            <div className="pagina-cos__inner contenidor">
              <p className="seccio-etiqueta">Primera etapa · 2024</p>
              <h2 id="primera-etapa-titol" className="seccio-titol">Les primeres visites</h2>
              <p className="seccio-intro seccio-intro--ample">
                Abans d&apos;aquest web vam visitar aquests productors i en vam publicar la visita. Estem
                recuperant els reportatges per tornar-los a publicar amb el format nou.
              </p>
              <div className="graella-visites graella-visites--primera">
                {primeraEtapa.map((p) => (
                  <VisitaCard key={p.slug} productor={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
