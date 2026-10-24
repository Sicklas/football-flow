import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { LeagueHeader } from './components/LeagueHeader'
import { BottomNavigation } from './components/BottomNavigation'
import { MatchdaySelector } from './components/MatchdaySelector'
import { MatchRow } from './components/MatchRow'
import { NewsArticle } from './components/NewsArticle'
import { DetailModal } from './components/DetailModal'
import { currentMatchday, matchdays } from './data/matchdays'
import { news } from './data/news'
import { useSavedCards } from './hooks/useSavedCards'
import { useVotes } from './hooks/useVotes'
import { filterFeed } from './lib/filterFeed'
import { initialSection, SECTION_KEY, sortMatches, sortNews, type Section } from './lib/prototype'
import type { FeedCard } from './types'

const categories = ['Top-News', 'Transfers', 'Spieltag', 'Analyse']

export default function App() {
  const [section, setSection] = useState<Section>(() => {
    let stored: string | null = null
    try { stored = sessionStorage.getItem(SECTION_KEY) } catch { /* Session state remains available in memory. */ }
    return initialSection(matchdays[currentMatchday], stored)
  })
  const [day, setDay] = useState(currentMatchday)
  const [category, setCategory] = useState('Top-News')
  const [detail, setDetail] = useState<FeedCard | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [savedOnly, setSavedOnly] = useState(false)
  const { savedIds, toggle } = useSavedCards()
  const { votes, vote } = useVotes()
  const input = useRef<HTMLInputElement>(null)
  const scrollPositions = useRef<Record<Section, number>>({ matches: 0, news: 0 })
  const changeSection = (next: Section) => {
    if (next === section) return
    scrollPositions.current[section] = window.scrollY
    setSection(next)
    try { sessionStorage.setItem(SECTION_KEY, next) } catch { /* Optional storage. */ }
    requestAnimationFrame(() => window.scrollTo({ top: scrollPositions.current[next], behavior: 'instant' }))
  }
  const matches = sortMatches(matchdays[day]).filter(match => filterFeed([match], savedOnly ? 'saved' : 'all', query, savedIds).length)
  const articles = sortNews(news).filter(article => (category === 'Top-News' || article.category === category)
    && filterFeed([article], savedOnly ? 'saved' : 'all', query, savedIds).length)
  const label = section === 'matches' ? 'Spiele' : 'News'

  return <div className="app-shell">
    <main className="main-content">
      <LeagueHeader section={label} searchOpen={searchOpen} onSearch={() => {
        setSearchOpen(!searchOpen)
        if (searchOpen) setQuery('')
        else requestAnimationFrame(() => input.current?.focus())
      }} savedOnly={savedOnly} onSaved={() => setSavedOnly(!savedOnly)} />
      {searchOpen && <div className="search-bar"><input ref={input} aria-label="Bundesliga durchsuchen" placeholder="Verein oder Thema suchen …" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') { setSearchOpen(false); setQuery('') } }} /><button className="icon-button" aria-label="Suche schließen" onClick={() => { setSearchOpen(false); setQuery('') }}><X size={18} /></button></div>}
      {savedOnly && <div className="saved-notice"><span>Deine Merkliste</span><button onClick={() => setSavedOnly(false)}>Alle anzeigen</button></div>}
      {section === 'matches' ? <section aria-label="Bundesliga-Spiele">
        <MatchdaySelector day={day} onChange={setDay} />
        <h2 className="sr-only">{day}. Spieltag</h2>
        <div className="match-list">{matches.map(match => <MatchRow key={match.id} match={match} onOpen={() => setDetail(match)} />)}</div>
        {matches.length === 0 && <EmptyState saved={savedOnly} onReset={() => { setSavedOnly(false); setQuery('') }} />}
      </section> : <section aria-label="Bundesliga-News">
        <div className="news-categories" aria-label="News-Kategorien">{categories.map(value => <button key={value} className={category === value ? 'active' : ''} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div>
        <div className="news-list">{articles.map((article, index) => <NewsArticle key={article.id} article={article} featured={index === 0} vote={votes[article.id]} onVote={value => vote(article.id, value)} onOpen={() => setDetail(article)} />)}</div>
        {articles.length === 0 && <EmptyState saved={savedOnly} onReset={() => { setSavedOnly(false); setQuery(''); setCategory('Top-News') }} />}
      </section>}
      <footer className="prototype-note">Football Flow V0.2 · Fiktive Demodaten</footer>
    </main>
    <BottomNavigation section={section} onChange={changeSection} />
    {detail && <DetailModal key={detail.id} card={detail} saved={savedIds.includes(detail.id)} onSave={() => toggle(detail.id)} onClose={() => setDetail(null)} />}
  </div>
}

function EmptyState({ saved, onReset }: { saved: boolean; onReset: () => void }) {
  return <div className="empty-state"><h2>{saved ? 'Hier ist noch Platz.' : 'Keine Treffer.'}</h2><p>{saved ? 'Öffne einen Beitrag und speichere ihn mit dem Lesezeichen.' : 'Versuche einen anderen Verein oder ein anderes Thema.'}</p><button onClick={onReset}>Alle Beiträge anzeigen</button></div>
}
