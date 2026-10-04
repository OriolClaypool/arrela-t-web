import { NOMS_MESOS, fraseMesos, intervals, nomMesCapital, uneix } from '../utils/mesos'

// Roda de l'any (maqueta inici.html, secció "Temporada"). Es calcula a partir de
// les dades (src/data/temporada.js); no és una copia de la maqueta.
//
// Geometria (vista 540 x 540, centre 270):
// - Anell de 12 mesos entre els radis 214 i 252. El mes m ocupa els angles
//   -90 + (m-1)*30 fins a -90 + m*30 graus (en sentit horari des de dalt), amb
//   1 grau de separació a cada banda. El mes actual és terracota amb la lletra clara.
// - Una pista concèntrica per cada temporada (radis 188, 162, 136, 110, 84) i,
//   a sobre, l'arc de la temporada, del començament del primer mes al final de
//   l'últim, amb extrems arrodonits. Els arcs que travessen el desembre
//   (p. ex. novembre-gener) es resolen amb intervals().
// - Agulla del radi 64 al 200 cap al mig del mes actual, amb un punt fosc a la
//   punta, i un disc central amb "ARA" i el nom del mes.
//
// Els colors són hexadecimals perquè var(--...) no es resol en atributs SVG.

const CENTRE = 270
const RADI_ANELL_EXT = 252
const RADI_ANELL_INT = 214
const RADIS_PISTES = [188, 162, 136, 110, 84]
const MARGE_ARC = 5 // graus que s'enretiren els arcs per deixar lloc als extrems arrodonits
const LLETRES = ['G', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

const COLOR = {
  mes: '#F5F0E4',
  mesActual: '#B5562F',
  lletra: '#5E5040',
  lletraActual: '#FFF8EE',
  pista: '#E1D6BD',
  agulla: '#2A2017',
  etiqueta: '#8F3F1F',
  titol: '#1F4A34',
}

const FONT_TEXT = "'Instrument Sans Variable', 'Instrument Sans', sans-serif"
const FONT_DISPLAY = "'Fraunces Variable', Fraunces, serif"

const decimals = (n) => n.toFixed(1)

function punt(radi, graus) {
  const a = (graus * Math.PI) / 180
  return [CENTRE + radi * Math.cos(a), CENTRE + radi * Math.sin(a)]
}

const coords = ([x, y]) => `${decimals(x)} ${decimals(y)}`

/** Angle inicial (graus) del començament del mes m */
const angleMes = (m) => -90 + (m - 1) * 30

function camiSegmentMes(m) {
  const a0 = angleMes(m) + 1
  const a1 = angleMes(m) + 30 - 1
  return [
    `M${coords(punt(RADI_ANELL_EXT, a0))}`,
    `A${RADI_ANELL_EXT} ${RADI_ANELL_EXT} 0 0 1 ${coords(punt(RADI_ANELL_EXT, a1))}`,
    `L${coords(punt(RADI_ANELL_INT, a1))}`,
    `A${RADI_ANELL_INT} ${RADI_ANELL_INT} 0 0 0 ${coords(punt(RADI_ANELL_INT, a0))}`,
    'Z',
  ].join(' ')
}

function camiArc(radi, inici, longitud) {
  const a0 = angleMes(inici) + MARGE_ARC
  const a1 = angleMes(inici) + longitud * 30 - MARGE_ARC
  const gran = a1 - a0 > 180 ? 1 : 0
  return `M${coords(punt(radi, a0))} A${radi} ${radi} 0 ${gran} 1 ${coords(punt(radi, a1))}`
}

function etiquetaAria(temporades, mes) {
  const trams = temporades.map((t) => `${t.nom.toLowerCase()} ${fraseMesos(t.mesos)}`)
  const primera = trams.length ? `${trams[0].charAt(0).toUpperCase()}${trams[0].slice(1)}` : ''
  const resta = trams.slice(1)
  const llista = trams.length ? ` ${uneix([primera, ...resta])}.` : ''
  return `La roda de l'any.${llista} Ara és ${NOMS_MESOS[mes - 1]}.`
}

/**
 * Roda de l'any.
 * - temporades: llista de temporades (src/data/temporada.js); en dibuixa com a màxim 5
 * - mes: mes actual (1-12)
 */
export default function RodaAny({ temporades, mes }) {
  const visibles = temporades.slice(0, RADIS_PISTES.length)

  const angleAgulla = angleMes(mes) + 15
  const [x1, y1] = punt(64, angleAgulla)
  const [x2, y2] = punt(200, angleAgulla)

  return (
    <svg
      viewBox="0 0 540 540"
      role="img"
      aria-label={etiquetaAria(visibles, mes)}
      className="roda"
    >
      {/* Anell de mesos */}
      <g fill={COLOR.mes}>
        {Array.from({ length: 12 }, (_, i) => i + 1)
          .filter((m) => m !== mes)
          .map((m) => (
            <path key={m} d={camiSegmentMes(m)} />
          ))}
      </g>
      <path d={camiSegmentMes(mes)} fill={COLOR.mesActual} />

      <g
        fontFamily={FONT_TEXT}
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {LLETRES.map((lletra, i) => {
          const [x, y] = punt((RADI_ANELL_EXT + RADI_ANELL_INT) / 2, angleMes(i + 1) + 15)
          return (
            <text
              key={i}
              x={decimals(x)}
              y={decimals(y)}
              fill={i + 1 === mes ? COLOR.lletraActual : COLOR.lletra}
            >
              {lletra}
            </text>
          )
        })}
      </g>

      {/* Pistes concèntriques */}
      <g fill="none" stroke={COLOR.pista} strokeWidth="16">
        {visibles.map((t, i) => (
          <circle key={t.id} cx={CENTRE} cy={CENTRE} r={RADIS_PISTES[i]} />
        ))}
      </g>

      {/* Arc de cada temporada */}
      <g fill="none" strokeWidth="16" strokeLinecap="round">
        {visibles.map((t, i) => {
          const radi = RADIS_PISTES[i]
          const trams = intervals(t.mesos)
          if (trams.length === 1 && trams[0].longitud === 12) {
            return <circle key={t.id} cx={CENTRE} cy={CENTRE} r={radi} stroke={t.color} />
          }
          return trams.map((tram) => (
            <path
              key={`${t.id}-${tram.inici}`}
              d={camiArc(radi, tram.inici, tram.longitud)}
              stroke={t.color}
            />
          ))
        })}
      </g>

      {/* Agulla cap al mig del mes actual */}
      <line
        x1={decimals(x1)}
        y1={decimals(y1)}
        x2={decimals(x2)}
        y2={decimals(y2)}
        stroke={COLOR.agulla}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx={decimals(x2)}
        cy={decimals(y2)}
        r="7"
        fill={COLOR.agulla}
        stroke={COLOR.mes}
        strokeWidth="3"
      />

      {/* Disc central */}
      <circle cx={CENTRE} cy={CENTRE} r="62" fill={COLOR.mes} />
      <text
        x={CENTRE}
        y="252"
        textAnchor="middle"
        fontFamily={FONT_TEXT}
        fontSize="12"
        fontWeight="700"
        letterSpacing="2.5"
        fill={COLOR.etiqueta}
      >
        ARA
      </text>
      <text
        x={CENTRE}
        y="285"
        textAnchor="middle"
        fontFamily={FONT_DISPLAY}
        fontSize="27"
        fontWeight="600"
        fill={COLOR.titol}
        style={{ fontVariationSettings: "'SOFT' 100" }}
      >
        {nomMesCapital(mes)}
      </text>
    </svg>
  )
}
