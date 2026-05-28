import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollNarrative from './components/ScrollNarrative'
import Productors from './components/Productors'
import Temporada from './components/Temporada'
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
        <h2 className="mapa-seccio__title">On som</h2>
        <p className="mapa-seccio__subtitle">
          Productors visitats arreu del territori català.
        </p>
        <MapaCatalunya onSelect={() => {}} selected={null} />
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <ScrollNarrative />
      <Productors />
      <Temporada />
      <MapaHome />
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
