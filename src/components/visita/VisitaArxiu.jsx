import useFadeIn from '../../hooks/useFadeIn'
import Fletxa from '../marca/Fletxa'

// Banda de les visites de la primera etapa (2024): les que es van publicar a l'antic web
// i de les quals només s'ha recuperat el nom, la comarca i el lema (vegeu
// design/recuperacio/web-antic.json). Explica què és i porta a Instagram, on hi ha la
// visita. Quan el reportatge es recuperi, el productor passa a tenir `reportatge` i
// aquesta banda deixa de sortir.

const INSTAGRAM = 'https://instagram.com/arrela_t_'

export default function VisitaArxiu({ productor }) {
  const ref = useFadeIn()
  if (productor.etapa !== 'primera' || productor.reportatge) return null

  const any = productor.anyPublicacio ?? 2024

  return (
    <section className="visita-arxiu" aria-labelledby="arxiu-titol">
      <div ref={ref} className="visita-arxiu__inner contenidor fade-in">
        <div className="visita-arxiu__text">
          <p className="seccio-etiqueta">Primera etapa · {any}</p>
          <h2 id="arxiu-titol" className="visita-arxiu__titol">
            Una de les nostres primeres visites
          </h2>
          <p className="visita-arxiu__frase">
            La visita a {productor.nom} es va publicar el {any}, a la primera etapa d&apos;Arrela&apos;t.
            Estem recuperant el reportatge complet per tornar-lo a publicar aquí amb el format nou.
            Mentrestant, la trobareu al nostre Instagram.
          </p>
          {productor.titolOriginal && (
            <p className="visita-arxiu__original">
              <span className="visita-arxiu__original-etiqueta">El reportatge original</span>
              {productor.titolOriginal}
            </p>
          )}
          <a href={INSTAGRAM} className="enllac-fletxa" target="_blank" rel="noopener noreferrer">
            Veure-la a Instagram
            <Fletxa />
          </a>
        </div>
      </div>
    </section>
  )
}
