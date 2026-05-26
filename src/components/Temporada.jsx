import useFadeIn from '../hooks/useFadeIn'
import temporada from '../data/temporada'

const nomsMesos = [
  'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
  'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre',
]

export default function Temporada() {
  const ref = useFadeIn()
  const mesActual = new Date().getMonth() + 1
  const productes = temporada[mesActual] || []
  const nomMes = nomsMesos[mesActual - 1]

  return (
    <section className="temporada">
      <div ref={ref} className="temporada__inner fade-in">
        <p className="temporada__mes">{nomMes}</p>
        <h2 className="temporada__title">Aquest mes al territori</h2>
        <div className="temporada__tags">
          {productes.map((p) => (
            <span key={p} className="temporada__tag">{p}</span>
          ))}
        </div>
        <p className="temporada__nota">
          El camp té el seu ritme. Aquests són els productes de temporada aquest mes.
        </p>
      </div>
    </section>
  )
}
