export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <h1 className="hero__title">Arrels del territori</h1>
        <p className="hero__subtitle">
          Visitem productors catalans. Expliquem les seves històries. Connectem el camp amb la taula.
        </p>
        <a href="#productors" className="hero__cta">
          Descobreix els productors
        </a>
      </div>
    </section>
  )
}
