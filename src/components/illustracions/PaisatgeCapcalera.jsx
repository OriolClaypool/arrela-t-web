// Paisatge suau de la capçalera de les pàgines interiors: un sol, turons en capes i
// fileres de ceps. Sempre amb poca presència (sistema.html: "Paisatge per capes").
// - fons: color del turó de davant; ha de coincidir amb el fons de la secció que ve
//   a sota, perquè el relleu sembli que puja de la pàgina.
// Decoratiu (aria-hidden); la mida i la posició les fixa .pagina-capcalera__il.

export default function PaisatgeCapcalera({ fons = '#EDE5D2' }) {
  return (
    <svg
      className="pagina-capcalera__il"
      viewBox="0 0 1440 280"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="1180" cy="84" r="62" fill="none" stroke="#EE9A63" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <circle cx="1180" cy="84" r="44" fill="#F3B48A" />
      <path d="M0 204 C140 180 280 174 420 190 C560 206 700 184 860 154 C1000 126 1120 134 1240 154 C1330 168 1400 164 1440 158 L1440 280 L0 280 Z" fill="#E2D9BF" />
      <path d="M0 234 C160 212 320 208 480 222 C640 236 800 216 960 198 C1100 182 1280 192 1440 186 L1440 280 L0 280 Z" fill="#E9E1CB" />
      <g fill="none" stroke="#C9BD9F" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M40 252 C200 232 360 230 520 242" />
        <path d="M900 232 C1060 212 1240 214 1400 224" />
      </g>
      <path d="M0 264 C200 252 420 264 640 256 C860 248 1100 262 1440 252 L1440 280 L0 280 Z" fill={fons} />
    </svg>
  )
}
