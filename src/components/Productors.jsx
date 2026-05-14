import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import ProductorCard from './ProductorCard'

const preview = productors.slice(0, 4)

export default function Productors() {
  const titleRef = useFadeIn()

  return (
    <section id="productors" className="productors">
      <div className="productors__inner">
        <h2 ref={titleRef} className="productors__title fade-in">
          Últimes entrevistes
        </h2>
        <div className="productors__preview-grid">
          {preview.map((productor) => (
            <ProductorCard key={productor.slug} productor={productor} compact />
          ))}
        </div>
        <div className="productors__preview-cta">
          <Link to="/productors" className="productors__preview-btn">
            Veure tots els productors
          </Link>
        </div>
      </div>
    </section>
  )
}
