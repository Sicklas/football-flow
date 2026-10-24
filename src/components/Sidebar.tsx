import { Activity, ArrowUpRight, Bookmark, Layers3, Newspaper, Radio } from 'lucide-react'
import type { FeedFilter } from '../types'
import { Brand } from './Brand'

const navigation = [
  { key: 'all', label: 'Dein Feed', icon: Layers3 },
  { key: 'news', label: 'News', icon: Newspaper },
  { key: 'match', label: 'Spiele', icon: Radio },
  { key: 'saved', label: 'Gespeichert', icon: Bookmark },
] as const

export function Sidebar({ filter, savedCount, onFilter, onAbout }: {
  filter: FeedFilter
  savedCount: number
  onFilter: (filter: FeedFilter) => void
  onAbout: () => void
}) {
  return <aside className="sidebar">
    <a className="brand-link" href="#feed" onClick={() => onFilter('all')}><Brand /></a>
    <div className="sidebar-label">DEIN FUSSBALL. DEIN FLOW.</div>
    <nav className="primary-nav" aria-label="Hauptnavigation">{navigation.map(({ key, label, icon: Icon }) => <button key={key} className={`nav-item ${filter === key ? 'active' : ''}`} aria-current={filter === key ? 'page' : undefined} onClick={() => onFilter(key)}><Icon size={20} /><span>{label}</span>{key === 'match' && <span className="nav-live-dot" />}{key === 'saved' && savedCount > 0 && <span className="count-badge">{savedCount}</span>}</button>)}</nav>
    <div className="bundesliga-scope"><span className="league-emblem">B</span><div><strong>Bundesliga</strong><span>Eine Liga. Alle Geschichten.</span></div></div>
    <div className="sidebar-promo"><Activity size={22} /><h3>Fußball hört<br />niemals auf.</h3><p>Dein nächster Moment?<br />Nur einen Swipe entfernt.</p><span className="promo-status"><span /> IMMER IM FLOW</span></div>
    <button className="about-button" onClick={onAbout}>MVP V1 <span>·</span> Demo entdecken <ArrowUpRight size={13} /></button>
    <div className="sidebar-copyright">Mit Liebe zum Spiel. © 2026</div>
  </aside>
}
