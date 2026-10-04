// Paisatge de la portada (maqueta inici.html, secció hero): capes de muntanya,
// vinyes, camps de blat, camp llaurat i una masia amb el pin que flota.
// Cobreix tota l'amplada i, amb preserveAspectRatio="xMidYMax slice", s'escapça
// amb gràcia en pantalles estretes. Les animacions (halo del sol, pin) són a
// index.css (.paisatge__halo, .paisatge__pin) i s'apaguen amb prefers-reduced-motion.
// Els colors són hexadecimals perquè var(--...) no es resol en atributs SVG.

export default function PaisatgeHero() {
  return (
    <svg
      className="paisatge"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="paisatge__halo">
        <circle cx="1110" cy="150" r="106" fill="none" stroke="#EE9A63" strokeWidth="3" strokeDasharray="2 15" strokeLinecap="round" />
      </g>
      <circle cx="1110" cy="150" r="80" fill="#EE9A63" />
      <circle cx="1110" cy="150" r="58" fill="#F3B48A" />
      <path d="M930 70 q10 -10 20 0 q10 -10 20 0" fill="none" stroke="#5E5040" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M968 100 q7 -7 14 0 q7 -7 14 0" fill="none" stroke="#5E5040" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M0 290 Q60 240 120 200 Q160 225 210 238 Q270 160 320 128 Q370 170 420 205 Q470 180 520 172 Q560 200 610 222 Q680 150 740 110 Q800 160 860 196 Q910 175 960 168 Q1010 200 1060 226 Q1120 170 1180 140 Q1240 190 1300 210 Q1370 180 1440 196 L1440 520 L0 520 Z" fill="#C5D3CC" />
      <path d="M300 140 L320 128 L340 145 Q331 141 326 148 Q318 139 310 146 Q305 140 300 140 Z" fill="#F5F0E4" />
      <path d="M716 126 L740 110 L765 131 Q752 125 746 134 Q738 124 728 132 Q722 126 716 126 Z" fill="#F5F0E4" />
      <path d="M1158 151 L1180 140 L1200 157 Q1191 152 1186 159 Q1178 150 1170 157 Q1164 151 1158 151 Z" fill="#F5F0E4" />
      <path d="M0 330 C120 290 220 280 330 300 C440 320 520 270 640 268 C760 266 840 310 960 304 C1080 298 1160 262 1280 270 C1360 276 1410 290 1440 296 L1440 520 L0 520 Z" fill="#AFBD8E" />
      <g fill="#8E9C66">
        <circle cx="396" cy="299" r="8" />
        <circle cx="424" cy="297" r="7" />
        <circle cx="1012" cy="295" r="8" />
        <circle cx="1046" cy="290" r="9" />
        <circle cx="1082" cy="284" r="8" />
      </g>
      <path d="M0 380 C140 340 260 330 400 352 C520 372 600 360 700 340 C820 318 940 330 1040 352 C1140 374 1260 350 1340 334 C1390 326 1420 328 1440 330 L1440 520 L0 520 Z" fill="#6E7B2F" />
      <g fill="none" stroke="#4E5A1C" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="0.1 12">
        <path d="M30 392 C150 356 260 348 390 368" />
        <path d="M20 408 C150 372 262 364 396 386" />
        <path d="M14 424 C150 390 266 382 404 404" />
        <path d="M1070 370 C1160 388 1260 366 1440 344" />
        <path d="M1080 388 C1170 404 1270 384 1440 362" />
        <path d="M1092 406 C1180 420 1280 402 1440 380" />
      </g>
      <ellipse cx="934" cy="315" rx="7" ry="20" fill="#1F4A34" />
      <path d="M0 446 C160 410 300 404 470 420 C620 434 700 406 820 398 C940 390 1060 410 1180 426 C1300 442 1390 426 1440 420 L1440 520 L0 520 Z" fill="#E4BE5C" />
      <g fill="none" stroke="#CFA343" strokeWidth="3" strokeLinecap="round" strokeDasharray="9 11">
        <path d="M40 460 C200 430 340 426 500 440" />
        <path d="M560 444 C680 424 800 412 940 414" />
        <path d="M28 478 C210 448 350 446 520 460" />
      </g>
      <path d="M700 520 C760 488 840 462 940 456 C1060 450 1180 462 1280 474 C1360 482 1410 474 1440 470 L1440 520 Z" fill="#B5562F" />
      <g fill="none" stroke="#99461F" strokeWidth="3" strokeLinecap="round">
        <path d="M792 498 C880 474 1000 468 1120 476" />
        <path d="M850 512 C950 492 1070 488 1210 496" />
        <path d="M1150 484 C1250 490 1350 488 1440 484" />
      </g>
      <path d="M0 476 C110 458 220 462 330 480 C430 496 520 490 610 478 C680 470 730 476 770 488 C820 502 860 512 900 520 L0 520 Z" fill="#1F4A34" />
      <path d="M1150 520 C1220 494 1320 480 1440 484 L1440 520 Z" fill="#1F4A34" />
      <path d="M0 506 C300 494 620 512 900 500 C1120 492 1300 506 1440 498 L1440 520 L0 520 Z" fill="#1F4A34" />
      <g fill="#163826">
        <ellipse cx="80" cy="436" rx="11" ry="36" />
        <ellipse cx="108" cy="442" rx="9" ry="28" />
        <ellipse cx="132" cy="446" rx="7" ry="20" />
        <ellipse cx="1296" cy="452" rx="11" ry="36" />
        <ellipse cx="1324" cy="460" rx="8" ry="26" />
      </g>
      <circle cx="540" cy="462" r="24" fill="#2E6247" />
      <circle cx="576" cy="456" r="28" fill="#28583F" />
      <circle cx="612" cy="466" r="18" fill="#2E6247" />
      <path d="M720 520 C716 486 676 458 742 430 C800 406 852 380 872 334" fill="none" stroke="#F5F0E4" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 13" />
      <rect x="898" y="278" width="9" height="16" fill="#E9DFC8" />
      <rect x="845" y="296" width="68" height="35" fill="#F5F0E4" />
      <path d="M838 299 L879 272 L920 299 Z" fill="#B5562F" />
      <path d="M873 331 V319 A6 6 0 0 1 885 319 V331 Z" fill="#2A2017" />
      <rect x="853" y="306" width="9" height="9" rx="1.5" fill="#2A2017" />
      <rect x="896" y="306" width="9" height="9" rx="1.5" fill="#2A2017" />
      <g className="paisatge__pin">
        <path d="M879 262 C871 251 865 244 865 235 A14 14 0 1 1 893 235 C893 244 887 251 879 262 Z" fill="#B5562F" />
        <circle cx="879" cy="235" r="5.5" fill="#F5F0E4" />
      </g>
    </svg>
  )
}
