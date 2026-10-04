// Botiga amb tendal (maqueta inici.html, espai professional: "Tens botiga o restaurant?").

export default function IlustracioBotiga({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="26" y="18" width="148" height="10" rx="4" fill="#2A2017" />
      <rect x="36" y="58" width="128" height="72" fill="#FFFBF2" stroke="#2A2017" strokeWidth="3" />
      <path d="M30 26 H50 V56 Q40 68 30 56 Z" fill="#B5562F" />
      <path d="M50 26 H70 V56 Q60 68 50 56 Z" fill="#FFFBF2" stroke="#2A2017" strokeWidth="1.5" />
      <path d="M70 26 H90 V56 Q80 68 70 56 Z" fill="#B5562F" />
      <path d="M90 26 H110 V56 Q100 68 90 56 Z" fill="#FFFBF2" stroke="#2A2017" strokeWidth="1.5" />
      <path d="M110 26 H130 V56 Q120 68 110 56 Z" fill="#B5562F" />
      <path d="M130 26 H150 V56 Q140 68 130 56 Z" fill="#FFFBF2" stroke="#2A2017" strokeWidth="1.5" />
      <path d="M150 26 H170 V56 Q160 68 150 56 Z" fill="#B5562F" />
      <rect x="48" y="76" width="58" height="40" rx="4" fill="#D3E3E6" stroke="#2A2017" strokeWidth="2.5" />
      <path d="M52 108 H102" stroke="#2A2017" strokeWidth="2" />
      <circle cx="62" cy="101" r="6" fill="#E2603F" />
      <circle cx="76" cy="101" r="6" fill="#E4BE5C" />
      <circle cx="90" cy="101" r="6" fill="#6E7B2F" />
      <rect x="118" y="76" width="32" height="54" rx="4" fill="#1F4A34" />
      <circle cx="143" cy="104" r="2.5" fill="#E4BE5C" />
    </svg>
  )
}
