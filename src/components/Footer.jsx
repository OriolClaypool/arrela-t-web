import { Link } from 'react-router-dom'

const IconaInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const IconaYoutube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <p className="footer__logo">Arrela't</p>
          <p className="footer__tagline">
            Posem en valor el sector primari català, connectant productors i consumidors.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Navegació peu de pàgina">
          <Link to="/productors">Productors</Link>
          <Link to="/entrevistes">Entrevistes</Link>
          <Link to="/qui-som">Qui som</Link>
          <Link to="/agenda">Agenda</Link>
          <Link to="/contacte">Contacte</Link>
        </nav>

        <div className="footer__social">
          {/* TODO: real URL */}
          <a href="#" aria-label="Instagram d'Arrela't" rel="noopener noreferrer">
            <IconaInstagram />
            Instagram
          </a>
          {/* TODO: real URL */}
          <a href="#" aria-label="YouTube d'Arrela't" rel="noopener noreferrer">
            <IconaYoutube />
            YouTube
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Fet amb estima pel territori.</p>
      </div>
    </footer>
  )
}
