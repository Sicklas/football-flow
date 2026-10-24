import { Bookmark, Search } from 'lucide-react'

export function LeagueHeader({ section, onSearch, searchOpen, onSaved, savedOnly }: {
  section: string; onSearch: () => void; searchOpen: boolean; onSaved: () => void; savedOnly: boolean
}) {
  return <header className="league-header">
    <div><h1>Bundesliga</h1><div className="header-subline"><p>{section}</p><div className="header-tools">
      <button className="icon-button" aria-label="Suche öffnen oder schließen" aria-expanded={searchOpen} onClick={onSearch}><Search size={17} /></button>
      <button className={`icon-button ${savedOnly ? 'selected' : ''}`} aria-label="Nur gespeicherte Beiträge anzeigen" aria-pressed={savedOnly} onClick={onSaved}><Bookmark size={17} fill={savedOnly ? 'currentColor' : 'none'} /></button>
    </div></div></div>
    <img className="league-logo" src="/images/bundesliga-reference.webp" alt="Bundesliga" width="46" height="48" />
  </header>
}
