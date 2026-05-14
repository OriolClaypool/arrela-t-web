import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollNarrative from './components/ScrollNarrative'
import Productors from './components/Productors'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ProductorDetall from './pages/ProductorDetall'
import QuiSom from './pages/QuiSom'
import Agenda from './pages/Agenda'
import Contacte from './pages/Contacte'

function Home() {
  return (
    <>
      <Hero />
      <ScrollNarrative />
      <Productors />
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
        <Route path="/productors/:slug" element={<ProductorDetall />} />
        <Route path="/qui-som" element={<QuiSom />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/contacte" element={<Contacte />} />
      </Routes>
    </>
  )
}
