import { mescla } from '../../utils/color'

// Pòsters dels tres vídeos de la visita (maqueta visita.html, secció "Els vídeos"):
// 1. la persona (barret sobre un tur), 2. el projecte (celler amb formes rodones),
// 3. el debat (dues bafarades). El del vi és el de la maqueta; la resta es pinten amb
// el color de la família (pòster 1) i amb formes pròpies de cada producte (pòster 2:
// bótes al vi, rodes de formatge, bales de palla a l'horta). El pòster 3 és igual
// per a totes les famílies. Colors hexadecimals: var(--...) no es resol en SVG.

const POSTER_1 = {
  vi: { fons: '#6A2A47', sol: '#EE9A63', turo: '#84395C', rengle: '#E9C3D6', barret: '#E4BE5C', vora: '#C99A35', cinta: '#B5562F' },
  horta: { fons: '#6E7B2F', sol: '#EE9A63', turo: '#8E9C55', rengle: '#DCE6B4', barret: '#E4BE5C', vora: '#C99A35', cinta: '#B5562F' },
  formatge: { fons: '#E4BE5C', sol: '#F7E7BD', turo: '#C99A35', rengle: '#F7E7BD', barret: '#F5F0E4', vora: '#C9B07A', cinta: '#B5562F' },
}

function poster1Generic(color) {
  return {
    fons: color,
    sol: '#F5F0E4',
    turo: mescla(color, '#2A2017', 0.18),
    rengle: mescla(color, '#F5F0E4', 0.6),
    barret: '#E4BE5C',
    vora: '#C99A35',
    cinta: '#B5562F',
  }
}

const CELLER = {
  vi: { fons: '#8A6416', volta: '#9E7520', terra: '#6B4C12', vora: '#4F3A22', cos: '#C99A35', anell: '#8A6416', centre: '#4F3A22' },
  formatge: { fons: '#8A6416', volta: '#9E7520', terra: '#6B4C12', vora: '#A9741A', cos: '#FBF1D3', anell: '#E8C877', centre: '#A9741A' },
  horta: { fons: '#4E5A1C', volta: '#5A6722', terra: '#3A4514', vora: '#2F3A12', cos: '#E4BE5C', anell: '#C99A35', centre: '#8A6416' },
}

function Poster1({ familia, color }) {
  const c = POSTER_1[familia] ?? poster1Generic(color)
  return (
    <>
      <rect width="320" height="180" fill={c.fons} />
      <circle cx="262" cy="46" r="20" fill={c.sol} />
      <path d="M0 148 C80 126 160 124 240 134 C280 138 300 136 320 132 V180 H0 Z" fill={c.turo} />
      <path d="M190 158 C240 148 280 148 320 152" fill="none" stroke={c.rengle} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0.1 11" />
      <path d="M48 100 Q48 68 80 68 Q112 68 112 100 Z" fill={c.barret} />
      <ellipse cx="80" cy="102" rx="58" ry="13" fill={c.vora} />
      <path d="M49 92 H111" fill="none" stroke={c.cinta} strokeWidth="7" />
    </>
  )
}

function Poster2({ familia }) {
  const c = CELLER[familia] ?? CELLER.vi
  const centres = [[52, 132], [110, 132], [81, 86], [268, 132]]
  return (
    <>
      <rect width="320" height="180" fill={c.fons} />
      <path d="M0 180 V70 Q160 -10 320 70 V180 Z" fill={c.volta} />
      <path d="M0 160 H320 V180 H0 Z" fill={c.terra} />
      <g stroke={c.vora} strokeWidth="4" fill={c.cos}>
        {centres.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="28" />)}
      </g>
      <g fill="none" stroke={c.anell} strokeWidth="2.5">
        {centres.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="18" />)}
      </g>
      <g fill={c.centre}>
        {centres.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />)}
      </g>
    </>
  )
}

function Poster3() {
  return (
    <>
      <rect width="320" height="180" fill="#B5562F" />
      <path d="M30 30 H118 Q128 30 128 40 V82 Q128 92 118 92 H62 L44 108 L46 92 H30 Q20 92 20 82 V40 Q20 30 30 30 Z" fill="#F5F0E4" />
      <g fill="#B5562F"><circle cx="54" cy="61" r="5" /><circle cx="74" cy="61" r="5" /><circle cx="94" cy="61" r="5" /></g>
      <path d="M202 88 H290 Q300 88 300 98 V140 Q300 150 290 150 H274 L276 166 L258 150 H202 Q192 150 192 140 V98 Q192 88 202 88 Z" fill="#E4BE5C" />
      <g fill="#8A6416"><circle cx="226" cy="119" r="5" /><circle cx="246" cy="119" r="5" /><circle cx="266" cy="119" r="5" /></g>
    </>
  )
}

/**
 * Pòster il·lustrat d'un vídeo de la visita.
 * - indice: 0 la persona, 1 el projecte, 2 el debat
 * - familia: id de la família
 * - color: color de la família (per a les famílies sense pòster propi)
 * Decoratiu (aria-hidden); la mida la fixa el contenidor.
 */
export default function PosterVideo({ indice, familia, color }) {
  let contingut
  if (indice === 0) contingut = <Poster1 familia={familia} color={color} />
  else if (indice === 1) contingut = <Poster2 familia={familia} />
  else contingut = <Poster3 />

  return (
    <svg
      className="visita-video__poster"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {contingut}
    </svg>
  )
}
