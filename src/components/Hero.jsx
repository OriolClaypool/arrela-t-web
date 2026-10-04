import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import PaisatgeHero from './illustracions/PaisatgeHero'
import Fletxa from './marca/Fletxa'
import IconaCheck from './marca/IconaCheck'

// Portada: etiqueta, títol amb "ho hem vist" subratllat de blat, subtítol, dos
// botons i dos punts de confiança, sobre el paisatge il·lustrat (maqueta inici.html).

export default function Hero() {
  const ref = useFadeIn()

  return (
    <section className="hero" aria-labelledby="hero-titol">
      <div ref={ref} className="hero__contingut contenidor fade-in">
        <p className="hero__etiqueta">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path
              d="M12 21 C12 21 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 12 21 12 21 Z"
              fill="#B5562F"
            />
            <circle cx="12" cy="9.5" r="2.6" fill="#EDE5D2" />
          </svg>
          Sector primari català
        </p>

        <h1 id="hero-titol" className="hero__titol">
          Hi hem anat, <span className="hero__subratllat">ho hem vist</span> i t&apos;ho expliquem.
        </h1>

        <p className="hero__subtitol">
          Visitem productors del sector primari català a casa seva, els entrevistem i ho filmem.
          Aquí trobaràs les seves històries, què fan i com arribar-hi.
        </p>

        <div className="hero__botons">
          <Link to="/entrevistes" className="btn btn--terracota btn--gran lift">
            Descobreix les visites
            <Fletxa />
          </Link>
          <Link to="/professional" className="btn btn--contorn btn--gran">
            Tens botiga o restaurant?
          </Link>
        </div>

        <ul className="hero__punts" role="list">
          <li>
            <IconaCheck fons="#6E7B2F" check="#F5F0E4" />
            Cada productor, visitat en persona
          </li>
          <li>
            <IconaCheck fons="#6E7B2F" check="#F5F0E4" />
            Cap productor paga per sortir-hi
          </li>
        </ul>
      </div>

      <div className="hero__paisatge" aria-hidden="true">
        <PaisatgeHero />
      </div>
    </section>
  )
}
