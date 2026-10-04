// Silueta de marcador per a la foto d'una persona de l'equip: s'oculta quan hi ha foto
// real (src/data/equip.js). Plena i arrodonida; el color el posa el contenidor (color).

export default function SilhuetaPersona({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <path d="M26 206 C26 150 66 128 100 128 C134 128 174 150 174 206 Z" fill="currentColor" />
      <circle cx="100" cy="78" r="40" fill="currentColor" />
    </svg>
  )
}
