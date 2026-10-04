// Icones plenes i arrodonides per a les dades d'una fitxa (llocs, repartiment, comanda).
// Hereten el color amb currentColor; la mida la fixa qui les usa.
// - tipus: 'pin' | 'camio' | 'caixa'

const ICONES = {
  pin: (
    <path
      fillRule="evenodd"
      d="M12 2 A8 8 0 0 0 4 10 C4 15.5 12 22 12 22 C12 22 20 15.5 20 10 A8 8 0 0 0 12 2 Z M12 7 A3 3 0 1 1 12 13 A3 3 0 0 1 12 7 Z"
    />
  ),
  camio: (
    <>
      <path d="M2 6 A2 2 0 0 1 4 4 H13 A2 2 0 0 1 15 6 V16 H2 Z" />
      <path d="M16 9 H19.2 L22 12.4 V16 H16 Z" />
      <circle cx="7" cy="17.5" r="2.6" stroke="#FFFBF2" strokeWidth="1.6" />
      <circle cx="18" cy="17.5" r="2.6" stroke="#FFFBF2" strokeWidth="1.6" />
    </>
  ),
  caixa: (
    <>
      <path d="M12 2 L21 6.5 L12 11 L3 6.5 Z" opacity="0.55" />
      <path d="M3 8 L11 12 V22 L3 18 Z" />
      <path d="M21 8 L13 12 V22 L21 18 Z" opacity="0.8" />
    </>
  ),
}

export default function IconaInfo({ tipus, mida = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={mida}
      height={mida}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={{ flex: '0 0 auto' }}
    >
      {ICONES[tipus]}
    </svg>
  )
}
