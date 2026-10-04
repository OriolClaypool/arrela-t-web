// Caixa de producte fresc (maqueta inici.html, espai professional: "Ets productor?").

export default function IlustracioCaixa({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="62" cy="66" r="16" fill="#E2603F" stroke="#2A2017" strokeWidth="2.5" />
      <circle cx="146" cy="70" r="14" fill="#E2603F" stroke="#2A2017" strokeWidth="2.5" />
      <circle cx="120" cy="60" r="17" fill="#EE9A63" stroke="#2A2017" strokeWidth="2.5" />
      <circle cx="90" cy="56" r="18" fill="#6E7B2F" stroke="#2A2017" strokeWidth="2.5" />
      <path d="M90 38 C86 28 92 20 100 18 C102 28 96 34 90 38 Z" fill="#4E5A1C" stroke="#2A2017" strokeWidth="2" />
      <path d="M120 43 Q121 36 126 33" fill="none" stroke="#2A2017" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="34" y="72" width="132" height="56" rx="5" fill="#F5F0E4" stroke="#2A2017" strokeWidth="3" />
      <path d="M34 91 H166 M34 110 H166" stroke="#C99A35" strokeWidth="3" />
      <rect x="86" y="78" width="28" height="8" rx="4" fill="#2A2017" />
    </svg>
  )
}
