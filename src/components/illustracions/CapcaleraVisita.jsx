import { getFamilia } from '../../data/families'

// Capçaleres il·lustrades de la targeta de visita (maqueta inici.html, secció
// "Les visites"). Tres capçaleres copiades de la maqueta: vi (rengles de vinya),
// horta (muntanyes, camps i masia) i formatge (turons daurats, masia i cabres).
// Qualsevol altra família rep una capçalera genèrica de turons en capes pintada
// amb el color de la família (capes fosques i clares translúcides, de manera que
// funciona amb qualsevol color).
// Els colors són hexadecimals perquè var(--...) no es resol en atributs SVG.

const CAPCALERES = {
  vi: (
    <>
      <rect width="400" height="275" fill="#6A2A47" />
      <circle cx="300" cy="78" r="34" fill="#EE9A63" />
      <path d="M0 170 C90 140 170 136 260 150 C320 160 360 150 400 140 L400 275 L0 275 Z" fill="#84395C" />
      <path d="M0 182 C80 160 160 156 240 166" fill="none" stroke="#A9547A" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12" />
      <path d="M0 210 C100 180 200 176 300 192 C350 200 380 196 400 190 L400 275 L0 275 Z" fill="#9E4C72" />
      <g fill="none" stroke="#E9C3D6" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M20 222 C120 194 210 192 300 206" />
        <path d="M10 240 C120 212 214 210 320 226" />
        <path d="M4 258 C120 232 220 230 340 246" />
      </g>
    </>
  ),
  horta: (
    <>
      <rect width="400" height="275" fill="#6E7B2F" />
      <circle cx="92" cy="70" r="26" fill="#E4BE5C" />
      <path d="M60 182 L150 72 L172 110 L186 118 L202 104 L222 66 L310 172 L400 160 L400 275 L0 275 L0 190 Z" fill="#4E5A1C" />
      <path d="M144 80 L150 72 L157 84 Q152 81 149 87 Q147 80 144 80 Z" fill="#E8EBD8" />
      <path d="M216 74 L222 66 L229 78 Q224 75 221 81 Q219 74 216 74 Z" fill="#E8EBD8" />
      <path d="M0 204 C80 186 170 190 250 202 C320 212 360 204 400 198 L400 275 L0 275 Z" fill="#8E9C55" />
      <path d="M0 236 C90 218 200 224 300 234 C350 240 380 236 400 232 L400 275 L0 275 Z" fill="#A9B676" />
      <g fill="#4E5A1C"><circle cx="56" cy="204" r="9" /><circle cx="78" cy="200" r="11" /><circle cx="330" cy="208" r="10" /><circle cx="352" cy="204" r="8" /></g>
      <rect x="190" y="214" width="34" height="22" fill="#F5F0E4" />
      <path d="M185 216 L207 200 L229 216 Z" fill="#B5562F" />
      <rect x="203" y="224" width="8" height="12" rx="4" fill="#2A2017" />
    </>
  ),
  formatge: (
    <>
      <rect width="400" height="275" fill="#E4BE5C" />
      <circle cx="318" cy="68" r="30" fill="#F7E7BD" />
      <path d="M0 160 C100 128 190 126 280 142 C340 152 370 146 400 140 L400 275 L0 275 Z" fill="#C99A35" />
      <rect x="172" y="110" width="36" height="24" fill="#F5F0E4" />
      <path d="M167 112 L190 96 L213 112 Z" fill="#B5562F" />
      <rect x="186" y="121" width="8" height="13" rx="4" fill="#2A2017" />
      <ellipse cx="226" cy="126" rx="6" ry="16" fill="#4E5A1C" />
      <path d="M0 200 C110 174 220 176 320 190 C360 196 384 192 400 188 L400 275 L0 275 Z" fill="#B0802A" />
      <g fill="#F5F0E4"><ellipse cx="70" cy="208" rx="7" ry="4.5" /><ellipse cx="88" cy="212" rx="7" ry="4.5" /><ellipse cx="104" cy="205" rx="7" ry="4.5" /><ellipse cx="120" cy="214" rx="7" ry="4.5" /><ellipse cx="94" cy="223" rx="7" ry="4.5" /><ellipse cx="138" cy="208" rx="7" ry="4.5" /></g>
      <path d="M0 238 C120 216 240 222 400 230 L400 275 L0 275 Z" fill="#8A6416" />
    </>
  ),
}

function CapcaleraGenerica({ color }) {
  return (
    <>
      <rect width="400" height="275" fill={color} />
      <circle cx="300" cy="78" r="34" fill="#F5F0E4" fillOpacity="0.6" />
      <path d="M0 170 C90 140 170 136 260 150 C320 160 360 150 400 140 L400 275 L0 275 Z" fill="#2A2017" fillOpacity="0.12" />
      <path d="M0 182 C80 160 160 156 240 166" fill="none" stroke="#F5F0E4" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12" />
      <path d="M0 210 C100 180 200 176 300 192 C350 200 380 196 400 190 L400 275 L0 275 Z" fill="#2A2017" fillOpacity="0.2" />
      <g fill="none" stroke="#F5F0E4" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M20 222 C120 194 210 192 300 206" />
        <path d="M10 240 C120 212 214 210 320 226" />
        <path d="M4 258 C120 232 220 230 340 246" />
      </g>
      <path d="M0 242 C120 222 240 226 400 236 L400 275 L0 275 Z" fill="#2A2017" fillOpacity="0.3" />
    </>
  )
}

/**
 * Capçalera il·lustrada d'una targeta de visita.
 * - familia: id de la família (vi, horta, formatge tenen capçalera pròpia;
 *   les altres usen la genèrica en el color de la família)
 * Decorativa (aria-hidden); la mida la fixa el contenidor.
 */
export default function CapcaleraVisita({ familia }) {
  const contingut = CAPCALERES[familia]
  const color = getFamilia(familia)?.color ?? '#6E7B2F'

  return (
    <svg
      className="visita-card__il"
      viewBox="0 0 400 275"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {contingut ?? <CapcaleraGenerica color={color} />}
    </svg>
  )
}
