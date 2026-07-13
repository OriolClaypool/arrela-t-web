import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geography, Marker, useGeographies } from 'react-simple-maps'
import productors from '../data/productors'
import MapaSkeleton from './MapaSkeleton'

const GEO_URL = '/data/catalunya-comarques.min.json'

const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

const comarcesAmbProductors = new Set(
  productors.filter((p) => p.publicat && p.comarca).map((p) => normalize(p.comarca))
)

const productorsAmbCoords = productors.filter(
  (p) => p.publicat && Array.isArray(p.coordenades) && p.coordenades.length === 2
)

const TOTES_COMARQUES = [
  "Alt Camp", "Alt Empordà", "Alt Penedès", "Alt Urgell", "Alta Ribagorça",
  "Anoia", "Bages", "Baix Camp", "Baix Ebre", "Baix Empordà",
  "Baix Llobregat", "Baix Penedès", "Barcelonès", "Berguedà", "Cerdanya",
  "Conca de Barberà", "Garraf", "Garrigues", "Garrotxa", "Gironès",
  "Lluçanès", "Maresme", "Moianès", "Montsià", "Noguera", "Osona",
  "Pallars Jussà", "Pallars Sobirà", "Pla d'Urgell", "Pla de l'Estany",
  "Priorat", "Ribera d'Ebre", "Ripollès", "Segarra", "Segrià", "Selva",
  "Solsonès", "Tarragonès", "Terra Alta", "Urgell", "Val d'Aran",
  "Vallès Occidental", "Vallès Oriental",
]

/* Hardcoded hex values mirror the CSS variables so SVG fill/stroke can use them */
const C = {
  paperDeep:       '#f0e4d0',
  terracottaPale:  '#e0a986',
  terracottaSoft:  '#d99873',
  terracotta:      '#c47a52',
  clay:            '#b5613a',
  forest:          '#1d4d35',
  hoverInactive:   '#e8dcc5',
}

function ComarcaSelect({ selected, onSelect, className = '' }) {
  return (
    <select
      className={`filter-bar__select ${className}`.trim()}
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      aria-label="Selecciona una comarca"
    >
      <option value="">Totes les comarques</option>
      {TOTES_COMARQUES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}

/* Rendered inside <ComposableMap>: only here can useGeographies read map context (path/projection) */
function ComarquesLayer({
  data, selected, hoveredComarca, focusedComarca,
  onGeoEnter, onGeoLeave, onGeoFocus, onGeoBlur, onGeoClick, onGeoKeyDown,
}) {
  const { geographies } = useGeographies({ geography: data })

  /* Computed once per geography load, not on every hover/focus re-render */
  const namesByKey = useMemo(() => {
    const map = new Map()
    geographies.forEach((geo) => {
      const raw = geo.properties?.nom ?? ''
      map.set(geo.rsmKey, { raw, norm: normalize(raw) })
    })
    return map
  }, [geographies])

  return geographies.map((geo) => {
    const { raw: nom, norm: normNom } = namesByKey.get(geo.rsmKey) ?? { raw: '', norm: '' }
    const activa = comarcesAmbProductors.has(normNom)
    const sel    = selected != null && normalize(selected) === normNom
    const hov    = hoveredComarca != null && normalize(hoveredComarca) === normNom
    const foc    = focusedComarca != null && normalize(focusedComarca) === normNom

    const fill =
      sel            ? C.terracotta
      : hov && activa ? C.terracottaSoft
      : hov           ? C.hoverInactive
      : activa        ? C.terracottaPale
      :                 C.paperDeep

    const styleBase = {
      cursor: activa ? 'pointer' : 'default',
      transition: 'fill 180ms ease, stroke-width 120ms ease',
      outline: 'none',
    }

    return (
      <Geography
        key={geo.rsmKey}
        geography={geo}
        fill={fill}
        stroke={activa ? C.clay : C.terracottaSoft}
        strokeWidth={foc ? 2.5 : hov && activa ? 1.4 : activa ? 1 : 0.7}
        aria-label={nom}
        style={{ default: styleBase, hover: styleBase, pressed: styleBase }}
        onMouseEnter={(e) => onGeoEnter(e, nom)}
        onMouseLeave={onGeoLeave}
        onFocus={() => onGeoFocus(nom)}
        onBlur={onGeoBlur}
        onClick={() => onGeoClick(nom)}
        onKeyDown={(e) => onGeoKeyDown(e, nom)}
      />
    )
  })
}

function MarkersLayer({ hoveredMarker, onMarkerEnter, onMarkerLeave, onMarkerClick, onMarkerKeyDown }) {
  return productorsAmbCoords.map((p) => {
    const hov = hoveredMarker === p.slug
    const r = hov ? 9 : 6
    return (
      <Marker key={p.slug} coordinates={p.coordenades}>
        {/* Larger invisible hit-area so the marker is easy to tap on mobile */}
        <circle
          r={16}
          fill="transparent"
          style={{ cursor: 'pointer', outline: 'none' }}
          tabIndex={0}
          role="button"
          aria-label={`${p.nom} — ${p.categoria}`}
          onMouseEnter={(e) => onMarkerEnter(e, p)}
          onMouseLeave={onMarkerLeave}
          onFocus={(e) => onMarkerEnter(e, p)}
          onBlur={onMarkerLeave}
          onClick={() => onMarkerClick(p.slug)}
          onKeyDown={(e) => onMarkerKeyDown(e, p)}
        />
        <circle
          r={r}
          fill={C.forest}
          stroke="white"
          strokeWidth={hov ? 2 : 1}
          pointerEvents="none"
          style={{ transition: 'r 120ms ease' }}
        />
      </Marker>
    )
  })
}

export default function MapaCatalunya({ onSelect, selected }) {
  const navigate = useNavigate()
  const wrapRef  = useRef(null)

  const [mapState, setMapState] = useState({ status: 'loading', data: null })
  const [tooltip,        setTooltip]        = useState({ visible: false, text: '', sub: '', x: 0, y: 0 })
  const [hoveredComarca, setHoveredComarca] = useState(null)
  const [focusedComarca, setFocusedComarca] = useState(null)
  const [hoveredMarker,  setHoveredMarker]  = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(GEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => { if (!cancelled) setMapState({ status: 'loaded', data }) })
      .catch(() => { if (!cancelled) setMapState({ status: 'error', data: null }) })
    return () => { cancelled = true }
  }, [])

  const relPos = (e) => {
    if (!wrapRef.current) return { x: 0, y: 0 }
    const wrapRect = wrapRef.current.getBoundingClientRect()
    if (e.type === 'focus') {
      const t = e.target.getBoundingClientRect()
      return { x: t.left + t.width / 2 - wrapRect.left, y: t.top + t.height / 2 - wrapRect.top }
    }
    return { x: e.clientX - wrapRect.left, y: e.clientY - wrapRect.top }
  }

  /* ── comarca handlers ─────────────────────────────────── */
  const onGeoEnter = (e, nom) => {
    if (hoveredMarker) return
    const { x, y } = relPos(e)
    setHoveredComarca(nom)
    setTooltip({ visible: true, text: nom, sub: '', x, y })
  }

  const onGeoMove = (e) => {
    setTooltip((prev) => {
      if (!prev.visible) return prev
      const { x, y } = relPos(e)
      return { ...prev, x, y }
    })
  }

  const onGeoLeave = () => {
    setHoveredComarca(null)
    setTooltip((t) => ({ ...t, visible: false }))
  }

  const onGeoFocus = (nom) => setFocusedComarca(nom)
  const onGeoBlur  = () => setFocusedComarca(null)

  const onGeoClick = (nom) => {
    if (onSelect) onSelect(selected === nom ? null : nom)
  }

  const onGeoKeyDown = (e, nom) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onGeoClick(nom)
    }
  }

  /* ── marker handlers ──────────────────────────────────── */
  const onMarkerEnter = (e, p) => {
    const { x, y } = relPos(e)
    setHoveredMarker(p.slug)
    setTooltip({ visible: true, text: p.nom, sub: p.categoria, x, y })
  }

  const onMarkerLeave = () => {
    setHoveredMarker(null)
    setTooltip((t) => ({ ...t, visible: false }))
  }

  const onMarkerClick = (slug) => navigate(`/productors/${slug}`)

  const onMarkerKeyDown = (e, p) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onMarkerClick(p.slug)
    }
  }

  return (
    <div className="mapa-card">
      <div className="mapa-card__header">
        <span className="mapa-card__label">El territori</span>
        <h2 className="mapa-card__title">Els productors al mapa</h2>
      </div>

      {mapState.status !== 'error' && (
        <div className="mapa-comarca-mobile">
          <ComarcaSelect selected={selected} onSelect={onSelect} />
        </div>
      )}

      {mapState.status === 'loading' && <MapaSkeleton />}

      {mapState.status === 'error' && (
        <div className="mapa-error">
          <p className="mapa-error__text">No s&apos;ha pogut carregar el mapa.</p>
          <ComarcaSelect selected={selected} onSelect={onSelect} className="mapa-error__select" />
        </div>
      )}

      {mapState.status === 'loaded' && (
        <div className="mapa-wrap" ref={wrapRef} onMouseMove={onGeoMove}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [2.0, 41.7], scale: 7500 }}
            width={680}
            height={500}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <ComarquesLayer
              data={mapState.data}
              selected={selected}
              hoveredComarca={hoveredComarca}
              focusedComarca={focusedComarca}
              onGeoEnter={onGeoEnter}
              onGeoLeave={onGeoLeave}
              onGeoFocus={onGeoFocus}
              onGeoBlur={onGeoBlur}
              onGeoClick={onGeoClick}
              onGeoKeyDown={onGeoKeyDown}
            />
            <MarkersLayer
              hoveredMarker={hoveredMarker}
              onMarkerEnter={onMarkerEnter}
              onMarkerLeave={onMarkerLeave}
              onMarkerClick={onMarkerClick}
              onMarkerKeyDown={onMarkerKeyDown}
            />
          </ComposableMap>

          {tooltip.visible && (
            <div
              className="mapa-tooltip mapa-tooltip--visible"
              style={{ left: tooltip.x, top: tooltip.y }}
              aria-hidden="true"
            >
              <span className="mapa-tooltip__nom">{tooltip.text}</span>
              {tooltip.sub && (
                <span className="mapa-tooltip__cat">{tooltip.sub}</span>
              )}
            </div>
          )}
        </div>
      )}

      <p className="mapa-card__helper">
        Fes clic en un productor per veure el seu perfil
      </p>
    </div>
  )
}
