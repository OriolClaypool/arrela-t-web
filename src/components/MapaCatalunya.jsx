import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ComposableMap,
  Geography,
  Line,
  Marker,
  useGeographies,
  useMapContext,
} from 'react-simple-maps'
import productors from '../data/productors'
import { getFamilia } from '../data/families'
import COMARQUES from '../data/comarques'
import extres from '../data/mapa-extres.json'
import { CONTORN_CATALUNYA, MAR } from '../data/mapaContorn'
import Pin from './marca/Pin'
import MapaSkeleton from './MapaSkeleton'

// Mapa de Catalunya (maqueta inici.html, secció "El mapa").
//
// Vista 600 x 600 amb projecció geoMercator (centre [1.73, 41.705], escala 9840):
// és la mateixa projecció de la maqueta, per això el mar i el contorn de
// data/mapaContorn.js lliguen amb les comarques del GeoJSON.
//
// Props:
// - onSelect: si es passa, les comarques són interactives (clic, teclat i
//   selector de comarca per a mòbil) i es filtra per comarca (/productors).
//   Sense onSelect (portada) les comarques són decoratives.
// - selected: comarca seleccionada (nom)
//
// Els colors de l'SVG són hexadecimals que reflecteixen els tokens de l'index.css
// (--territori, --riu, --mar, --terracota...), perquè var(--...) no es resol en
// atributs SVG.

const GEO_URL = '/data/catalunya-comarques.min.json'
const VISTA = 600

const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

const comarcesAmbProductors = new Set(
  productors.filter((p) => p.publicat && p.comarca).map((p) => normalize(p.comarca))
)

// Visites ordenades per numeroVisita: la ruta, els pins i les etiquetes les segueixen
const visites = productors
  .filter(
    (p) =>
      p.publicat &&
      getFamilia(p.familia) &&
      Array.isArray(p.coordenades) &&
      p.coordenades.length === 2
  )
  .sort((a, b) => (a.numeroVisita ?? 0) - (b.numeroVisita ?? 0))

const COLOR = {
  mar:          '#D3E3E6',
  territori:    '#D6DDBA',
  territoriVora: '#C3CB9E',
  amb:          '#C8D3A6',
  hover:        '#CCD4AC',
  hoverAmb:     '#BCC993',
  seleccionada: '#E3B58F',
  contorn:      '#6E7B2F',
  riu:          '#7FAAB7',
  ruta:         '#B5562F',
  rutaFosca:    '#8F3F1F',
  tinta:        '#2A2017',
  tintaSuau:    '#5E5040',
  paper:        '#FFFBF2',
  liniaEtiqueta: '#E0D4BA',
}

const FONT_TEXT = "'Instrument Sans Variable', 'Instrument Sans', sans-serif"

const NOMS_NUMERS = { 1: 'la visita', 2: 'les dues visites', 3: 'les tres visites' }

/** Descripció del mapa per a lectors de pantalla, generada de les dades */
function descripcioMapa() {
  if (visites.length === 0) return 'Mapa de Catalunya.'
  const llista = visites.map((p) => (p.comarca ? `${p.nom} (${p.comarca})` : p.nom))
  const unides = visites.length > 1 ? ', unides per la ruta en ordre de visita' : ''
  const quantes = NOMS_NUMERS[visites.length] ?? `les ${visites.length} visites`
  const enumeracio =
    llista.length > 1
      ? `${llista.slice(0, -1).join(', ')} i ${llista[llista.length - 1]}`
      : llista[0]
  return `Mapa de Catalunya amb ${quantes}: ${enumeracio}${unides}.`
}

/**
 * Corba suau (Catmull-Rom) que passa per tots els punts [lon, lat].
 * Es dibuixa amb <Line>, que ja projecta cada coordenada.
 */
function suavitza(punts, mostres = 14) {
  if (punts.length < 3) return punts
  const resultat = []
  for (let i = 0; i < punts.length - 1; i++) {
    const p0 = punts[Math.max(i - 1, 0)]
    const p1 = punts[i]
    const p2 = punts[i + 1]
    const p3 = punts[Math.min(i + 2, punts.length - 1)]
    for (let k = 0; k < mostres; k++) {
      const t = k / mostres
      const t2 = t * t
      const t3 = t2 * t
      resultat.push([0, 1].map((d) =>
        0.5 * (
          2 * p1[d] +
          (-p0[d] + p2[d]) * t +
          (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t2 +
          (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * t3
        )
      ))
    }
  }
  resultat.push(punts[punts.length - 1])
  return resultat
}

const RIUS = Object.entries(extres.rius).map(([nom, punts]) => ({ nom, punts: suavitza(punts) }))
const RUTA = suavitza(visites.map((p) => p.coordenades), 18)

// Desplaçament de l'etiqueta de cada ciutat respecte del punt (com a la maqueta)
const DESPLACAMENT_CIUTAT = {
  Barcelona: [10.5, 11],
  Girona: [9, 22],
  Lleida: [9, 15],
  Tarragona: [9.5, 17],
}

function ComarcaSelect({ selected, onSelect, className = '' }) {
  return (
    <select
      className={`mapa-select ${className}`.trim()}
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      aria-label="Selecciona una comarca"
    >
      <option value="">Totes les comarques</option>
      {COMARQUES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}

/* Dins de <ComposableMap>: només aquí useGeographies pot llegir el context del mapa (path/projecció) */
function ComarquesLayer({
  data, interactiu, selected, hoveredComarca, focusedComarca,
  onGeoEnter, onGeoLeave, onGeoFocus, onGeoBlur, onGeoClick, onGeoKeyDown,
}) {
  const { geographies } = useGeographies({ geography: data })

  /* Es calcula un cop per càrrega de geografies, no a cada hover/focus */
  const namesByKey = useMemo(() => {
    const map = new Map()
    geographies.forEach((geo) => {
      const raw = geo.properties?.nom ?? ''
      map.set(geo.rsmKey, { raw, norm: normalize(raw) })
    })
    return map
  }, [geographies])

  const normSel = selected != null ? normalize(selected) : null
  const normFoc = focusedComarca != null ? normalize(focusedComarca) : null

  const comarques = geographies.map((geo) => {
    const { raw: nom, norm: normNom } = namesByKey.get(geo.rsmKey) ?? { raw: '', norm: '' }
    const activa = comarcesAmbProductors.has(normNom)
    const sel    = normSel === normNom
    const hov    = interactiu && hoveredComarca != null && normalize(hoveredComarca) === normNom

    const fill =
      sel            ? COLOR.seleccionada
      : hov && activa ? COLOR.hoverAmb
      : hov           ? COLOR.hover
      : activa        ? COLOR.amb
      :                 COLOR.territori

    const styleBase = {
      cursor: interactiu ? 'pointer' : 'default',
      transition: 'fill 180ms ease',
      outline: 'none',
    }

    const comuns = {
      geography: geo,
      fill,
      stroke: COLOR.territoriVora,
      strokeWidth: 1,
      strokeLinejoin: 'round',
      style: { default: styleBase, hover: styleBase, pressed: styleBase },
      onMouseEnter: (e) => onGeoEnter(e, nom),
      onMouseLeave: onGeoLeave,
    }

    if (!interactiu) {
      // Comarques decoratives (portada): sense tabulació ni lectura de pantalla
      return <Geography key={geo.rsmKey} {...comuns} tabIndex={-1} aria-hidden="true" />
    }

    return (
      <Geography
        key={geo.rsmKey}
        {...comuns}
        aria-label={nom}
        onFocus={() => onGeoFocus(nom)}
        onBlur={onGeoBlur}
        onClick={() => onGeoClick(nom)}
        onKeyDown={(e) => onGeoKeyDown(e, nom)}
      />
    )
  })

  /* Vores de selecció i de focus: es dibuixen a sobre de totes les comarques perquè
     els veïns no en tapin el traç, sense moure els elements que tenen el focus */
  const ressaltades = geographies.filter((geo) => {
    const { norm } = namesByKey.get(geo.rsmKey) ?? { norm: '' }
    return norm === normSel || norm === normFoc
  })

  return (
    <>
      {comarques}
      {ressaltades.map((geo) => {
        const { norm } = namesByKey.get(geo.rsmKey)
        const enFocus = norm === normFoc
        return (
          <path
            key={`vora-${geo.rsmKey}`}
            d={geo.svgPath}
            fill="none"
            stroke={enFocus ? COLOR.rutaFosca : COLOR.ruta}
            strokeWidth={enFocus ? 3 : 2}
            strokeLinejoin="round"
            pointerEvents="none"
          />
        )
      })}
    </>
  )
}

/* Etiquetes amb el nom i la comarca al costat de cada pin (com a la maqueta).
   Es col·loquen a l'esquerra del pin si el productor és a la meitat occidental
   i a la dreta si és a l'oriental. A pantalla estreta s'amaguen (CSS) i la
   llista numerada del costat fa la mateixa feina. */
function EtiquetesLayer() {
  const { projection } = useMapContext()
  const lons = visites.map((p) => p.coordenades[0]).sort((a, b) => a - b)
  const mediana = lons[Math.floor((lons.length - 1) / 2)]

  return (
    <g className="mapa-etiquetes" aria-hidden="true" pointerEvents="none">
      {visites.map((p) => {
        const [x, y] = projection(p.coordenades)
        const esquerra = visites.length > 1 && p.coordenades[0] <= mediana
        const ample = Math.max(p.nom.length * 8, (p.comarca ?? '').length * 6.4) + 28
        const rx = esquerra ? x - 27 - ample : x + 27
        const ry = y - 24 - 19
        return (
          <g key={p.slug}>
            <rect
              x={rx.toFixed(1)}
              y={ry.toFixed(1)}
              width={ample}
              height="42"
              rx="10"
              fill={COLOR.paper}
              stroke={COLOR.liniaEtiqueta}
              strokeWidth="1.2"
            />
            <text
              x={(rx + 12).toFixed(1)}
              y={(ry + 18).toFixed(1)}
              fontFamily={FONT_TEXT}
              fontSize="14"
              fontWeight="700"
              fill={COLOR.tinta}
            >
              {p.nom}
            </text>
            {p.comarca && (
              <text
                x={(rx + 12).toFixed(1)}
                y={(ry + 34).toFixed(1)}
                fontFamily={FONT_TEXT}
                fontSize="11.5"
                fill={COLOR.tintaSuau}
              >
                {p.comarca}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}

function PinsLayer({ onMarkerClick, onMarkerKeyDown }) {
  return visites.map((p) => {
    const familia = getFamilia(p.familia)
    return (
      <Marker key={p.slug} coordinates={p.coordenades}>
        {/* El <g> és el control: rol de botó, tabulable, amb àrea de toc gran
            (cercle transparent) i aro visible en focus (CSS .mapa-pin) */}
        <g
          className="mapa-pin"
          tabIndex={0}
          role="button"
          aria-label={`${p.nom} — ${p.categoria}`}
          onClick={() => onMarkerClick(p.slug)}
          onKeyDown={(e) => onMarkerKeyDown(e, p)}
        >
          <circle className="mapa-pin__aro" cx="0" cy="-24" r="21" fill="none" />
          <circle cx="0" cy="-22" r="22" fill="transparent" />
          <Pin
            className="mapa-pin__cos"
            color={familia.colorPin}
            colorNumero={familia.colorText}
            numero={p.numeroVisita}
          />
        </g>
      </Marker>
    )
  })
}

export default function MapaCatalunya({ onSelect, selected = null }) {
  const navigate = useNavigate()
  const wrapRef  = useRef(null)
  const interactiu = typeof onSelect === 'function'

  const [mapState, setMapState] = useState({ status: 'loading', data: null })
  const [tooltip,        setTooltip]        = useState({ visible: false, text: '', x: 0, y: 0 })
  const [hoveredComarca, setHoveredComarca] = useState(null)
  const [focusedComarca, setFocusedComarca] = useState(null)

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
    return { x: e.clientX - wrapRect.left, y: e.clientY - wrapRect.top }
  }

  /* ── comarques ────────────────────────────────────────── */
  const onGeoEnter = (e, nom) => {
    const { x, y } = relPos(e)
    setHoveredComarca(nom)
    setTooltip({ visible: true, text: nom, x, y })
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

  /* ── pins ─────────────────────────────────────────────── */
  const onMarkerClick = (slug) => navigate(`/productors/${slug}`)

  const onMarkerKeyDown = (e, p) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onMarkerClick(p.slug)
    }
  }

  return (
    <div className="mapa-panell">
      {interactiu && mapState.status !== 'error' && (
        <div className="mapa-comarca-mobile">
          <ComarcaSelect selected={selected} onSelect={onSelect} />
        </div>
      )}

      {mapState.status === 'loading' && <MapaSkeleton />}

      {mapState.status === 'error' && (
        <div className="mapa-error">
          <p className="mapa-error__text">No s&apos;ha pogut carregar el mapa.</p>
          {interactiu && (
            <ComarcaSelect selected={selected} onSelect={onSelect} className="mapa-error__select" />
          )}
        </div>
      )}

      {mapState.status === 'loaded' && (
        <div className="mapa-wrap" ref={wrapRef} onMouseMove={onGeoMove}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [1.73, 41.705], scale: 9840 }}
            width={VISTA}
            height={VISTA}
            role="group"
            aria-label={descripcioMapa()}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Mar, onades i rètols */}
            <g aria-hidden="true">
              <path d={MAR} fill={COLOR.mar} stroke={COLOR.mar} strokeWidth="14" strokeLinejoin="round" />
              <g fill="none" stroke="#B9D2D8" strokeWidth="2.2" strokeLinecap="round">
                <path d="M500 380 q10 -7 20 0 t20 0" />
                <path d="M330 470 q10 -7 20 0 t20 0" />
                <path d="M560 282 q8 -6 16 0 t16 0" />
              </g>
              <text
                x="398"
                y="548"
                transform="rotate(-30 398 548)"
                fontFamily={FONT_TEXT}
                fontSize="13"
                fontWeight="700"
                letterSpacing="5"
                fill="#557F8D"
              >
                MAR MEDITERRÀNIA
              </text>
              <text
                x="322"
                y="92"
                fontFamily={FONT_TEXT}
                fontSize="12"
                fontWeight="700"
                letterSpacing="4"
                fill="#8A7C64"
              >
                FRANÇA
              </text>
            </g>

            <ComarquesLayer
              data={mapState.data}
              interactiu={interactiu}
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

            {/* Contorn de Catalunya, rius i ciutats (dades/mapa-extres.json) */}
            <g aria-hidden="true" pointerEvents="none">
              <path
                d={CONTORN_CATALUNYA}
                fill="none"
                stroke={COLOR.contorn}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {RIUS.map((riu) => (
                <Line
                  key={riu.nom}
                  coordinates={riu.punts}
                  stroke={COLOR.riu}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {extres.ciutats.map((ciutat) => {
                const [dx, dy] = DESPLACAMENT_CIUTAT[ciutat.nom] ?? [9, 15]
                return (
                  <Marker key={ciutat.nom} coordinates={ciutat.coordenades}>
                    <circle r="4" fill={COLOR.tinta} />
                    <text
                      x={dx}
                      y={dy}
                      fontFamily={FONT_TEXT}
                      fontSize="12.5"
                      fontWeight="600"
                      fill={COLOR.tinta}
                    >
                      {ciutat.nom}
                    </text>
                  </Marker>
                )
              })}

              {/* Ruta de les visites, en ordre de numeroVisita */}
              {RUTA.length > 1 && (
                <Line
                  className="mapa-ruta"
                  coordinates={RUTA}
                  stroke={COLOR.ruta}
                  strokeWidth={2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 9"
                />
              )}
            </g>

            <EtiquetesLayer />
            <PinsLayer onMarkerClick={onMarkerClick} onMarkerKeyDown={onMarkerKeyDown} />
          </ComposableMap>

          {tooltip.visible && (
            <div
              className="mapa-tooltip mapa-tooltip--visible"
              style={{ left: tooltip.x, top: tooltip.y }}
              aria-hidden="true"
            >
              <span className="mapa-tooltip__nom">{tooltip.text}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
