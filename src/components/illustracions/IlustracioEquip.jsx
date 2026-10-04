// Composició orgànica de la capçalera de /qui-som: quatre formes de base (sistema.html,
// "Formes i textures") amb una càmera, un brot i un pin, i tres icones de família
// girant al voltant. Mai un cercle perfecte. Els colors són hexadecimals perquè
// var(--...) no es resol en atributs SVG.

import IconaFamilia from '../marca/IconaFamilia'

const BLOB_1 = 'M60 6 C88 4 114 24 114 56 C114 90 92 116 58 114 C26 112 6 92 6 60 C6 30 30 8 60 6 Z'
const BLOB_2 = 'M62 5 C94 8 116 32 112 64 C108 96 84 116 54 113 C24 110 4 86 8 56 C12 26 32 3 62 5 Z'
const BLOB_3 = 'M56 7 C84 2 112 20 115 52 C118 86 96 112 62 115 C30 118 5 94 6 62 C7 32 28 12 56 7 Z'
const BLOB_4 = 'M64 6 C92 10 114 34 113 62 C112 92 88 114 58 114 C28 114 6 90 7 60 C8 30 36 3 64 6 Z'

export default function IlustracioEquip({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 440"
      aria-hidden="true"
      focusable="false"
    >
      {/* Formes de base */}
      <path d={BLOB_4} fill="#F6E2D3" transform="translate(0 262) scale(1.05)" />
      <path d={BLOB_2} fill="#1F4A34" transform="translate(310 0) scale(1.62)" />
      <path d={BLOB_3} fill="#E4BE5C" transform="translate(338 244) scale(1.5)" />
      <path d={BLOB_1} fill="#B5562F" transform="translate(64 86) scale(2.7)" />

      {/* Fileres de ceps sobre el verd */}
      <g fill="none" stroke="#E4BE5C" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 11">
        <path d="M340 150 C380 138 430 138 470 148" />
        <path d="M334 170 C376 158 430 158 478 168" />
      </g>

      {/* Càmera */}
      <g>
        <rect x="150" y="190" width="150" height="104" rx="18" fill="#F5F0E4" />
        <rect x="200" y="172" width="52" height="26" rx="8" fill="#F5F0E4" />
        <circle cx="225" cy="242" r="34" fill="#1F4A34" />
        <circle cx="225" cy="242" r="20" fill="#D3E3E6" />
        <circle cx="218" cy="235" r="6" fill="#F5F0E4" />
        <circle cx="282" cy="212" r="8" fill="#E4BE5C" />
      </g>

      {/* Brot (sobre el verd) */}
      <g>
        <path d="M406 120 V70" fill="none" stroke="#F5F0E4" strokeWidth="6" strokeLinecap="round" />
        <path d="M406 84 C390 84 376 74 372 58 C392 58 406 68 406 84 Z" fill="#A3B565" />
        <path d="M406 74 C422 74 436 64 440 48 C420 48 406 58 406 74 Z" fill="#F5F0E4" />
        <path d="M382 122 H430" fill="none" stroke="#EE9A63" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Pin (sobre el blat) */}
      <g transform="translate(426 354)">
        <path d="M0 40 C-6 30 -26 14 -26 -4 A26 26 0 1 1 26 -4 C26 14 6 30 0 40 Z" fill="#B5562F" />
        <circle cx="0" cy="-4" r="10" fill="#FFFBF2" />
      </g>

      {/* Icones de família */}
      <g transform="translate(188 4)"><IconaFamilia familia="vi" mida={92} /></g>
      <g transform="translate(6 120)"><IconaFamilia familia="formatge" mida={84} /></g>
      <g transform="translate(176 336)"><IconaFamilia familia="horta" mida={96} /></g>
    </svg>
  )
}
