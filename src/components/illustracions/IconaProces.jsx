// Icones rodones dels passos del procés de la visita (maqueta visita.html, secció
// "El procés"): un cercle de color de la paleta amb formes plenes i gruixudes, sense
// línies primes. Les 5 del vi són copiades de la maqueta; les d'horta i formatge
// segueixen exactament el mateix estil.
// Clau: `${familia}.${pas}` (els passos són a src/data/processos.js).

// Tomàquet: cercle vermell, brillantor i calze en estrella (com la icona d'horta)
function Tomaquet({ cx, cy, r }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill="#E2603F" />
      <ellipse cx={-r * 0.4} cy={-r * 0.1} rx={r * 0.17} ry={r * 0.38} transform={`rotate(24 ${-r * 0.4} ${-r * 0.1})`} fill="#F4A28A" />
      <path
        transform={`scale(${r / 27})`}
        d="M0 -26 L5 -19 L14 -22 L9 -15 L17 -10 L7 -11 L0 -5 L-5 -12 L-15 -10 L-8 -16 L-14 -22 L-5 -19 Z"
        fill="#C8D69B"
      />
    </g>
  )
}

const ICONES = {
  // ── Vi (verbatim de la maqueta) ──────────────────────────────
  'vi.vinya': (
    <>
      <circle cx="60" cy="60" r="56" fill="#6E7B2F" />
      <path d="M30 96 H90" fill="none" stroke="#4E5A1C" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 96 C58 84 62 76 58 66 C55 58 48 54 40 52 M58 66 C64 58 72 56 80 54" fill="none" stroke="#4F3A22" strokeWidth="6" strokeLinecap="round" />
      <path d="M70 30 C76 22 90 24 92 34 C98 38 96 48 88 50 C84 58 72 58 70 50 C62 46 62 36 70 30 Z" fill="#A3B565" />
      <path d="M36 34 C30 30 24 34 24 40 C20 44 22 52 30 52 C34 58 44 56 44 48 C50 44 46 34 36 34 Z" fill="#C8D69B" />
      <g fill="#6A2A47"><circle cx="78" cy="64" r="5" /><circle cx="88" cy="64" r="5" /><circle cx="83" cy="72" r="5" /><circle cx="83" cy="80" r="4.5" /></g>
    </>
  ),
  'vi.verema': (
    <>
      <circle cx="60" cy="60" r="56" fill="#6A2A47" />
      <path d="M42 64 C42 40 78 40 78 64" fill="none" stroke="#C99A35" strokeWidth="5" strokeLinecap="round" />
      <g fill="#D597B4" stroke="#6A2A47" strokeWidth="1.5"><circle cx="50" cy="60" r="7" /><circle cx="62" cy="57" r="7" /><circle cx="74" cy="60" r="7" /><circle cx="56" cy="52" r="7" /><circle cx="68" cy="51" r="7" /></g>
      <path d="M34 64 H86 L80 92 Q60 98 40 92 Z" fill="#C99A35" />
      <path d="M38 74 H82 M40 84 H80" fill="none" stroke="#8A6416" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  'vi.premsa': (
    <>
      <circle cx="60" cy="60" r="56" fill="#B5562F" />
      <path d="M60 28 V66" fill="none" stroke="#2A2017" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 32 H78" fill="none" stroke="#2A2017" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 64 H80" fill="none" stroke="#2A2017" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 70 H86 V90 Q60 96 34 90 Z" fill="#E4BE5C" />
      <path d="M47 72 V91 M60 72 V93 M73 72 V91" fill="none" stroke="#B98A2C" strokeWidth="2.5" />
      <path d="M86 82 H94 V88" fill="none" stroke="#4F1E35" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="94" cy="96" r="4" fill="#4F1E35" />
    </>
  ),
  'vi.fermentacio': (
    <>
      <circle cx="60" cy="60" r="56" fill="#8A6416" />
      <g fill="#F5F0E4"><circle cx="50" cy="30" r="4" /><circle cx="62" cy="22" r="5" /><circle cx="72" cy="32" r="3.5" /></g>
      <path d="M32 46 Q60 38 88 46 Q94 62 88 78 Q60 86 32 78 Q26 62 32 46 Z" fill="#C99A35" stroke="#4F3A22" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 54 Q60 48 88 54 M32 70 Q60 76 88 70" fill="none" stroke="#8A6416" strokeWidth="2" />
      <path d="M42 43 Q37 62 42 81 M78 43 Q83 62 78 81" fill="none" stroke="#4F3A22" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 84 L36 96 M80 84 L84 96" fill="none" stroke="#4F3A22" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'vi.ampolla': (
    <>
      <circle cx="60" cy="60" r="56" fill="#1F4A34" />
      <rect x="54" y="14" width="12" height="8" rx="2" fill="#B5562F" />
      <path d="M55 20 H65 V40 Q74 44 74 54 V96 Q74 100 70 100 H50 Q46 100 46 96 V54 Q46 44 55 40 Z" fill="#6A2A47" />
      <rect x="50" y="62" width="20" height="22" rx="2" fill="#F5F0E4" />
      <path d="M55 70 H65 M57 76 H63" fill="none" stroke="#5E5040" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 52 V90" fill="none" stroke="#8E4064" strokeWidth="3" strokeLinecap="round" />
    </>
  ),

  // ── Formatge ─────────────────────────────────────────────────
  'formatge.pastura': (
    <>
      <circle cx="60" cy="60" r="56" fill="#6E7B2F" />
      <path d="M12 86 A56 56 0 0 0 108 86 Q60 80 12 86 Z" fill="#4E5A1C" />
      <path d="M26 90 L30 76 L35 90 Z M34 90 L40 72 L46 90 Z M88 90 L92 78 L96 90 Z" fill="#A3B565" />
      <rect x="39" y="68" width="8" height="24" rx="4" fill="#D9CDB0" />
      <rect x="72" y="68" width="8" height="24" rx="4" fill="#D9CDB0" />
      <path d="M30 66 C30 53 45 51 58 51 C72 51 83 53 83 66 C83 76 71 80 56 80 C41 80 30 76 30 66 Z" fill="#F5F0E4" />
      <rect x="48" y="70" width="8" height="22" rx="4" fill="#F5F0E4" />
      <rect x="63" y="70" width="8" height="22" rx="4" fill="#F5F0E4" />
      <path d="M31 62 L20 55 L26 69 Z" fill="#F5F0E4" />
      <path d="M75 59 L83 41 C86 35 94 34 98 38 C102 42 100 48 96 50 L92 54 C88 62 84 65 77 67 Z" fill="#F5F0E4" />
      <path d="M85 38 C81 28 87 22 94 24 C90 29 92 33 92 37 Z" fill="#E4BE5C" />
      <path d="M83 43 L74 43 L79 50 Z" fill="#D9CDB0" />
      <path d="M95 49 L98 58 L91 53 Z" fill="#F5F0E4" />
      <circle cx="92" cy="42" r="2.4" fill="#2A2017" />
    </>
  ),
  'formatge.munyida': (
    <>
      <circle cx="60" cy="60" r="56" fill="#1F4A34" />
      <path d="M36 54 C36 30 84 30 84 54" fill="none" stroke="#C9C0A8" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 54 H86 L80 94 Q60 100 40 94 Z" fill="#F5F0E4" />
      <ellipse cx="60" cy="54" rx="26" ry="7" fill="#FBF1D3" />
      <path d="M37.5 68 H82.5 L81.5 76 H38.5 Z" fill="#E4BE5C" />
      <g fill="#F5F0E4"><circle cx="24" cy="46" r="4.5" /><circle cx="97" cy="42" r="4" /><circle cx="20" cy="64" r="3.5" /></g>
    </>
  ),
  'formatge.quallada': (
    <>
      <circle cx="60" cy="60" r="56" fill="#B5562F" />
      <g fill="#F5F0E4"><circle cx="46" cy="30" r="4" /><circle cx="58" cy="22" r="5" /><circle cx="70" cy="32" r="3.5" /></g>
      <path d="M82 28 L62 62" fill="none" stroke="#4F3A22" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="85" cy="23" rx="7" ry="9" transform="rotate(28 85 23)" fill="#4F3A22" />
      <rect x="22" y="58" width="9" height="12" rx="4" fill="#2A2017" />
      <rect x="89" y="58" width="9" height="12" rx="4" fill="#2A2017" />
      <path d="M28 56 H92 L86 94 Q60 100 34 94 Z" fill="#E4BE5C" />
      <ellipse cx="60" cy="56" rx="32" ry="8" fill="#FBF1D3" />
      <g fill="#F5F0E4"><circle cx="48" cy="55" r="4" /><circle cx="62" cy="58" r="3.5" /><circle cx="74" cy="54" r="3" /></g>
      <path d="M32 74 H88" fill="none" stroke="#B98A2C" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'formatge.emmotllat': (
    <>
      <circle cx="60" cy="60" r="56" fill="#8A6416" />
      <path d="M30 94 H90" fill="none" stroke="#4F3A22" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 54 Q40 32 60 32 Q80 32 80 54 Z" fill="#FBF1D3" />
      <rect x="38" y="50" width="44" height="42" rx="7" fill="#F5F0E4" />
      <g fill="#8A6416">
        <circle cx="49" cy="61" r="3" /><circle cx="60" cy="61" r="3" /><circle cx="71" cy="61" r="3" />
        <circle cx="49" cy="72" r="3" /><circle cx="60" cy="72" r="3" /><circle cx="71" cy="72" r="3" />
        <circle cx="49" cy="83" r="3" /><circle cx="60" cy="83" r="3" /><circle cx="71" cy="83" r="3" />
      </g>
      <rect x="86" y="70" width="14" height="22" rx="4" fill="#E4BE5C" />
    </>
  ),
  'formatge.maduracio': (
    <>
      <circle cx="60" cy="60" r="56" fill="#4F3A22" />
      <rect x="24" y="60" width="72" height="6" rx="3" fill="#8A6416" />
      <rect x="24" y="90" width="72" height="6" rx="3" fill="#8A6416" />
      <path d="M28 60 V44 Q28 40 32 40 H50 Q54 40 54 44 V60 Z" fill="#E4BE5C" />
      <path d="M28 48 H54" fill="none" stroke="#FBF1D3" strokeWidth="4" strokeLinecap="round" />
      <path d="M58 60 V42 Q58 38 62 38 H80 Q84 38 84 42 V60 Z" fill="#E4BE5C" />
      <path d="M58 46 H84" fill="none" stroke="#FBF1D3" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 90 V72 Q28 68 32 68 H58 Q62 68 62 72 V90 Z" fill="#C99A35" />
      <path d="M28 76 H62" fill="none" stroke="#E8C877" strokeWidth="4" strokeLinecap="round" />
      <path d="M66 90 V76 Q66 72 70 72 H88 Q92 72 92 76 V90 Z" fill="#E4BE5C" />
      <path d="M66 80 H92" fill="none" stroke="#FBF1D3" strokeWidth="4" strokeLinecap="round" />
    </>
  ),

  // ── Horta ────────────────────────────────────────────────────
  'horta.llavor': (
    <>
      <circle cx="60" cy="60" r="56" fill="#B5562F" />
      <path d="M38 38 H82 V94 Q60 100 38 94 Z" fill="#F5F0E4" />
      <path d="M38 38 H82 V50 H38 Z" fill="#E8D9B0" />
      <rect x="57" y="66" width="6" height="20" rx="3" fill="#6E7B2F" />
      <path d="M60 70 C51 70 46 63 46 56 C55 56 60 62 60 70 Z" fill="#6E7B2F" />
      <path d="M60 68 C69 68 74 61 74 54 C65 54 60 60 60 68 Z" fill="#A3B565" />
      <g fill="#E4BE5C">
        <ellipse cx="92" cy="86" rx="5" ry="3.5" transform="rotate(-25 92 86)" />
        <ellipse cx="100" cy="94" rx="5" ry="3.5" transform="rotate(15 100 94)" />
        <ellipse cx="86" cy="98" rx="5" ry="3.5" transform="rotate(-8 86 98)" />
      </g>
    </>
  ),
  'horta.planter': (
    <>
      <circle cx="60" cy="60" r="56" fill="#6E7B2F" />
      <path d="M60 70 V46" fill="none" stroke="#4E5A1C" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 54 C48 56 38 48 36 36 C50 34 60 42 60 54 Z" fill="#C8D69B" />
      <path d="M60 50 C72 50 82 42 84 30 C70 28 60 36 60 50 Z" fill="#E8EBD8" />
      <path d="M43 74 H77 L73 96 Q60 100 47 96 Z" fill="#B5562F" />
      <rect x="38" y="66" width="44" height="10" rx="5" fill="#8F3F1F" />
      <path d="M26 96 H94" fill="none" stroke="#4E5A1C" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'horta.cultiu': (
    <>
      <circle cx="60" cy="60" r="56" fill="#7FAAB7" />
      <circle cx="84" cy="34" r="12" fill="#E4BE5C" />
      <circle cx="84" cy="34" r="7" fill="#F3DC96" />
      <path d="M6.3 76 Q36 56 62 66 Q88 76 116 62 A56 56 0 0 1 6.3 76 Z" fill="#6E7B2F" />
      <path d="M9.4 84 H110.6 A56 56 0 0 1 9.4 84 Z" fill="#8A6416" />
      <g fill="#A3B565">
        <circle cx="30" cy="90" r="5.5" /><circle cx="46" cy="90" r="5.5" /><circle cx="62" cy="90" r="5.5" /><circle cx="78" cy="90" r="5.5" /><circle cx="94" cy="90" r="5.5" />
        <circle cx="38" cy="100" r="5" /><circle cx="60" cy="101" r="5" /><circle cx="82" cy="100" r="5" />
      </g>
      <g fill="#F5F0E4">
        <path d="M30 22 C27 28 26 30 26 33 A4 4 0 0 0 34 33 C34 30 33 28 30 22 Z" />
        <path d="M46 34 C43 40 42 42 42 45 A4 4 0 0 0 50 45 C50 42 49 40 46 34 Z" />
        <path d="M24 44 C21 50 20 52 20 55 A4 4 0 0 0 28 55 C28 52 27 50 24 44 Z" />
      </g>
    </>
  ),
  'horta.collita': (
    <>
      <circle cx="60" cy="60" r="56" fill="#8A6416" />
      <path d="M20 40 C40 26 72 26 100 44" fill="none" stroke="#A3B565" strokeWidth="6" strokeLinecap="round" />
      <path d="M38 36 C32 24 42 16 52 20 C50 30 46 34 38 36 Z" fill="#C8D69B" />
      <path d="M80 36 C84 24 96 22 102 28 C98 36 90 40 80 36 Z" fill="#C8D69B" />
      <Tomaquet cx={40} cy={62} r={16} />
      <Tomaquet cx={68} cy={72} r={20} />
      <Tomaquet cx={92} cy={58} r={13} />
    </>
  ),
  'horta.cistella': (
    <>
      <circle cx="60" cy="60" r="56" fill="#1F4A34" />
      <path d="M32 58 C32 22 88 22 88 58" fill="none" stroke="#C99A35" strokeWidth="5" strokeLinecap="round" />
      <circle cx="46" cy="52" r="11" fill="#E2603F" />
      <circle cx="43" cy="49" r="3" fill="#F4A28A" />
      <path d="M58 54 C56 40 68 32 78 38 C86 44 84 54 80 58 Z" fill="#A3B565" />
      <path d="M72 58 C70 48 74 42 82 40 C84 48 82 54 76 60 Z" fill="#C8D69B" />
      <path d="M26 58 H94 L86 92 Q84 98 78 98 H42 Q36 98 34 92 Z" fill="#E4BE5C" />
      <rect x="22" y="54" width="76" height="10" rx="5" fill="#C99A35" />
      <path d="M30 76 H90 M34 88 H86" fill="none" stroke="#C99A35" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
}

/**
 * Icona d'un pas del procés.
 * - familia: id de la família (vi, formatge, horta)
 * - pas: id del pas (vegeu src/data/processos.js)
 * - mida: costat en px (per defecte 112)
 * Decorativa (aria-hidden).
 */
export default function IconaProces({ familia, pas, mida = 112 }) {
  const contingut = ICONES[`${familia}.${pas}`]
  if (!contingut) return null

  return (
    <svg viewBox="0 0 120 120" width={mida} height={mida} aria-hidden="true" focusable="false" style={{ display: 'block', flex: '0 0 auto' }}>
      {contingut}
    </svg>
  )
}
