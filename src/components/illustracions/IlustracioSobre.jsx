// Sobre amb una fulla (maqueta inici.html, secció "La carta del camp").

export default function IlustracioSobre({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M96 36 C100 16 120 6 136 10 C132 28 116 38 96 36 Z" fill="#6E7B2F" />
      <path d="M100 34 C110 24 120 18 130 14" fill="none" stroke="#4E5A1C" strokeWidth="2" strokeLinecap="round" />
      <rect x="16" y="32" width="128" height="80" rx="8" fill="#F5F0E4" />
      <path d="M16 40 L80 82 L144 40" fill="none" stroke="#B5562F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="112" y="46" width="22" height="26" rx="2" fill="#E4BE5C" />
    </svg>
  )
}
