import TargetaFitxa from './TargetaFitxa'
import { milers } from '../../utils/format'

// Infografia "pictograma": `valor / cadaUnitat` icones (p. ex. 8.000 ampolles amb una
// ampolla cada 1.000 = 8 ampolles) i la llegenda a sota. Icones: `ampolla` (la de la
// maqueta), `formatge` (una roda) i `caixa` (una caixa de verdura), pintades amb el
// color de la família. Valor gran: `valor` amb punt de milers; text petit: `etiqueta`.

const FONT = "'Instrument Sans Variable', 'Instrument Sans', sans-serif"
const MAX_ICONES = 24

// Mida de cada icona (unitats del viewBox), separació i ampliació màxima
const ICONES = {
  ampolla: { w: 14, h: 70, gx: 11, gy: 8, maxEscala: 1 },
  formatge: { w: 26, h: 22, gx: 8, gy: 8, maxEscala: 1.7 },
  caixa: { w: 26, h: 22, gx: 8, gy: 8, maxEscala: 1.7 },
}

function Ampolla({ familia }) {
  return (
    <g fill={familia.color}>
      <rect x="4" y="0" width="6" height="16" rx="1.5" />
      <path d="M0 26 Q0 16 7 16 Q14 16 14 26 V66 Q14 70 10 70 H4 Q0 70 0 66 Z" />
      <rect x="2" y="38" width="10" height="14" rx="1" fill="#F5F0E4" />
    </g>
  )
}

function Formatge({ familia }) {
  const vora = familia.colorText
  return (
    <g transform="translate(1 1)" strokeLinejoin="round">
      <path d="M0 7 V14 A12 6 0 0 0 24 14 V7 Z" fill={familia.color} stroke={vora} strokeWidth="2" />
      <ellipse cx="12" cy="7" rx="12" ry="6" fill="#FBF1D3" stroke={vora} strokeWidth="2" />
      <g fill="#E8C877" stroke="none">
        <ellipse cx="8" cy="6.5" rx="2" ry="1.1" />
        <ellipse cx="16" cy="8" rx="1.8" ry="1" />
      </g>
    </g>
  )
}

function Caixa({ familia }) {
  return (
    <g>
      <circle cx="7" cy="6" r="4.8" fill="#E2603F" />
      <circle cx="14" cy="4.4" r="5.2" fill="#A3B565" />
      <circle cx="20" cy="6" r="4.8" fill="#EE9A63" />
      <rect x="0" y="7" width="26" height="15" rx="3" fill={familia.color} />
      <path d="M0 12.5 H26 M0 17.5 H26" fill="none" stroke="#2A2017" strokeOpacity="0.35" strokeWidth="2" />
    </g>
  )
}

const DIBUIX = { ampolla: Ampolla, formatge: Formatge, caixa: Caixa }

// Reparteix `n` icones en 1 a 4 files i tria la que les fa més grans
function repartiment(n, { w, h, gx, gy, maxEscala }) {
  let millor = null
  for (let files = 1; files <= 4; files += 1) {
    const columnes = Math.ceil(n / files)
    const ample = columnes * w + (columnes - 1) * gx
    const alt = files * h + (files - 1) * gy
    const escala = Math.min(196 / ample, 70 / alt, maxEscala)
    if (!millor || escala > millor.escala * 1.02) millor = { files, columnes, ample, alt, escala }
  }
  return millor
}

export default function Pictograma({ item, familia }) {
  const valor = Number(item.valor)
  const cada = Number(item.cadaUnitat)
  const Icona = DIBUIX[item.icona]
  const mides = ICONES[item.icona]
  if (!Icona || !Number.isFinite(valor) || valor <= 0 || !Number.isFinite(cada) || cada <= 0) return null

  const n = Math.min(Math.max(Math.round(valor / cada), 1), MAX_ICONES)
  const { files, columnes, ample, alt, escala } = repartiment(n, mides)
  const x0 = (220 - ample * escala) / 2
  const y0 = 6 + (70 - alt * escala) / 2

  const icones = Array.from({ length: n }, (_, i) => {
    const fila = Math.floor(i / columnes)
    const col = i % columnes
    const enFila = fila === files - 1 ? n - fila * columnes : columnes
    const centrat = ((columnes - enFila) * (mides.w + mides.gx)) / 2
    return {
      id: i,
      x: x0 + (col * (mides.w + mides.gx) + centrat) * escala,
      y: y0 + fila * (mides.h + mides.gy) * escala,
    }
  })

  const panell = (
    <svg
      viewBox="0 0 220 100"
      role="img"
      aria-label={`${n} icones. ${item.llegenda ?? ''}`.trim()}
      className="fitxa-targeta__grafic"
    >
      {icones.map((p) => (
        <g key={p.id} transform={`translate(${p.x} ${p.y}) scale(${escala})`}>
          <Icona familia={familia} />
        </g>
      ))}
      {item.llegenda && (
        <text x="110" y="94" textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="600" fill="#5E5040">
          {item.llegenda}
        </text>
      )}
    </svg>
  )

  return (
    <TargetaFitxa
      panell={panell}
      etiqueta="Producció"
      valor={milers(valor)}
      text={item.etiqueta}
    />
  )
}
