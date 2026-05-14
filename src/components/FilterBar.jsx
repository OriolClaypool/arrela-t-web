export default function FilterBar({ categories, comarques, filters, onChange }) {
  return (
    <div className="filter-bar" role="search">
      <select
        className="filter-bar__select"
        value={filters.categoria}
        onChange={(e) => onChange({ ...filters, categoria: e.target.value })}
        aria-label="Filtrar per categoria"
      >
        <option value="">Totes les categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className="filter-bar__select"
        value={filters.comarca}
        onChange={(e) => onChange({ ...filters, comarca: e.target.value })}
        aria-label="Filtrar per comarca"
      >
        <option value="">Totes les comarques</option>
        {comarques.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        className="filter-bar__input"
        type="search"
        placeholder="Cerca per nom o producte..."
        value={filters.cerca}
        onChange={(e) => onChange({ ...filters, cerca: e.target.value })}
        aria-label="Cerca productors"
      />
    </div>
  )
}
