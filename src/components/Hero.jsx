import { Link } from 'react-router-dom'

function OrganicStrokes() {
  return (
    <svg
      className="hero__strokes"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* stroke mirrors var(--terracotta); CSS custom properties aren't resolved in plain SVG presentation attributes */}
      <g fill="none" stroke="#c47a52" strokeWidth="1.5" opacity="0.08">
        <path d="M-80 780 Q 220 650 520 720 Q 820 790 1120 660 Q 1320 590 1520 670"/>
        <path d="M-80 630 Q 260 500 560 575 Q 860 645 1160 510 Q 1350 445 1520 520"/>
        <path d="M-80 480 Q 300 355 600 428 Q 900 500 1200 365 Q 1380 300 1520 380"/>
        <path d="M-80 335 Q 240 220 540 290 Q 840 360 1140 230 Q 1320 168 1520 245"/>
        <path d="M-80 185 Q 280 90 580 155 Q 880 220 1180 100 Q 1355 45 1520 118"/>
        <path d="M-80 880 Q 320 810 620 848 Q 920 890 1220 820 Q 1390 785 1520 840"/>
        <path d="M120 28 Q 420 -22 720 20 Q 1020 62 1320 5"/>
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <OrganicStrokes />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__label">Sector primari català</p>
        <h1 className="hero__title">
          Connectem el camp<br />amb la taula
        </h1>
        <p className="hero__subtitle">
          Descobreix els productors locals catalans. Les seves històries,
          els seus productes, i com arribar-hi.
        </p>
        <Link to="/productors" className="hero__cta">
          Descobreix els productors
        </Link>
      </div>
    </section>
  )
}
