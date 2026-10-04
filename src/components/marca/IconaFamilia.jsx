// Les 8 icones de família del sistema visual (font: design/icones/familia-*.svg).
// Formes plenes i arrodonides sobre un blob orgànic del color de la família.
// Cap línia fina decorativa, mai una biblioteca d'icones.

const ICONES = {
  vi: (
    <>
      <path d="M60 6 C88 4 114 24 114 56 C114 90 92 116 58 114 C26 112 6 92 6 60 C6 30 30 8 60 6 Z" fill="#6A2A47" />
      <path d="M60 41 Q59 31 66 25" fill="none" stroke="#F5F0E4" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 35 C70 23 84 19 92 25 C88 37 76 43 64 35 Z" fill="#A3B565" />
      <g fill="#D597B4" stroke="#6A2A47" strokeWidth="1.5">
        <circle cx="46" cy="50" r="8" />
        <circle cx="61" cy="49" r="8" />
        <circle cx="76" cy="50" r="8" />
        <circle cx="53" cy="63" r="8" />
        <circle cx="69" cy="63" r="8" />
        <circle cx="61" cy="76" r="8" />
      </g>
      <g fill="#F3D8E4">
        <circle cx="43" cy="47" r="2.2" />
        <circle cx="58" cy="46" r="2.2" />
        <circle cx="50" cy="60" r="2.2" />
      </g>
    </>
  ),
  formatge: (
    <>
      <path d="M62 5 C94 8 116 32 112 64 C108 96 84 116 54 113 C24 110 4 86 8 56 C12 26 32 3 62 5 Z" fill="#E4BE5C" />
      <g transform="translate(4 0)">
        <path d="M52 60 L76.2 46 A28 28 0 1 0 76.2 74 Z" fill="#FBF1D3" />
        <path d="M76.2 46 A28 28 0 1 0 76.2 74" fill="none" stroke="#A9741A" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 60 L84.2 46 A28 28 0 0 1 84.2 74 Z" fill="#FBF1D3" />
        <path d="M84.2 46 A28 28 0 0 1 84.2 74" fill="none" stroke="#A9741A" strokeWidth="5" strokeLinecap="round" />
        <g fill="#E8C877">
          <circle cx="40" cy="52" r="2.2" />
          <circle cx="36" cy="66" r="1.8" />
          <circle cx="48" cy="72" r="2.2" />
          <circle cx="57" cy="47" r="1.8" />
          <circle cx="74" cy="62" r="1.8" />
        </g>
      </g>
    </>
  ),
  horta: (
    <>
      <path d="M56 7 C84 2 112 20 115 52 C118 86 96 112 62 115 C30 118 5 94 6 62 C7 32 28 12 56 7 Z" fill="#6E7B2F" />
      <circle cx="60" cy="66" r="27" fill="#E2603F" />
      <path d="M39 72 A22 22 0 0 1 43 58" fill="none" stroke="#F4A28A" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 40 L65 47 L74 44 L69 51 L77 56 L67 55 L60 61 L55 54 L45 56 L52 50 L46 44 L55 47 Z" fill="#C8D69B" />
      <path d="M60 43 Q61 33 67 29" fill="none" stroke="#C8D69B" strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  fruita: (
    <>
      <path d="M64 6 C92 10 114 34 113 62 C112 92 88 114 58 114 C28 114 6 90 7 60 C8 30 36 3 64 6 Z" fill="#EE9A63" />
      <path d="M66 30 C60 44 52 54 48 62" fill="none" stroke="#4E5A1C" strokeWidth="3" strokeLinecap="round" />
      <path d="M66 30 C68 44 72 54 74 60" fill="none" stroke="#4E5A1C" strokeWidth="3" strokeLinecap="round" />
      <path d="M66 30 C72 20 86 18 93 24 C87 34 75 36 66 30 Z" fill="#4E7A2F" />
      <circle cx="46" cy="73" r="13" fill="#A3233A" />
      <circle cx="76" cy="71" r="13" fill="#A3233A" />
      <circle cx="41" cy="68" r="3.4" fill="#E06C80" />
      <circle cx="71" cy="66" r="3.4" fill="#E06C80" />
    </>
  ),
  oli: (
    <>
      <path d="M62 5 C94 8 116 32 112 64 C108 96 84 116 54 113 C24 110 4 86 8 56 C12 26 32 3 62 5 Z" fill="#B9C49B" />
      <g transform="translate(-4 0)">
        <path d="M56 28 C56 28 34 56 34 72 A22 22 0 0 0 78 72 C78 56 56 28 56 28 Z" fill="#A07F18" />
        <path d="M43 73 A13 13 0 0 0 51 85" fill="none" stroke="#F2DE8E" strokeWidth="4" strokeLinecap="round" />
        <path d="M72 37 C78 27 90 25 96 31 C90 39 80 41 72 37 Z" fill="#4E5A1C" />
        <ellipse cx="83" cy="47" rx="5.5" ry="7" fill="#2F3A12" transform="rotate(-20 83 47)" />
      </g>
    </>
  ),
  ramaderia: (
    <>
      <path d="M56 7 C84 2 112 20 115 52 C118 86 96 112 62 115 C30 118 5 94 6 62 C7 32 28 12 56 7 Z" fill="#B5562F" />
      <path d="M52 42 C52 28 68 28 68 42" fill="none" stroke="#F5F0E4" strokeWidth="5" strokeLinecap="round" />
      <path d="M46 42 Q60 38 74 42 L82 80 Q60 88 38 80 Z" fill="#E4BE5C" />
      <path d="M42 68 Q60 73 78 68" fill="none" stroke="#B98A2C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="88" r="6" fill="#2A2017" />
    </>
  ),
  mel: (
    <>
      <path d="M64 6 C92 10 114 34 113 62 C112 92 88 114 58 114 C28 114 6 90 7 60 C8 30 36 3 64 6 Z" fill="#C98A26" />
      <path d="M56 78 C56 88 57 94 60 95 C63 94 64 88 64 78 Z" fill="#F6D57E" />
      <g fill="#F6D57E" stroke="#8E5C10" strokeWidth="3" strokeLinejoin="round">
        <path d="M48.7 37 L60 43.5 L60 56.5 L48.7 63 L37.4 56.5 L37.4 43.5 Z" />
        <path d="M71.3 37 L82.6 43.5 L82.6 56.5 L71.3 63 L60 56.5 L60 43.5 Z" />
        <path d="M60 56.5 L71.3 63 L71.3 76 L60 82.5 L48.7 76 L48.7 63 Z" />
      </g>
      <ellipse cx="88" cy="31" rx="5" ry="3.6" fill="#F5F0E4" transform="rotate(-25 88 31)" />
      <ellipse cx="88" cy="39" rx="7.5" ry="5.5" fill="#2A2017" />
      <path d="M85 34.5 V43.5 M90 34.5 V43.5" fill="none" stroke="#F6D57E" strokeWidth="2" />
    </>
  ),
  pesca: (
    <>
      <path d="M60 6 C88 4 114 24 114 56 C114 90 92 116 58 114 C26 112 6 92 6 60 C6 30 30 8 60 6 Z" fill="#8EB9C4" />
      <g transform="translate(-3 0)">
        <path d="M30 58 C42 42 70 42 82 58 C70 74 42 74 30 58 Z" fill="#2F5E6E" />
        <path d="M80 58 L96 45 L93 58 L96 71 Z" fill="#2F5E6E" />
        <circle cx="42" cy="55" r="3.2" fill="#F5F0E4" />
        <path d="M52 49 Q47 58 52 67" fill="none" stroke="#8EB9C4" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M29 86 q8 -6 16 0 t16 0 t16 0 t16 0" fill="none" stroke="#2F5E6E" strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  ),
}

/**
 * Icona d'una família de producte.
 * - familia: id de la família (vi, formatge, horta, fruita, oli, ramaderia, mel, pesca)
 * - mida: costat en px (per defecte 112)
 * - titol: si s'indica, la icona és informativa (role="img" + <title>);
 *   altrament és decorativa (aria-hidden).
 */
export default function IconaFamilia({ familia, mida = 112, titol, className, style }) {
  const contingut = ICONES[familia]
  if (!contingut) return null

  const comuns = {
    viewBox: '0 0 120 120',
    width: mida,
    height: mida,
    className,
    style: { display: 'block', flex: '0 0 auto', ...style },
  }

  if (titol) {
    return (
      <svg {...comuns} role="img">
        <title>{titol}</title>
        {contingut}
      </svg>
    )
  }

  return (
    <svg {...comuns} aria-hidden="true" focusable="false">
      {contingut}
    </svg>
  )
}
