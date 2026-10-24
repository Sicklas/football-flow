import { useEffect, useRef } from 'react'
import { Bookmark, X } from 'lucide-react'
import type { FeedCard, MatchCardData } from '../types'
import { TeamCrest } from './TeamCrest'

function MatchDetails({ card }: { card: MatchCardData }) {
  const scheduled = card.status === 'scheduled'
  const metrics: [string, number, number, string][] = [
    ['Ballbesitz', ...card.possession, '%'], ['Schüsse', ...card.shots, ''], ['Expected Goals', ...card.xg, ''],
  ]
  return <>
    <div className="detail-scoreboard"><div><TeamCrest team={card.home} /><strong>{card.home.short}</strong></div><div><span className={card.status === 'live' ? 'live-badge' : 'match-status'}>{card.status === 'live' ? `LIVE · ${card.minute}′` : scheduled ? 'Geplant' : 'Beendet'}</span><strong>{scheduled ? card.kickoff : `${card.score[0]} : ${card.score[1]}`}</strong></div><div><TeamCrest team={card.away} /><strong>{card.away.short}</strong></div></div>
    <p className="detail-venue">{card.venue}{scheduled ? ` · ${card.dateLabel}` : ''}</p>
    {scheduled ? <p>Die Begegnung steht bevor. Spielverlauf und Statistiken sind noch nicht verfügbar.</p> : <>
      <h3>Das Spiel in Zahlen</h3><div className="match-metrics">{metrics.map(([label, home, away, unit]) => <div key={label}><div><strong>{home.toLocaleString('de-DE')}{unit}</strong><span>{label}</span><strong>{away.toLocaleString('de-DE')}{unit}</strong></div><div className="metric-track"><span style={{ width: `${home + away > 0 ? home / (home + away) * 100 : 50}%` }} /></div></div>)}</div>
      <h3>Spielverlauf</h3>{card.events.length ? <ol className="event-list">{card.events.map((event, index) => <li key={`${event.minute}-${index}`}><span>{event.minute}′</span><div><strong>{event.title}</strong><p>{event.description}</p></div></li>)}</ol> : <p>Noch keine Tore in diesem Demospiel.</p>}
    </>}
  </>
}

export function DetailModal({ card, saved, onSave, onClose }: { card: FeedCard; saved: boolean; onSave: () => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current!
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-top"><span>Bundesliga · {card.type === 'news' ? 'News' : 'Spiele'}</span><button className="icon-button" aria-label="Detailansicht schließen" onClick={onClose}><X size={22} /></button></div>
    <div className="dialog-body">
      {card.type === 'news' && <img className="detail-hero" src={card.image} alt={card.imageAlt} />}
      <span className="category-tag">{card.type === 'news' ? card.category : `${card.matchday}. Spieltag`}</span>
      <h2 id="detail-title">{card.title}</h2>
      <p className="detail-subtitle">{card.subtitle}</p>
      <div className="demo-notice">Fiktive Demodaten · {card.type === 'news' ? 'Beispielmeldung, kein aktueller Artikel der genannten Quelle.' : 'Kein echter Live-Ticker.'}</div>
      {card.type === 'news' ? <><div className="detail-author">{card.source} · {card.published} · {card.readTime}</div><div className="article-body">{card.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></> : <MatchDetails card={card} />}
      <button className={`save-detail ${saved ? 'selected' : ''}`} aria-pressed={saved} onClick={onSave}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Aus Merkliste entfernen' : 'Für später speichern'}</button>
    </div>
  </dialog>
}
