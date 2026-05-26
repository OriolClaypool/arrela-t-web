export default function FilterBar({ categories, comarques, filters, onChange, comarcaFilter }) {
  return (
    <div className="filter-bar" role="search">
      <select
        className="filter-bar__select"
        value={comarcaFilter || filters.categoria}
        onChange={(e) => onChange({ ...filters, categoria: e.target.value })}
        aria-label="Filtrar per categoria"
        disabled={!!comarcaFilter}
      >
        <option value="">Totes les categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className="filter-bar__select"
        value={comarcaFilter || filters.comarca}
        onChange={(e) => onChange({ ...filters, comarca: e.target.value })}
        aria-label="Filtrar per comarca"
        disabled={!!comarcaFilter}
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
