import { Newspaper } from 'lucide-react'
import type { Section } from '../lib/prototype'

function FootballIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m12 7 4.8 3.5-1.8 5.6H9l-1.8-5.6L12 7Zm0-5v5m9.5 2-4.7 1.5m1.1 9.5-2.9-3.9M6.1 20 9 16.1M2.5 9l4.7 1.5" /></svg>
}
export function BottomNavigation({ section, onChange }: { section: Section; onChange: (section: Section) => void }) {
  return <nav className="bottom-navigation" aria-label="Hauptnavigation">
    {([{ key: 'matches', label: 'Spiele', icon: <FootballIcon /> }, { key: 'news', label: 'News', icon: <Newspaper size={24} /> }] as const).map(item =>
      <button key={item.key} className={section === item.key ? 'active' : ''} aria-current={section === item.key ? 'page' : undefined} onClick={() => onChange(item.key)}>{item.icon}<span>{item.label}</span></button>)}
  </nav>
}
