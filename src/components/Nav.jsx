import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  const goToProductors = (e) => {
    e.preventDefault()
    close()
    if (location.pathname === '/') {
      document.getElementById('productors')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('productors')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  return (
    <nav
      className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      aria-label="Navegació principal"
    >
      <Link to="/" className="nav__logo" onClick={close}>
        Arrela't
      </Link>

      <button
        className="nav__hamburger"
        aria-label={menuOpen ? 'Tancar menú' : 'Obrir menú'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
        <li>
          <a href="/#productors" onClick={goToProductors}>Productors</a>
        </li>
        <li>
          <NavLink to="/entrevistes" onClick={close}>Entrevistes</NavLink>
        </li>
        <li>
          <NavLink to="/qui-som" onClick={close}>Qui som</NavLink>
        </li>
        <li>
          <NavLink to="/agenda" onClick={close}>Agenda</NavLink>
        </li>
        <li>
          <NavLink to="/contacte" onClick={close}>Contacte</NavLink>
        </li>
        <li>
          <NavLink to="/professional" className="nav__cta" onClick={close}>Espai professional</NavLink>
        </li>
      </ul>
    </nav>
  )
}
