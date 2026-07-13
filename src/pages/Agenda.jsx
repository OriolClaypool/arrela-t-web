import agenda from '../data/agenda'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

export default function Agenda() {
  return (
    <div className="agenda">
      <Seo
        title="Agenda — Arrela't"
        description="Esdeveniments, visites i activitats relacionades amb Arrela't i els productors del sector primari català."
        path="/agenda"
      />
      <section className="agenda__hero">
        <h1>Agenda</h1>
        <p>
          Esdeveniments, visites i activitats relacionades amb Arrela't i els seus productors.
        </p>
      </section>

      <div className="agenda__body">
        {agenda.length === 0 ? (
          <p className="agenda__empty">Aviat tindrem novetats.</p>
        ) : (
          <div className="agenda__list">
            {agenda.map((event) => (
              <article key={event.id} className="agenda__event">
                <div className="agenda__event-date">{event.dataFormatada}</div>
                <div className="agenda__event-content">
                  <h2>{event.titol}</h2>
                  <p>{event.descripcio}</p>
                  <a href={event.url} className="agenda__event-cta">
                    {event.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
