import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, Bookmark, Check, ChevronDown, Search, X } from 'lucide-react'
import { Brand } from './components/Brand'
import { FeedCardView, EmptyFeed } from './components/Cards'
import { DetailModal } from './components/DetailModal'
import { Sidebar } from './components/Sidebar'
import { feed } from './data/feed'
import { filterFeed } from './lib/filterFeed'
import { useSavedCards } from './hooks/useSavedCards'
import type { FeedCard, FeedFilter } from './types'

const tabs: { key: FeedFilter; label: string }[] = [
  { key: 'all', label: 'Für dich' }, { key: 'news', label: 'News' }, { key: 'match', label: 'Spiele' },
]

export default function App() {
  const [filter, setFilter] = useState<FeedFilter>('all')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [detail, setDetail] = useState<FeedCard | 'about' | null>(null)
  const [toast, setToast] = useState('')
  const { savedIds, toggle } = useSavedCards()
  const savedCount = feed.filter(card => savedIds.includes(card.id)).length
  const scrollRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const visibleCards = useMemo(() => filterFeed(feed, filter, query, savedIds), [filter, query, savedIds])
  const cardIds = visibleCards.map(card => card.id).join(',')
  const changeFilter = (next: FeedFilter) => { setFilter(next); setQuery(''); setSearchOpen(false) }
  const reset = () => changeFilter('all')
  const saveCard = (card: FeedCard) => {
    const exists = savedIds.includes(card.id)
    toggle(card.id)
    setToast(exists ? 'Aus deiner Merkliste entfernt' : 'In deiner Merkliste gespeichert')
  }
  const goTo = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const slide = container.children[Math.max(0, Math.min(visibleCards.length - 1, index))] as HTMLElement | undefined
    if (slide) container.scrollTo({ top: slide.offsetTop, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [visibleCards.length])
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.scrollTo({ top: 0, behavior: 'instant' })
    setActiveIndex(0)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveIndex(Number((entry.target as HTMLElement).dataset.index)) })
    }, { root: container, threshold: 0.6 })
    Array.from(container.children).forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [cardIds])
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (detail || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        goTo(activeIndex + (event.key === 'ArrowDown' || event.key === 'PageDown' ? 1 : -1))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goTo, activeIndex, detail])
  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer) }, [toast])

  return <div className="app-shell">
    <Sidebar filter={filter} savedCount={savedCount} onFilter={changeFilter} onAbout={() => setDetail('about')} />
    <main id="feed" className="workspace">
      <h1 className="sr-only">Football Flow — Bundesliga-News und Spiele</h1>
      <section className="portrait-stage" aria-label="Fußball-Feed im Hochformat">
        <header className="feed-overlay-header">
          <div className="overlay-brand-row"><button className="brand-button" onClick={reset} aria-label="Football Flow · Zum gesamten Feed"><Brand /></button><div className="overlay-actions"><button className="icon-button" aria-label={searchOpen ? 'Suche schließen' : 'Feed durchsuchen'} aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setQuery('') }}>{searchOpen ? <X size={19} /> : <Search size={19} />}</button><button className={`icon-button library-toggle ${filter === 'saved' ? 'is-saved' : ''}`} aria-label="Gespeicherte Karten" aria-pressed={filter === 'saved'} onClick={() => changeFilter(filter === 'saved' ? 'all' : 'saved')}><Bookmark size={19} fill={filter === 'saved' ? 'currentColor' : 'none'} />{savedCount > 0 && <span>{savedCount}</span>}</button></div></div>
          <div className="feed-tabs" role="tablist" aria-label="Kartentyp">{tabs.map(tab => <button key={tab.key} role="tab" aria-selected={filter === tab.key} className={filter === tab.key ? 'active' : ''} onClick={() => changeFilter(tab.key)}>{tab.key === 'all' && <span>✦</span>}{tab.label}</button>)}{filter === 'saved' && <span className="saved-filter-label">Merkliste</span>}</div>
          {searchOpen && <div className="search-bar"><Search size={16} /><input ref={searchRef} aria-label="Feed durchsuchen" placeholder="Bundesliga-Themen suchen …" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') { setSearchOpen(false); setQuery('') } }} /><button className="icon-button" aria-label="Suchbegriff löschen" onClick={() => { setQuery(''); searchRef.current?.focus() }}><X size={15} /></button></div>}
        </header>
        <div className="feed-scroll" ref={scrollRef} tabIndex={0} aria-label="Swipe-Feed. Mit Pfeiltasten oder Scrollen navigieren.">{visibleCards.map((card, index) => <div className="feed-slide" data-index={index} key={card.id} aria-label={`Karte ${index + 1} von ${visibleCards.length}`}><FeedCardView card={card} saved={savedIds.includes(card.id)} onSave={() => saveCard(card)} onOpen={() => setDetail(card)} /></div>)}{visibleCards.length === 0 && <EmptyFeed saved={filter === 'saved'} onReset={reset} />}</div>
        <div className="feed-bottom-hint"><span><ChevronDown size={13} />{activeIndex === visibleCards.length - 1 && visibleCards.length > 0 ? 'Du bist im Flow' : 'Weiter swipen'}</span><span>{visibleCards.length > 0 ? `${String(activeIndex + 1).padStart(2, '0')} / ${String(visibleCards.length).padStart(2, '0')}` : '00 / 00'}</span></div>
        {visibleCards.length > 1 && <div className="feed-controls"><button className="round-arrow" aria-label="Vorherige Karte" disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)}><ArrowUp size={20} /></button><div className="feed-progress">{visibleCards.map((card, index) => <button key={card.id} className={index === activeIndex ? 'active' : ''} aria-label={`Zu Karte ${index + 1}`} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => goTo(index)} />)}</div><button className="round-arrow" aria-label="Nächste Karte" disabled={activeIndex === visibleCards.length - 1} onClick={() => goTo(activeIndex + 1)}><ArrowDown size={20} /></button></div>}
      </section>
      <div className="desktop-note"><span className="note-line" /><p>DEIN SPIEL.<br /><strong>DEIN FLOW.</strong></p><span className="note-scope">NUR BUNDESLIGA.<br />IMMER MITTENDRIN.</span><span className="note-demo">PROTOTYP · DEMODATEN</span></div>
      <button className="floating-about" onClick={() => setDetail('about')}>Über diese Demo <span>↗</span></button>
    </main>
    {detail && <DetailModal key={typeof detail === 'string' ? detail : detail.id} card={detail} saved={detail !== 'about' && savedIds.includes(detail.id)} onSave={() => { if (detail !== 'about') saveCard(detail) }} onClose={() => setDetail(null)} />}
    <div className={`toast ${toast ? 'visible' : ''}`} role="status">{toast && <><Check size={17} /><span>{toast}</span></>}</div>
  </div>
}
