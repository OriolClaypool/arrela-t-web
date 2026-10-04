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

const visites = productors
  .filter((p) => p.publicat && getFamilia(p.familia))
  .sort((a, b) => (b.numeroVisita ?? 0) - (a.numeroVisita ?? 0))

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
      </main>

      <Footer />
    </>
  )
}
