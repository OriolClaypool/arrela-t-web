import { llumRelativa, mescla, tinta } from '../utils/color'

// Il·lustració d'un producte de la visita (maqueta visita.html, secció "Els seus vins"):
// un cercle suau del color de la família amb el producte al davant, 160 x 220.
// - ampolla (vi, oli): el color del vidre ve de `colorPlaceholder`; etiqueta i marca del
//   segell com a la maqueta.
// - formatge: roda en vista de tres quarts (com la de l'hero); el color de la crosta i de
//   la cara superior ve de `colorPlaceholder`, així el fresc és clar i el curat, fosc.
//   Si el producte porta `forma: 'pot'` (p. ex. un iogurt), és un pot amb etiqueta.
// - cistella (horta i la resta): una cistella amb verdura; varia segons la posició.
// Decorativa (aria-hidden): el nom i el detall del producte són al text de la targeta.

const TIPUS_PER_FAMILIA = { vi: 'ampolla', oli: 'ampolla', formatge: 'formatge', mel: 'pot' }

function Etiqueta({ x, y, w, h, vora }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#F5F0E4" stroke={vora} strokeWidth="1.5" />
      <path d={`M${x + 8} ${y + 16} H${x + w - 8} M${x + 12} ${y + 27} H${x + w - 12}`} fill="none" stroke="#5E5040" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x + w / 2} ${y + h - 8} V${y + h - 15} M${x + w / 2 - 6} ${y + h - 8} H${x + w / 2 + 6}`} fill="none" stroke="#1F4A34" strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

function Ampolla({ cor }) {
  const vora = mescla(cor, '#2A2017', 0.35)
  return (
    <>
      <rect x="70" y="18" width="20" height="14" rx="3" fill={mescla(cor, '#2A2017', 0.5)} />
      <path d="M71 30 H89 V72 Q112 82 112 110 V196 Q112 204 104 204 H56 Q48 204 48 196 V110 Q48 82 71 72 Z" fill={cor} stroke={vora} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M58 112 V188" fill="none" stroke={mescla(cor, '#FFFFFF', 0.3)} strokeWidth="5" strokeLinecap="round" />
      <Etiqueta x={60} y={124} w={44} h={52} vora={vora} />
    </>
  )
}

// Roda de formatge en vista de tres quarts (la mateixa de l'hero): costat de crosta, cara
// superior clara i uns quants forats. El color del producte tria la crosta; la cara
// superior en deriva, així el fresc és clar i el curat, fosc.
function Roda({ cor }) {
  const llum = llumRelativa(cor)
  const costat = mescla(cor, '#2A2017', 0.14)
  const vora = mescla(cor, '#2A2017', 0.5)
  const cara = mescla(cor, '#FFF4D6', 0.62)
  const forats = mescla(cara, '#2A2017', 0.16)
  const banda = mescla(cor, '#2A2017', 0.3)
  const gruix = 3 + (1 - llum) * 1.5
  const cx = 80
  const cy = 108
  const rx = 58
  const ry = 21
  const h = 52
  return (
    <g strokeLinejoin="round">
      <path
        d={`M${cx - rx} ${cy} V${cy + h} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h} V${cy} Z`}
        fill={costat}
        stroke={vora}
        strokeWidth={gruix}
      />
      <path
        d={`M${cx - rx + 10} ${cy + h * 0.5} A${rx} ${ry} 0 0 0 ${cx + rx - 10} ${cy + h * 0.5}`}
        fill="none"
        stroke={banda}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={cara} stroke={vora} strokeWidth={gruix} />
      <g fill={forats}>
        <ellipse cx={cx - 30} cy={cy - 3} rx="5" ry="2.4" />
        <ellipse cx={cx - 6} cy={cy + 8} rx="5.5" ry="2.6" />
        <ellipse cx={cx + 22} cy={cy - 5} rx="4.5" ry="2.2" />
        <ellipse cx={cx + 36} cy={cy + 5} rx="4" ry="2" />
        <ellipse cx={cx - 40} cy={cy + 7} rx="3.5" ry="1.8" />
      </g>
    </g>
  )
}

function Pot({ cor, tapa }) {
  const vora = mescla(cor, '#2A2017', 0.35)
  return (
    <>
      <path d="M44 82 H116 L108 190 Q107 198 99 198 H61 Q53 198 52 190 Z" fill={cor} stroke={vora} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="38" y="66" width="84" height="18" rx="8" fill={tapa} stroke={mescla(tapa, '#2A2017', 0.35)} strokeWidth="2.5" />
      <Etiqueta x={56} y={108} w={48} h={52} vora={vora} />
    </>
  )
}

// Verdura que sobresurt de la cistella (3 variants)
function Verdura({ variant }) {
  if (variant === 1) {
    return (
      <>
        <ellipse cx="62" cy="108" rx="15" ry="26" transform="rotate(-14 62 108)" fill="#6A2A47" />
        <ellipse cx="56" cy="100" rx="3.5" ry="9" transform="rotate(-14 56 100)" fill="#8E4064" />
        <path d="M68 84 C70 76 78 72 84 76 C80 82 76 86 68 88 Z" fill="#A3B565" />
        <circle cx="98" cy="114" r="17" fill="#E2603F" />
        <circle cx="92" cy="108" r="4" fill="#F4A28A" />
        <path d="M98 100 L101 105 L107 103 L104 108 L109 112 L103 111 L98 115 L95 110 L89 111 L93 106 L90 102 L95 104 Z" fill="#C8D69B" />
        <path d="M112 128 C108 110 120 98 134 104 C140 116 130 128 112 128 Z" fill="#A3B565" />
        <path d="M122 122 C120 112 126 106 132 108 C132 116 130 122 122 122 Z" fill="#C8D69B" />
      </>
    )
  }
  if (variant === 2) {
    return (
      <>
        <path d="M46 130 L50 96 Q56 88 62 96 L66 130 Z" fill="#EE9A63" />
        <path d="M70 130 L74 90 Q80 82 86 90 L90 130 Z" fill="#F4B27E" />
        <path d="M94 130 L98 98 Q104 90 110 98 L114 130 Z" fill="#EE9A63" />
        <path d="M50 96 C44 84 48 76 54 78 C52 84 56 88 56 96 Z M74 90 C68 76 74 68 80 70 C77 78 81 82 80 90 Z M98 98 C92 86 96 78 102 80 C100 86 104 90 104 98 Z" fill="#A3B565" />
        <circle cx="124" cy="116" r="14" fill="#E2603F" />
        <circle cx="119" cy="111" r="3.5" fill="#F4A28A" />
      </>
    )
  }
  return (
    <>
      <circle cx="60" cy="112" r="17" fill="#E2603F" />
      <circle cx="54" cy="106" r="4" fill="#F4A28A" />
      <path d="M60 98 L63 103 L69 101 L66 106 L71 110 L65 109 L60 113 L57 108 L51 109 L55 104 L52 100 L57 102 Z" fill="#C8D69B" />
      <circle cx="92" cy="106" r="19" fill="#E2603F" />
      <circle cx="85" cy="99" r="4.5" fill="#F4A28A" />
      <path d="M92 90 L95 96 L102 94 L99 100 L105 104 L98 103 L92 108 L89 102 L82 103 L86 98 L83 93 L89 95 Z" fill="#C8D69B" />
      <path d="M110 128 C106 110 118 98 132 104 C138 116 128 128 110 128 Z" fill="#A3B565" />
      <path d="M120 122 C118 112 124 106 130 108 C130 116 128 122 120 122 Z" fill="#C8D69B" />
    </>
  )
}

function Cistella({ indice }) {
  return (
    <>
      <path d="M38 130 C38 54 122 54 122 130" fill="none" stroke="#A9741A" strokeWidth="8" strokeLinecap="round" />
      <Verdura variant={indice % 3} />
      <path d="M30 128 H130 L118 192 Q116 200 108 200 H52 Q44 200 42 192 Z" fill="#E4BE5C" />
      <rect x="26" y="122" width="108" height="14" rx="7" fill="#C99A35" />
      <path d="M38 152 H122 M42 172 H118" fill="none" stroke="#C99A35" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

/**
 * - familia: objecte de families.js (color de la família)
 * - producte: { nom, detall, colorPlaceholder, forma? }
 * - indice: posició del producte a la llista (varia la verdura de la cistella)
 */
export default function ProducteIllustracio({ familia, producte, indice = 0 }) {
  const tipus = TIPUS_PER_FAMILIA[familia.id] ?? 'cistella'
  const cor = /^#[0-9a-f]{6}$/i.test(producte.colorPlaceholder ?? '') ? producte.colorPlaceholder : familia.color
  const claredat = { ampolla: 0.9, formatge: 0.8, pot: 0.8, cistella: 0.85 }
  const forma = tipus === 'formatge' && producte.forma === 'pot' ? 'pot' : tipus
  const fons = tinta(familia.color, claredat[forma])

  let contingut
  if (forma === 'ampolla') contingut = <Ampolla cor={cor} />
  else if (forma === 'formatge') contingut = <Roda cor={cor} />
  else if (forma === 'pot') contingut = <Pot cor={cor} tapa={familia.color} />
  else contingut = <Cistella indice={indice} />

  return (
    <svg className="visita-producte__il" viewBox="0 0 160 220" aria-hidden="true" focusable="false">
      <circle cx="80" cy="124" r="74" fill={fons} />
      {contingut}
    </svg>
  )
}
