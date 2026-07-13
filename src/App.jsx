import { lazy, Suspense } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Seo from './components/Seo'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollNarrative from './components/ScrollNarrative'
import UltimesEntrevistes from './components/UltimesEntrevistes'
import MapaSkeleton from './components/MapaSkeleton'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const MapaCatalunya = lazy(() => import('./components/MapaCatalunya'))
const DirectoriProductors = lazy(() => import('./pages/DirectoriProductors'))
const ProducerProfile = lazy(() => import('./components/ProducerProfile'))
const ProducerReportage = lazy(() => import('./components/ProducerReportage'))
const QuiSom = lazy(() => import('./pages/QuiSom'))
const Agenda = lazy(() => import('./pages/Agenda'))
const Contacte = lazy(() => import('./pages/Contacte'))
const Professional = lazy(() => import('./components/Professional'))
const Entrevistes = lazy(() => import('./components/Entrevistes'))
const NotFound = lazy(() => import('./pages/NotFound'))

function MapaHome() {
  return (
    <section className="mapa-seccio">
      <div className="mapa-seccio__inner">
        <Suspense fallback={<MapaSkeleton />}>
          <MapaCatalunya onSelect={() => {}} selected={null} />
        </Suspense>
      </div>
    </section>
  )
}

function ProTeaser() {
  return (
    <section className="pro-teaser">
      <div className="pro-teaser__inner">
        <div className="pro-teaser__text">
          <p className="pro-teaser__label">Ets botiga o restaurant?</p>
          <h2 className="pro-teaser__title">Connecta amb els productors</h2>
          <p className="pro-teaser__body">
            Accedeix a preus, quantitats i contacte directe amb productors verificats per Arrela't.
          </p>
        </div>
        <div className="pro-teaser__cta">
          <Link to="/professional" className="pro-teaser__btn">
            Espai professional
          </Link>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Seo
        title="Arrela't — Sector primari català"
        description="Posem en valor el sector primari català. Visitem productors, expliquem les seves històries i connectem el camp amb la taula."
        path="/"
      />
      <Hero />
      <ScrollNarrative />
      <UltimesEntrevistes />
      <MapaHome />
      <ProTeaser />
      <Newsletter />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productors" element={<DirectoriProductors />} />
          <Route path="/productors/:slug" element={<ProducerProfile />} />
          <Route path="/entrevistes" element={<Entrevistes />} />
          <Route path="/entrevistes/:slug" element={<ProducerReportage />} />
          <Route path="/qui-som" element={<QuiSom />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/contacte" element={<Contacte />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
