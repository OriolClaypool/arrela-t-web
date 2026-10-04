import useFadeIn from '../../hooks/useFadeIn'

// Secció "El reportatge" de la visita (maqueta visita.html): columna de lectura estreta
// sobre --paper amb l'entradeta en Fraunces, els paràgrafs, la cita destacada en el color
// de la família (dreta, mai cursiva) i el final. La signatura només porta els camps que
// existeixen (autoriaText, autoriaImatges, dataVisita).

export default function VisitaReportatge({ productor }) {
  const ref = useFadeIn()
  const r = productor.reportatge
  if (!r) return null

  const signatura = [
    r.autoriaText ? `Visita i text: ${r.autoriaText}` : null,
    r.autoriaImatges ? `Imatges: ${r.autoriaImatges}` : null,
    r.dataVisita || null,
  ].filter(Boolean)

  return (
    <section className="visita-rep" aria-labelledby="historia-titol">
      <div ref={ref} className="visita-rep__col fade-in">
        <p className="seccio-etiqueta">El reportatge</p>
        <h2 id="historia-titol" className="seccio-titol">La història de la visita</h2>

        {signatura.length > 0 && (
          <p className="visita-rep__signatura">
            {signatura.map((text, i) => (
              <span key={text} className="visita-rep__signatura-item">
                {i > 0 && <span aria-hidden="true">·</span>}
                <span>{text}</span>
              </span>
            ))}
          </p>
        )}

        {r.intro && <p className="visita-rep__entradeta">{r.intro}</p>}
        {(r.cos ?? []).map((text) => <p key={text} className="visita-rep__p">{text}</p>)}

        {r.citacio?.text && (
          <figure className="visita-rep__cita">
            <svg viewBox="0 0 48 34" width="48" height="34" aria-hidden="true" focusable="false">
              <path d="M0 34 V20 C0 8 6 0 18 0 V8 C12 8 9 12 9 20 H18 V34 Z M30 34 V20 C30 8 36 0 48 0 V8 C42 8 39 12 39 20 H48 V34 Z" fill="currentColor" />
            </svg>
            <blockquote className="visita-rep__cita-text">{r.citacio.text}</blockquote>
            {r.citacio.autor && <figcaption className="visita-rep__cita-autor">{r.citacio.autor}</figcaption>}
          </figure>
        )}

        {(r.cosFinal ?? []).map((text) => <p key={text} className="visita-rep__p">{text}</p>)}
      </div>
    </section>
  )
}
