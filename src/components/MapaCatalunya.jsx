import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import productors from '../data/productors'

const GEO_URL = '/data/catalunya-comarques.json'

const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

const comarcesAmbProductors = new Set(
  productors.filter((p) => p.publicat && p.comarca).map((p) => normalize(p.comarca))
)

const productorsAmbCoords = productors.filter(
  (p) => p.publicat && Array.isArray(p.coordenades) && p.coordenades.length === 2
)

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

export default function MapaCatalunya({ onSelect, selected }) {
  const navigate = useNavigate()
  const wrapRef  = useRef(null)

  const [tooltip,       setTooltip]       = useState({ visible: false, text: '', sub: '', x: 0, y: 0 })
  const [hoveredComarca, setHoveredComarca] = useState(null)
  const [hoveredMarker,  setHoveredMarker]  = useState(null)

  const relPos = (e) => {
    if (!wrapRef.current) return { x: 0, y: 0 }
    const r = wrapRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
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

  const onGeoClick = (nom) => {
    if (onSelect) onSelect(selected === nom ? null : nom)
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

  /* small-screen marker radius (approximate — no resize listener needed) */
  const isSm = typeof window !== 'undefined' && window.innerWidth < 640

  return (
    <div className="mapa-card">
      <div className="mapa-card__header">
        <span className="mapa-card__label">El territori</span>
        <h2 className="mapa-card__title">Els productors al mapa</h2>
      </div>

      <div className="mapa-wrap" ref={wrapRef} onMouseMove={onGeoMove}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [1.7, 41.8], scale: 7500 }}
          width={680}
          height={500}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const nom   = geo.properties.NOMCOMAR ?? geo.properties.NOM_COMAR ?? geo.properties.nom_comar ?? geo.properties.name ?? ''
                const activa = comarcesAmbProductors.has(normalize(nom))
                const sel    = selected != null && normalize(selected) === normalize(nom)
                const hov    = hoveredComarca != null && normalize(hoveredComarca) === normalize(nom)

                const fill =
                  sel            ? C.terracotta
                  : hov && activa ? C.terracottaSoft
                  : hov           ? C.hoverInactive
                  : activa        ? C.terracottaPale
                  :                 C.paperDeep

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={activa ? C.clay : C.terracottaSoft}
                    strokeWidth={activa ? 1 : 0.7}
                    style={{
                      outline: 'none',
                      cursor: activa ? 'pointer' : 'default',
                      transition: 'fill 180ms ease',
                    }}
                    onMouseEnter={(e) => onGeoEnter(e, nom)}
                    onMouseLeave={onGeoLeave}
                    onClick={() => onGeoClick(nom)}
                  />
                )
              })
            }
          </Geographies>

          {productorsAmbCoords.map((p) => {
            const hov = hoveredMarker === p.slug
            const r   = hov ? (isSm ? 9 : 12) : (isSm ? 6 : 8)
            return (
              <Marker key={p.slug} coordinates={p.coordenades}>
                <circle
                  r={r}
                  fill={C.forest}
                  stroke="white"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => onMarkerEnter(e, p)}
                  onMouseLeave={onMarkerLeave}
                  onClick={() => onMarkerClick(p.slug)}
                />
              </Marker>
            )
          })}
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

      <p className="mapa-card__helper">
        Fes clic en un productor per veure el seu perfil
      </p>
    </div>
  )
}
