import ProductorGrid from '../components/ProductorGrid'
import Footer from '../components/Footer'

export default function DirectoriProductors() {
  return (
    <>
      <div className="directori">
        <div className="directori__header">
          <h1 className="directori__title">Els productors</h1>
          <p className="directori__subtitle">
            Tots els productors han estat visitats i validats personalment per l'equip d'Arrela't.
          </p>
        </div>
        <div className="directori__body">
          <ProductorGrid />
        </div>
      </div>
      <Footer />
    </>
  )
}
