import { useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Footer from '../components/Footer'
import NotFound from './NotFound'
import VisitaHero from '../components/visita/VisitaHero'
import VisitaFitxa from '../components/visita/VisitaFitxa'
import CalendariFeines from '../components/CalendariFeines'
import ProcesPassos from '../components/ProcesPassos'
import VisitaReportatge from '../components/visita/VisitaReportatge'
import VisitaVideos from '../components/visita/VisitaVideos'
import VisitaProductes from '../components/visita/VisitaProductes'
import VisitaTrobar from '../components/visita/VisitaTrobar'
import VisitaSegell from '../components/visita/VisitaSegell'
import VisitaPro from '../components/visita/VisitaPro'
import productors from '../data/productors'
import { getFamilia } from '../data/families'
import { getCalendari } from '../data/calendaris'
import { paletaVisita } from '../data/visitaPaleta'
import { retalla } from '../utils/format'

// "La visita": la pàgina única de cada productor, a /productors/:slug (fusiona l'antic
// perfil i el reportatge). Tota la pàgina es pinta amb el color de la família del
// productor (families.js): les variables --familia-* de la pàgina porten els colors a
// tots els components, així que el mateix component serveix per a vi, horta, formatge
// i qualsevol família futura. Referència: design/maquetes/visita.html.

export default function Visita() {
  const { slug } = useParams()
  const productor = productors.find((p) => p.slug === slug)
  const familia = productor ? getFamilia(productor.familia) : null

  if (!productor || !productor.publicat || !familia) return <NotFound />

  const reportatge = productor.reportatge
  const paleta = paletaVisita(familia)
  const estil = {
    '--familia': familia.color,
    '--familia-text': familia.colorText,
    '--familia-sobre': familia.colorSobre,
    '--familia-accent': paleta.accent,
    '--familia-secundari': paleta.secundari,
    '--familia-enllac': paleta.enllac,
    '--familia-panell': paleta.panell,
  }

  // L'ona del peu de l'hero porta el color de la secció que ve a continuació
  const teFitxa = (productor.fitxa ?? []).length > 0
  const fonsSeguent = teFitxa || !getCalendari(productor) ? '#F5F0E4' : '#EDE5D2'

  const titolSeo = reportatge?.titol
    ? `${reportatge.titol} — ${productor.nom} · Arrela't`
    : `${productor.nom} — Arrela't`
  const descripcioSeo = retalla(reportatge?.intro || productor.descripcioCurta || productor.descripcio)

  return (
    <>
      <Seo title={titolSeo} description={descripcioSeo} path={`/productors/${productor.slug}`} />

      <main className="visita-pagina" style={estil}>
        <VisitaHero productor={productor} familia={familia} fonsSeguent={fonsSeguent} />
        {teFitxa && <VisitaFitxa productor={productor} familia={familia} />}
        <CalendariFeines productor={productor} />
        <ProcesPassos familia={familia} />
        <VisitaReportatge productor={productor} />
        <VisitaVideos productor={productor} familia={familia} />
        <VisitaProductes productor={productor} familia={familia} />
        <VisitaTrobar productor={productor} familia={familia} />
        <VisitaSegell productor={productor} />
        <VisitaPro productor={productor} />
      </main>
      <Footer />
    </>
  )
}
