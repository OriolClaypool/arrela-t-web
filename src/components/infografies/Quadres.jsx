import TargetaFitxa from './TargetaFitxa'

// Infografia "quadres": un quadre amb textura de solcs per cada unitat de `valor`
// (p. ex. 3 hectàrees = 3 quadres) i la llegenda a sota. Valor gran: "{valor} {unitat}";
// text petit: `etiqueta`.

const FONT = "'Instrument Sans Variable', 'Instrument Sans', sans-serif"
const MAX_QUADRES = 12

export default function Quadres({ item }) {
  const valor = Number(item.valor)
  if (!Number.isFinite(valor) || valor <= 0) return null

  const n = Math.min(Math.max(Math.round(valor), 1), MAX_QUADRES)
  const columnes = n <= 6 ? n : Math.ceil(n / 2)
  const files = n <= 6 ? 1 : 2
  const costat = Math.min(56, (188 - (columnes - 1) * 10) / columnes, files === 2 ? (56 - 10) / 2 : 56)
  const ample = columnes * costat + (columnes - 1) * 10
  const x0 = (220 - ample) / 2
  const y0 = 12 + (56 - (files * costat + (files - 1) * 10)) / 2

  const quadres = Array.from({ length: n }, (_, i) => {
    const fila = Math.floor(i / columnes)
    const col = i % columnes
    return { x: x0 + col * (costat + 10), y: y0 + fila * (costat + 10) }
  })

  const panell = (
    <svg
      viewBox="0 0 220 100"
      role="img"
      aria-label={`${valor} ${item.unitat ?? ''} ${item.etiqueta ?? ''}${item.llegenda ? `. ${item.llegenda}` : ''}`.replace(/\s+/g, ' ').trim()}
      className="fitxa-targeta__grafic"
    >
      <g fill="#E8EDD6" stroke="#6E7B2F" strokeWidth="2">
        {quadres.map((q) => (
          <rect key={`${q.x}-${q.y}`} x={q.x} y={q.y} width={costat} height={costat} rx={costat * 0.18} />
        ))}
      </g>
      <g fill="none" stroke="#6E7B2F" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`0.1 ${Math.max(4, costat * 0.16)}`}>
        {quadres.map((q) => (
          <path
            key={`${q.x}-${q.y}`}
            d={[0.286, 0.5, 0.714].map((f) => `M${q.x + costat * 0.18} ${q.y + costat * f} H${q.x + costat * 0.82}`).join(' ')}
          />
        ))}
      </g>
      {item.llegenda && (
        <text x="110" y="90" textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="600" fill="#5E5040">
          {item.llegenda}
        </text>
      )}
    </svg>
  )

  return (
    <TargetaFitxa
      panell={panell}
      etiqueta="Superfície"
      valor={`${valor} ${item.unitat ?? ''}`.trim()}
      text={item.etiqueta}
    />
  )
}
