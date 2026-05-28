import { Link, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollNarrative from './components/ScrollNarrative'
import UltimesEntrevistes from './components/UltimesEntrevistes'
import MapaCatalunya from './components/MapaCatalunya'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import DirectoriProductors from './pages/DirectoriProductors'
import ProducerProfile from './components/ProducerProfile'
import ProducerReportage from './components/ProducerReportage'
import QuiSom from './pages/QuiSom'
import Agenda from './pages/Agenda'
import Contacte from './pages/Contacte'
import Professional from './components/Professional'
import Entrevistes from './components/Entrevistes'

function MapaHome() {
  return (
    <section className="mapa-seccio">
      <div className="mapa-seccio__inner">
        <MapaCatalunya onSelect={() => {}} selected={null} />
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
      <Nav />
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
      </Routes>
    </>
  )
}
