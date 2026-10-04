import { useEffect, useRef, useState } from 'react'
import PosterVideo from './illustracions/PosterVideo'

// Vídeo de la visita en mode "lite embed" (maqueta visita.html, secció "Els vídeos").
// - Amb `youtubeId`: el pòster il·lustrat porta un botó de reproducció (un <button> real
//   de 72px); en prémer-lo se substitueix per un iframe de youtube-nocookie.com amb
//   reproducció automàtica. No es carrega res de YouTube fins que algú el prem.
// - Sense `youtubeId`: no hi ha botó, només l'etiqueta "Aviat".
// - La durada (`durada`, p. ex. "12:40") només es mostra si el vídeo en té.

const DESCRIPCIONS = [
  'La persona i el context humà del projecte.',
  "Com funciona l'explotació, el producte i la manera de treballar.",
  'Un tema obert: el territori, el consum local, els reptes del sector.',
]

const ID_VALID = /^[\w-]{6,20}$/

export default function VideoLite({ video, indice, familia }) {
  const [actiu, setActiu] = useState(false)
  const iframeRef = useRef(null)

  const numero = video.numero ?? indice + 1
  const id = typeof video.youtubeId === 'string' && ID_VALID.test(video.youtubeId) ? video.youtubeId : ''
  const durada = typeof video.durada === 'string' ? video.durada.trim() : ''
  const descripcio = DESCRIPCIONS[indice]

  // En substituir el botó per l'iframe, el focus de teclat passa al reproductor
  useEffect(() => {
    if (actiu) iframeRef.current?.focus()
  }, [actiu])

  return (
    <article className="visita-video lift">
      <div className="visita-video__escena">
        {actiu && id ? (
          <iframe
            ref={iframeRef}
            className="visita-video__iframe"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={`Vídeo ${numero}: ${video.titol}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <PosterVideo indice={indice} familia={familia.id} color={familia.color} />
            {id ? (
              <button
                type="button"
                className="visita-video__play"
                aria-label={`Reproduir el vídeo ${numero}: ${video.titol}`}
                onClick={() => setActiu(true)}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
                  <path d="M8 5 L19 12 L8 19 Z" fill={familia.colorText} />
                </svg>
              </button>
            ) : (
              <span className="visita-video__pastilla">Aviat</span>
            )}
            {id && durada && <span className="visita-video__pastilla">{durada}</span>}
          </>
        )}
      </div>
      <div className="visita-video__cos">
        <p className="visita-video__etiqueta">Vídeo {numero}</p>
        <h3 className="visita-video__titol">{video.titol}</h3>
        {descripcio && <p className="visita-video__text">{descripcio}</p>}
      </div>
    </article>
  )
}
