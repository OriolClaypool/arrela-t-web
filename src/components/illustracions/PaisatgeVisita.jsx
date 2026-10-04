import { getFamilia } from '../../data/families'
import { mescla } from '../../utils/color'

// Il·lustració del panell de l'hero de la visita (maqueta visita.html, 640 x 480).
// - vi: copiada de la maqueta (sol amb halo, vinya, masia, rengles i un raïm al primer pla).
// - horta: muntanyes amb neu, camps, masia i una tomaquera al primer pla.
// - formatge: turons daurats, masia, cabres i una roda de formatge al primer pla.
// Qualsevol altra família rep la composició del vi pintada amb el color de la família.
// Tots els fons de cel són el del panell (CSS: --familia-panell); l'SVG no en porta.
// L'halo del sol gira lent (.visita-paisatge__halo a index.css) i s'apaga amb
// prefers-reduced-motion. Colors hexadecimals perquè var(--...) no es resol en SVG.

// Composició del vi (verbatim de la maqueta) amb la paleta com a paràmetre, perquè
// les famílies sense il·lustració pròpia en puguin reutilitzar la geometria.
const PALETA_VI = {
  halo: '#EE9A63',
  sol: '#EE9A63',
  solDins: '#F3B48A',
  ocells: '#F3D8E4',
  turo1: '#8E4064',
  fileres1: '#B0587F',
  casa: '#F5F0E4',
  teulada: '#B5562F',
  obertures: '#4F1E35',
  xiprer: '#3D1428',
  turo2: '#A9547A',
  fileres2: '#E9C3D6',
  banda: '#4F1E35',
  tija: '#F5F0E4',
  fulla: '#A3B565',
  raim: '#D597B4',
  raimVora: '#7A3354',
  raimBrillantor: '#F3D8E4',
}

function paletaGenerica(color) {
  return {
    halo: '#F5F0E4',
    sol: '#F5F0E4',
    solDins: mescla(color, '#F5F0E4', 0.7),
    ocells: '#F5F0E4',
    turo1: mescla(color, '#2A2017', 0.14),
    fileres1: mescla(color, '#F5F0E4', 0.35),
    casa: '#F5F0E4',
    teulada: '#B5562F',
    obertures: mescla(color, '#2A2017', 0.6),
    xiprer: mescla(color, '#2A2017', 0.7),
    turo2: mescla(color, '#2A2017', 0.04),
    fileres2: mescla(color, '#F5F0E4', 0.6),
    banda: mescla(color, '#2A2017', 0.6),
    tija: '#F5F0E4',
    fulla: '#A3B565',
    raim: mescla(color, '#F5F0E4', 0.45),
    raimVora: mescla(color, '#2A2017', 0.1),
    raimBrillantor: '#F5F0E4',
  }
}

function Vi({ c }) {
  return (
    <>
      <g className="visita-paisatge__halo">
        <circle cx="470" cy="130" r="86" fill="none" stroke={c.halo} strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      </g>
      <circle cx="470" cy="130" r="64" fill={c.sol} />
      <circle cx="470" cy="130" r="46" fill={c.solDins} />
      <path d="M120 92 q9 -9 18 0 q9 -9 18 0" fill="none" stroke={c.ocells} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 290 C120 240 240 230 360 252 C460 270 540 240 640 226 L640 480 L0 480 Z" fill={c.turo1} />
      <g fill="none" stroke={c.fileres1} strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M20 300 C130 256 240 248 350 266" />
        <path d="M14 318 C130 274 244 266 356 284" />
      </g>
      <rect x="402" y="214" width="88" height="45" fill={c.casa} />
      <path d="M394 217 L446 186 L498 217 Z" fill={c.teulada} />
      <path d="M434 259 V240 A12 12 0 0 1 458 240 V259 Z" fill={c.obertures} />
      <rect x="412" y="226" width="12" height="12" rx="2" fill={c.obertures} />
      <rect x="468" y="226" width="12" height="12" rx="2" fill={c.obertures} />
      <ellipse cx="512" cy="232" rx="8" ry="24" fill={c.xiprer} />
      <path d="M0 360 C140 326 280 326 420 344 C520 356 590 344 640 334 L640 480 L0 480 Z" fill={c.turo2} />
      <g fill="none" stroke={c.fileres2} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="0.1 13">
        <path d="M190 372 C290 352 380 354 470 364" />
        <path d="M200 392 C300 372 400 374 510 384" />
        <path d="M220 412 C320 392 420 394 560 404" />
      </g>
      <path d="M0 430 C200 410 420 440 640 420 L640 480 L0 480 Z" fill={c.banda} />
      <path d="M92 330 Q90 312 100 302" fill="none" stroke={c.tija} strokeWidth="4" strokeLinecap="round" />
      <path d="M98 318 C108 298 132 292 146 302 C140 322 118 330 98 318 Z" fill={c.fulla} />
      <g fill={c.raim} stroke={c.raimVora} strokeWidth="2">
        <circle cx="70" cy="346" r="15" /><circle cx="98" cy="344" r="15" /><circle cx="126" cy="346" r="15" />
        <circle cx="84" cy="372" r="15" /><circle cx="112" cy="372" r="15" />
        <circle cx="98" cy="398" r="15" />
      </g>
      <g fill={c.raimBrillantor}><circle cx="64" cy="340" r="4" /><circle cx="92" cy="338" r="4" /><circle cx="78" cy="366" r="4" /></g>
    </>
  )
}

// Tomàquet: cercle vermell, brillantor i calze en estrella (com la icona d'horta)
function Tomaquet({ cx, cy, r }) {
  const k = r / 27
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill="#E2603F" />
      <ellipse cx={-r * 0.4} cy={-r * 0.1} rx={r * 0.17} ry={r * 0.38} transform={`rotate(24 ${-r * 0.4} ${-r * 0.1})`} fill="#F4A28A" />
      <path
        transform={`scale(${k})`}
        d="M0 -26 L5 -19 L14 -22 L9 -15 L17 -10 L7 -11 L0 -5 L-5 -12 L-15 -10 L-8 -16 L-14 -22 L-5 -19 Z"
        fill="#C8D69B"
      />
    </g>
  )
}

function Horta() {
  return (
    <>
      <g className="visita-paisatge__halo">
        <circle cx="470" cy="130" r="86" fill="none" stroke="#E4BE5C" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      </g>
      <circle cx="470" cy="130" r="64" fill="#E4BE5C" />
      <circle cx="470" cy="130" r="46" fill="#F3DC96" />
      <path d="M120 92 q9 -9 18 0 q9 -9 18 0" fill="none" stroke="#E8EBD8" strokeWidth="2.5" strokeLinecap="round" />
      {/* muntanyes amb neu */}
      <path d="M0 300 L64 238 L112 268 L188 138 L238 206 L276 170 L338 264 L404 228 L470 270 L560 236 L640 282 L640 480 L0 480 Z" fill="#4E5A1C" />
      <path d="M176 164 L188 138 L214 174 Q205 168 199 178 Q192 167 185 175 Q181 168 176 164 Z" fill="#E8EBD8" />
      <path d="M252 190 L276 170 L290 190 Q283 185 278 193 Q271 185 264 192 Q258 189 252 190 Z" fill="#E8EBD8" />
      <path d="M0 290 C120 240 240 230 360 252 C460 270 540 240 640 226 L640 480 L0 480 Z" fill="#8E9C55" />
      {/* camps de la fondalada: franges més clares que segueixen el turó */}
      <path d="M0 316 C120 266 240 256 360 278 L360 296 C240 274 120 284 0 336 Z" fill="#9CAA62" />
      <path d="M360 278 C460 296 540 266 640 252 L640 272 C540 286 460 316 360 296 Z" fill="#9CAA62" />
      <g fill="none" stroke="#DCE6B4" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M20 300 C130 256 240 248 350 266" />
        <path d="M14 318 C130 274 244 266 356 284" />
      </g>
      {/* masia */}
      <rect x="402" y="214" width="88" height="45" fill="#F5F0E4" />
      <path d="M394 217 L446 186 L498 217 Z" fill="#B5562F" />
      <path d="M434 259 V240 A12 12 0 0 1 458 240 V259 Z" fill="#2F3A12" />
      <rect x="412" y="226" width="12" height="12" rx="2" fill="#2F3A12" />
      <rect x="468" y="226" width="12" height="12" rx="2" fill="#2F3A12" />
      <ellipse cx="512" cy="232" rx="8" ry="24" fill="#2F3A12" />
      {/* camp llaurat del primer pla */}
      <path d="M0 360 C140 326 280 326 420 344 C520 356 590 344 640 334 L640 480 L0 480 Z" fill="#A9B676" />
      <g fill="none" stroke="#E8EBD8" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="0.1 13">
        <path d="M190 372 C290 352 380 354 470 364" />
        <path d="M200 392 C300 372 400 374 510 384" />
        <path d="M220 412 C320 392 420 394 560 404" />
      </g>
      <path d="M0 430 C200 410 420 440 640 420 L640 480 L0 480 Z" fill="#3F4B17" />
      {/* tomaquera: tutor, fulles alternes i tomàquets en dos raims */}
      <rect x="95" y="284" width="6" height="156" rx="3" fill="#E4BE5C" />
      <path d="M98 436 C94 400 102 372 98 340 C96 322 98 306 100 292" fill="none" stroke="#4E5A1C" strokeWidth="6" strokeLinecap="round" />
      <g fill="#4E5A1C">
        <path d="M100 300 C106 282 126 276 140 284 C134 300 116 308 100 300 Z" />
        <path d="M98 330 C88 312 66 310 52 320 C58 338 80 344 98 330 Z" />
        <path d="M100 358 C112 342 134 342 146 352 C138 368 116 372 100 358 Z" />
      </g>
      <g fill="#6E7B2F">
        <path d="M97 296 C92 278 76 272 62 280 C68 296 84 302 97 296 Z" />
        <path d="M100 330 C112 316 130 316 142 324 C134 338 114 342 100 330 Z" />
        <path d="M98 366 C86 350 66 352 56 362 C62 378 84 380 98 366 Z" />
      </g>
      <Tomaquet cx={72} cy={384} r={21} />
      <Tomaquet cx={50} cy={416} r={15} />
      <Tomaquet cx={128} cy={378} r={23} />
      <Tomaquet cx={148} cy={414} r={16} />
      <Tomaquet cx={110} cy={420} r={14} />
      <circle cx="82" cy="342" r="8" fill="#A3B565" />
      <g fill="#E4BE5C"><circle cx="96" cy="286" r="5" /><circle cx="108" cy="290" r="4" /></g>
    </>
  )
}

// Cabra de perfil mirant a la dreta; l'origen és el centre del cos.
function Cabra({ x, y, escala = 1, mirallat = false }) {
  const sx = mirallat ? -escala : escala
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} ${escala})`}>
      <rect x="-17" y="4" width="7" height="22" rx="3.5" fill="#D9CDB0" />
      <rect x="11" y="4" width="7" height="22" rx="3.5" fill="#D9CDB0" />
      <path d="M-24 -2 C-24 -14 -10 -16 2 -16 C14 -16 24 -14 24 -2 C24 8 12 12 -2 12 C-14 12 -24 8 -24 -2 Z" fill="#F5F0E4" />
      <rect x="-9" y="6" width="7" height="22" rx="3.5" fill="#F5F0E4" />
      <rect x="3" y="6" width="7" height="22" rx="3.5" fill="#F5F0E4" />
      <path d="M-24 -6 L-34 -12 L-29 0 Z" fill="#F5F0E4" />
      <path d="M16 -10 L24 -30 C27 -36 35 -37 39 -33 C43 -29 41 -23 37 -21 L33 -17 C29 -9 25 -4 18 -2 Z" fill="#F5F0E4" />
      <path d="M26 -33 C22 -44 28 -50 35 -48 C31 -43 33 -38 33 -34 Z" fill="#8A6416" />
      <path d="M26 -26 L17 -26 L22 -19 Z" fill="#D9CDB0" />
      <path d="M38 -22 L41 -12 L34 -17 Z" fill="#F5F0E4" />
      <circle cx="35" cy="-28" r="2.2" fill="#2A2017" />
    </g>
  )
}

// Roda de formatge en perspectiva: cara superior clara, costat daurat i crosta gruixuda.
// (cx, cy) és el centre de la cara superior; `forats` són desplaçaments dins la cara.
function RodaFormatge({ cx, cy, rx, ry, h, forats }) {
  return (
    <g>
      <path
        d={`M${cx - rx} ${cy} V${cy + h} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h} V${cy} Z`}
        fill="#D9A441"
        stroke="#A9741A"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d={`M${cx - rx + 10} ${cy + h * 0.5} A${rx} ${ry} 0 0 0 ${cx + rx - 10} ${cy + h * 0.5}`} fill="none" stroke="#C98A26" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#FBF1D3" stroke="#A9741A" strokeWidth="5" />
      <g fill="#E8C877">
        {forats.map(([dx, dy]) => (
          <ellipse key={`${dx}-${dy}`} cx={cx + dx} cy={cy + dy} rx="5" ry="2.6" />
        ))}
      </g>
    </g>
  )
}

function Formatge() {
  return (
    <>
      <g className="visita-paisatge__halo">
        <circle cx="470" cy="130" r="86" fill="none" stroke="#FBF1D3" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      </g>
      <circle cx="470" cy="130" r="64" fill="#F7E7BD" />
      <circle cx="470" cy="130" r="46" fill="#FFF4D6" />
      <path d="M120 92 q9 -9 18 0 q9 -9 18 0" fill="none" stroke="#8A6416" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 290 C120 240 240 230 360 252 C460 270 540 240 640 226 L640 480 L0 480 Z" fill="#C99A35" />
      <g fill="none" stroke="#E3BE6A" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M20 300 C130 256 240 248 350 266" />
        <path d="M14 318 C130 274 244 266 356 284" />
      </g>
      <rect x="402" y="214" width="88" height="45" fill="#F5F0E4" />
      <path d="M394 217 L446 186 L498 217 Z" fill="#B5562F" />
      <path d="M434 259 V240 A12 12 0 0 1 458 240 V259 Z" fill="#4F3A22" />
      <rect x="412" y="226" width="12" height="12" rx="2" fill="#4F3A22" />
      <rect x="468" y="226" width="12" height="12" rx="2" fill="#4F3A22" />
      <ellipse cx="512" cy="232" rx="8" ry="24" fill="#4E5A1C" />
      <path d="M0 360 C140 326 280 326 420 344 C520 356 590 344 640 334 L640 480 L0 480 Z" fill="#B0802A" />
      <g fill="none" stroke="#D9B058" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="0.1 13">
        <path d="M30 392 C110 376 160 378 214 386" />
        <path d="M420 392 C480 380 540 380 600 390" />
        <path d="M440 412 C500 402 560 402 620 410" />
      </g>
      <Cabra x={262} y={376} escala={1.25} />
      <Cabra x={352} y={398} escala={1.1} mirallat />
      <Cabra x={436} y={372} escala={0.78} />
      <path d="M0 430 C200 410 420 440 640 420 L640 480 L0 480 Z" fill="#8A6416" />
      {/* dues rodes de formatge apilades al primer pla */}
      <RodaFormatge cx={104} cy={392} rx={66} ry={22} h={34} forats={[[-30, -4], [-6, 8], [24, -6], [44, 6], [-46, 8]]} />
      <RodaFormatge cx={104} cy={362} rx={50} ry={17} h={30} forats={[[-18, -3], [10, 5], [28, -4]]} />
    </>
  )
}

/**
 * Il·lustració de l'hero de la visita.
 * - familia: id de la família (vi, horta i formatge tenen il·lustració pròpia)
 * Decorativa (aria-hidden); la mida la fixa el contenidor.
 */
export default function PaisatgeVisita({ familia }) {
  const color = getFamilia(familia)?.color ?? '#6A2A47'
  let contingut
  if (familia === 'vi') contingut = <Vi c={PALETA_VI} />
  else if (familia === 'horta') contingut = <Horta />
  else if (familia === 'formatge') contingut = <Formatge />
  else contingut = <Vi c={paletaGenerica(color)} />

  return (
    <svg
      className="visita-paisatge"
      viewBox="0 0 640 480"
      aria-hidden="true"
      focusable="false"
    >
      {contingut}
    </svg>
  )
}
