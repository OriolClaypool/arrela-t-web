// Icones dels quatre principis de /qui-som: formes plenes i arrodonides sobre una forma
// orgànica (com les icones de família). Els colors són hexadecimals perquè var(--...)
// no es resol en atributs SVG.
// - principi: 'hi-anem' | 'escoltem' | 'futur' | 'pont'

const BLOBS = {
  'hi-anem': ['M60 6 C88 4 114 24 114 56 C114 90 92 116 58 114 C26 112 6 92 6 60 C6 30 30 8 60 6 Z', '#B5562F'],
  escoltem: ['M62 5 C94 8 116 32 112 64 C108 96 84 116 54 113 C24 110 4 86 8 56 C12 26 32 3 62 5 Z', '#E4BE5C'],
  futur: ['M56 7 C84 2 112 20 115 52 C118 86 96 112 62 115 C30 118 5 94 6 62 C7 32 28 12 56 7 Z', '#6E7B2F'],
  pont: ['M64 6 C92 10 114 34 113 62 C112 92 88 114 58 114 C28 114 6 90 7 60 C8 30 36 3 64 6 Z', '#6A2A47'],
}

const GLIFS = {
  'hi-anem': (
    <>
      <path d="M60 92 C60 92 36 70 36 52 A24 24 0 0 1 84 52 C84 70 60 92 60 92 Z" fill="#FFFBF2" />
      <circle cx="60" cy="52" r="10" fill="#B5562F" />
      <path d="M32 102 H88" fill="none" stroke="#FFFBF2" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 9" />
    </>
  ),
  escoltem: (
    <>
      <path d="M30 40 Q30 28 42 28 H78 Q90 28 90 40 V64 Q90 76 78 76 H58 L42 92 V76 Q30 76 30 64 Z" fill="#FFFBF2" />
      <g fill="#2A2017">
        <circle cx="46" cy="52" r="5" />
        <circle cx="60" cy="52" r="5" />
        <circle cx="74" cy="52" r="5" />
      </g>
    </>
  ),
  futur: (
    <>
      <path d="M26 92 Q60 70 94 92 L94 98 L26 98 Z" fill="#4E5A1C" />
      <path d="M60 88 V50" fill="none" stroke="#F5F0E4" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 58 C47 58 37 50 35 37 C49 37 60 45 60 58 Z" fill="#C8D69B" />
      <path d="M60 52 C73 52 83 44 85 31 C71 31 60 39 60 52 Z" fill="#F5F0E4" />
    </>
  ),
  pont: (
    <>
      <rect x="14" y="50" width="92" height="11" rx="5.5" fill="#FFFBF2" />
      <rect x="24" y="60" width="72" height="32" fill="#FFFBF2" />
      <path d="M30 92 A13 13 0 0 1 56 92 Z" fill="#6A2A47" />
      <path d="M64 92 A13 13 0 0 1 90 92 Z" fill="#6A2A47" />
      <path d="M22 102 q9 -6 18 0 t18 0 t18 0 t18 0" fill="none" stroke="#D597B4" strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
}

export default function IlustracioPrincipi({ principi, className }) {
  const blob = BLOBS[principi]
  if (!blob) return null

  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d={blob[0]} fill={blob[1]} />
      {GLIFS[principi]}
    </svg>
  )
}
