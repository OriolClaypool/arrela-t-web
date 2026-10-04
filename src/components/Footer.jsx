import { Link } from 'react-router-dom'
import Logo from './marca/Logo'

const IconaInstagram = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" />
    </g>
  </svg>
)

const IconaYoutube = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9 L15 12 L10 15 Z" fill="currentColor" />
    </g>
  </svg>
)

const ANY = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <Link to="/" className="footer__logo" aria-label="Arrela't, inici">
            <Logo invers mida={34} />
          </Link>
          <p className="footer__tagline">
            Visitem, escoltem i expliquem el sector primari català.
          </p>
        </div>

        <nav aria-label="Explora">
          <p className="footer__titol">Explora</p>
          <Link to="/entrevistes" className="footer__link">Les visites</Link>
          <Link to="/#temporada" className="footer__link">Temporada</Link>
          <Link to="/productors" className="footer__link">El mapa</Link>
          <Link to="/segell" className="footer__link">El segell</Link>
        </nav>

        <nav aria-label="Arrela't">
          <p className="footer__titol">Arrela&apos;t</p>
          <Link to="/qui-som" className="footer__link">Qui som</Link>
          <Link to="/professional" className="footer__link">Espai professional</Link>
          <Link to="/agenda" className="footer__link">Agenda</Link>
          <Link to="/contacte" className="footer__link">Contacte</Link>
        </nav>

        <div>
          <p className="footer__titol">Segueix-nos</p>
          <a
            href="https://instagram.com/arrela_t_"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @arrela_t_ (s'obre en una pestanya nova)"
          >
            <IconaInstagram />
            @arrela_t_
          </a>
          {/* TODO: afegir l'URL real quan existeixi el canal de YouTube; mentrestant és text sense enllaç */}
          <span className="footer__link">
            <IconaYoutube />
            YouTube
          </span>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {ANY} Arrela&apos;t · Fet amb estima pel territori</span>
        <span>Cap productor paga per sortir-hi</span>
      </div>
    </footer>
  )
}
