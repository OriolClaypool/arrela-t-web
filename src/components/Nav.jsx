import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './marca/Logo'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  // Escape tanca el menú desplegat (mòbil)
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="nav">
      <nav className="nav__inner" aria-label="Navegació principal">
        <Link to="/" className="nav__logo" aria-label="Arrela't, inici" onClick={close}>
          <Logo mida={38} />
        </Link>

        <button
          type="button"
          className="nav__hamburger"
          aria-label={menuOpen ? 'Tancar menú' : 'Obrir menú'}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6.5" x2="20" y2="6.5" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17.5" x2="20" y2="17.5" />
              </>
            )}
          </svg>
        </button>

        <ul id="menu-principal" className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          <li>
            <NavLink to="/entrevistes" className="nav__link" onClick={close}>Les visites</NavLink>
          </li>
          <li>
            {/* Enllaç a un ancoratge de la portada: Link (no NavLink) perquè no es marqui com a pàgina actual */}
            <Link to="/#temporada" className="nav__link" onClick={close}>Temporada</Link>
          </li>
          <li>
            <NavLink to="/productors" className="nav__link" onClick={close}>El mapa</NavLink>
          </li>
          <li>
            <NavLink to="/segell" className="nav__link" onClick={close}>El segell</NavLink>
          </li>
          <li>
            <NavLink to="/qui-som" className="nav__link" onClick={close}>Qui som</NavLink>
          </li>
          <li>
            <NavLink to="/professional" className="nav__cta" onClick={close}>Espai professional</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
