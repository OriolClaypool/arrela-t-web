// Il·lustració de la pàgina 404: un pin de mapa perdut entre turons, amb un camí de
// punts que s'acaba abans d'arribar enlloc. El pin flota (.perdut__pin, a index.css;
// s'apaga amb prefers-reduced-motion). Els colors són hexadecimals perquè var(--...)
// no es resol en atributs SVG.

export default function IlustracioPerdut({ className }) {
  return (
    <svg className={className} viewBox="0 0 440 300" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="perdut-retall">
          <rect width="440" height="300" rx="36" />
        </clipPath>
      </defs>
      <g clipPath="url(#perdut-retall)">
        <rect width="440" height="300" fill="#EDE5D2" />
        <circle cx="350" cy="64" r="34" fill="#F3B48A" />
        <circle cx="350" cy="64" r="48" fill="none" stroke="#EE9A63" strokeWidth="3" strokeDasharray="2 13" strokeLinecap="round" />
        <path d="M0 176 C60 130 120 124 190 150 C250 172 300 136 360 128 C400 124 424 138 440 146 L440 300 L0 300 Z" fill="#C5D3CC" />
        <path d="M0 214 C70 184 140 182 220 202 C290 220 350 196 440 190 L440 300 L0 300 Z" fill="#AFBD8E" />
        <path d="M0 252 C90 230 170 232 250 246 C330 260 390 244 440 238 L440 300 L0 300 Z" fill="#6E7B2F" />
        <g fill="none" stroke="#4E5A1C" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 11">
          <path d="M24 268 C110 250 190 252 270 264" />
          <path d="M250 232 C310 224 370 224 420 230" />
        </g>
        <path d="M0 284 C120 272 280 290 440 276 L440 300 L0 300 Z" fill="#1F4A34" />

        {/* Camí de punts que no porta enlloc */}
        <path
          d="M52 284 C96 262 150 262 178 242 C206 222 160 204 190 190"
          fill="none"
          stroke="#F5F0E4"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="0.1 14"
        />

        {/* Pin perdut */}
        <ellipse cx="220" cy="198" rx="26" ry="6" fill="#2A2017" opacity="0.16" />
        <g className="perdut__pin">
          <g transform="translate(220 190) rotate(12)">
            <path d="M0 0 C-10 -14 -30 -28 -30 -52 A30 30 0 1 1 30 -52 C30 -28 10 -14 0 0 Z" fill="#B5562F" stroke="#FFFBF2" strokeWidth="4" />
            <circle cx="0" cy="-52" r="14" fill="#FFFBF2" />
            <path d="M-5 -57 Q-5 -62 0 -62 Q5 -62 5 -57 Q5 -53 0 -51 V-48" fill="none" stroke="#B5562F" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="0" cy="-43" r="2.2" fill="#B5562F" />
          </g>
        </g>
      </g>
    </svg>
  )
}

