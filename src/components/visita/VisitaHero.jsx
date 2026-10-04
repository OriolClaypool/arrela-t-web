import { Link } from 'react-router-dom'
import PaisatgeVisita from '../illustracions/PaisatgeVisita'
import Onada from '../marca/Onada'
import { codiVisita } from '../../utils/format'

// Hero de la visita (maqueta visita.html): fons del color de la família, enllaç per
// tornar, insígnia amb la marca del segell, línia de meta, títol del reportatge, entradeta,
// dos botons i, a la dreta, el panell amb la il·lustració de la família. Els colors venen
// de les variables --familia-* de la pàgina (vegeu pages/Visita.jsx).

export default function VisitaHero({ productor, familia, fonsSeguent }) {
  const reportatge = productor.reportatge
  const titol = reportatge?.titol || productor.nom
  const meta = [productor.nom, productor.categoria, productor.comarca].filter(Boolean).join(' · ')
  const videos = reportatge?.videos?.length ?? 0
  const insignia =
    productor.numeroVisita != null
      ? `Visita nº ${codiVisita(productor.numeroVisita)} · Productor verificat`
      : 'Productor verificat'

  return (
    <section className="visita-hero" aria-labelledby="visita-titol">
      <div className="visita-hero__inner contenidor">
        <Link to="/entrevistes" className="visita-hero__tornar">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M19 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Totes les visites
        </Link>

        <div className="visita-hero__graella">
          <div>
            <p className="visita-hero__insignia">
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="11" fill="#1F4A34" />
                <path d="M12 17 V10.5 M7 17 H17" fill="none" stroke="#F5F0E4" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M12 12.5 C9 12.5 7.5 10.5 7 8 C9.5 8 11.5 10 12 12.5 Z M12 11 C14.5 11 16.5 9.3 17 7 C14.5 7 12.5 8.5 12 11 Z" fill="#E4BE5C" />
              </svg>
              {insignia}
            </p>
            {meta && <p className="visita-hero__meta">{meta}</p>}
            <h1 id="visita-titol" className="visita-hero__titol">{titol}</h1>
            {productor.descripcioCurta && <p className="visita-hero__lead">{productor.descripcioCurta}</p>}

            <div className="visita-hero__botons">
              {videos > 0 && (
                <a href="#videos" className="visita-hero__boto visita-hero__boto--clar lift">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="11" fill={familia.colorText} />
                    <path d="M10 7.5 L16.5 12 L10 16.5 Z" fill="#F5F0E4" />
                  </svg>
                  {videos === 1 ? 'Mira el vídeo' : `Mira els ${videos} vídeos`}
                </a>
              )}
              <a href="#contacte" className="visita-hero__boto visita-hero__boto--contorn">
                Contacte i on comprar
              </a>
            </div>
          </div>

          <div className="visita-hero__panell">
            <PaisatgeVisita familia={familia.id} />
          </div>
        </div>
      </div>

      <Onada color={fonsSeguent} invertida className="visita-hero__onada" />
    </section>
  )
}
