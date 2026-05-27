import { useState } from 'react'
import productors from '../data/productors'
import ProductorCard from './ProductorCard'
import FilterBar from './FilterBar'

const categories = [...new Set(productors.filter((p) => p.categoria).map((p) => p.categoria))]
const comarques = [...new Set(productors.filter((p) => p.comarca).map((p) => p.comarca))]

export default function ProductorGrid({ comarcaFilter }) {
  const [filters, setFilters] = useState({ categoria: '', comarca: '', cerca: '' })

  const effectiveComarca = comarcaFilter || filters.comarca
  const hasActiveFilters = filters.categoria || effectiveComarca || filters.cerca

  const filtered = productors.filter((p) => {
    if (!p.publicat) return !hasActiveFilters
    if (filters.categoria && p.categoria !== filters.categoria) return false
    if (effectiveComarca && p.comarca !== effectiveComarca) return false
    if (filters.cerca) {
      const q = filters.cerca.toLowerCase()
      const matchNom = p.nom.toLowerCase().includes(q)
      const matchProductes = p.productes.some((pr) => (pr.nom ?? pr).toString().toLowerCase().includes(q))
      if (!matchNom && !matchProductes) return false
    }
    return true
  })

  return (
    <div>
      <FilterBar
        categories={categories}
        comarques={comarques}
        filters={filters}
        onChange={setFilters}
        comarcaFilter={comarcaFilter}
      />
      {filtered.length === 0 ? (
        <p className="dir-grid__empty">
          No hem trobat cap productor amb aquests criteris.
        </p>
      ) : (
        <div className="dir-grid">
          {filtered.map((p) => (
            <ProductorCard key={p.slug} productor={p} />
          ))}
        </div>
      )}
    </div>
  )
}
