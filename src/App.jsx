import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Seo from './components/Seo'
import Nav from './components/Nav'
import Hero from './components/Hero'
import XifresFamilies from './components/XifresFamilies'
import LesVisites from './components/LesVisites'
import Temporada from './components/Temporada'
import MapaSeccio from './components/MapaSeccio'
import SegellSeccio from './components/SegellSeccio'
import ProfessionalBanda from './components/ProfessionalBanda'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const DirectoriProductors = lazy(() => import('./pages/DirectoriProductors'))
const Visita = lazy(() => import('./pages/Visita'))
const QuiSom = lazy(() => import('./pages/QuiSom'))
const Agenda = lazy(() => import('./pages/Agenda'))
const Contacte = lazy(() => import('./pages/Contacte'))
const Professional = lazy(() => import('./pages/Professional'))
const Entrevistes = lazy(() => import('./pages/Entrevistes'))
const Segell = lazy(() => import('./pages/Segell'))
const NotFound = lazy(() => import('./pages/NotFound'))

// L'antic reportatge (/entrevistes/:slug) ara viu dins la visita (/productors/:slug)
function RedirigeixAVisita() {
  const { slug } = useParams()
  return <Navigate to={`/productors/${slug}`} replace />
}

function Home() {
  return (
    <>
      <Seo
        title="Arrela't — Sector primari català"
        description="Posem en valor el sector primari català. Visitem productors, expliquem les seves històries i connectem el camp amb la taula."
        path="/"
      />
      <main className="portada">
        <Hero />
        <XifresFamilies />
        <LesVisites />
        <Temporada />
        <MapaSeccio />
        <SegellSeccio />
        <ProfessionalBanda />
        <Newsletter />
      </main>
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
          <Route path="/productors/:slug" element={<Visita />} />
          <Route path="/entrevistes" element={<Entrevistes />} />
          <Route path="/entrevistes/:slug" element={<RedirigeixAVisita />} />
          <Route path="/qui-som" element={<QuiSom />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/contacte" element={<Contacte />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/segell" element={<Segell />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
