// Calendari amb un brot: estat buit de /agenda (mateix traç que les il·lustracions de
// l'espai professional). Els colors són hexadecimals perquè var(--...) no es resol en
// atributs SVG.

export default function IlustracioAgenda({ className }) {
  return (
    <svg className={className} viewBox="0 0 220 170" aria-hidden="true" focusable="false">
      <ellipse cx="108" cy="154" rx="86" ry="9" fill="#EDE5D2" />
      <rect x="30" y="34" width="150" height="112" rx="14" fill="#FFFBF2" stroke="#2A2017" strokeWidth="3" />
      <path d="M30 48 A14 14 0 0 1 44 34 H166 A14 14 0 0 1 180 48 V68 H30 Z" fill="#B5562F" stroke="#2A2017" strokeWidth="3" strokeLinejoin="round" />
      <rect x="58" y="22" width="10" height="26" rx="5" fill="#2A2017" />
      <rect x="142" y="22" width="10" height="26" rx="5" fill="#2A2017" />
      <g fill="#E6DCC6">
        <circle cx="58" cy="90" r="7" />
        <circle cx="86" cy="90" r="7" />
        <circle cx="114" cy="90" r="7" />
        <circle cx="142" cy="90" r="7" />
        <circle cx="58" cy="116" r="7" />
        <circle cx="86" cy="116" r="7" />
        <circle cx="142" cy="116" r="7" />
      </g>
      <circle cx="114" cy="116" r="9" fill="#E4BE5C" stroke="#2A2017" strokeWidth="2.5" />
      <path d="M176 142 V114" fill="none" stroke="#4E5A1C" strokeWidth="4" strokeLinecap="round" />
      <path d="M176 126 C164 126 156 118 154 106 C166 106 176 114 176 126 Z" fill="#6E7B2F" stroke="#2A2017" strokeWidth="2" strokeLinejoin="round" />
      <path d="M176 120 C188 120 196 112 198 100 C186 100 176 108 176 120 Z" fill="#A3B565" stroke="#2A2017" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
