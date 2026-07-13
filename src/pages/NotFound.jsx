import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <div className="profile-not-found">
      <Seo
        title="Pàgina no trobada — Arrela't"
        description="No hem trobat la pàgina que busques."
        noindex
      />
      <p className="profile-not-found__label">404</p>
      <h1>Pàgina no trobada</h1>
      <p>No hem trobat la pàgina que busques.</p>
      <Link to="/" className="profile-not-found__link">← Torna a l'inici</Link>
    </div>
  )
}
