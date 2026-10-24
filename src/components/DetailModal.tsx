import { useEffect, useRef } from 'react'
import { ArrowDownUp, ArrowUpRight, Bookmark, CircleHelp, Goal, X } from 'lucide-react'
import type { FeedCard, MatchCardData } from '../types'
import { DemoBadge } from './Cards'
import { TeamCrest } from './TeamCrest'
import { Brand } from './Brand'

function MatchDetails({ card }: { card: MatchCardData }) {
  const metrics: [string, number, number, string][] = [
    ['Ballbesitz', ...card.possession, '%'], ['Schüsse', ...card.shots, ''], ['Expected Goals', ...card.xg, ''],
  ]
  return <>
    <div className="detail-scoreboard"><div><TeamCrest team={card.home} /><strong>{card.home.short}</strong></div><div><span className="detail-minute">{card.status === 'live' ? `${card.minute}′ · Demo live` : 'Beendet'}</span><strong>{card.score[0]} : {card.score[1]}</strong></div><div><TeamCrest team={card.away} /><strong>{card.away.short}</strong></div></div>
    <p className="detail-venue">{card.venue}</p>
    <h3>Das Spiel in Zahlen</h3><div className="match-metrics">{metrics.map(([label, home, away, unit]) => <div key={label}><div><strong>{home.toLocaleString('de-DE')}{unit}</strong><span>{label}</span><strong>{away.toLocaleString('de-DE')}{unit}</strong></div><div className="metric-track"><span style={{ width: `${home / (home + away) * 100}%` }} /></div></div>)}</div>
    <h3>Spielverlauf <span className="small-muted">Fiktive Ereignisse</span></h3><ol className="event-list">{card.events.map((event, index) => <li key={`${event.minute}-${index}`}><span className="event-minute">{event.minute}′</span><span className={`event-symbol event-${event.kind}`}>{event.kind === 'goal' ? <Goal size={17} /> : event.kind === 'card' ? <i /> : <ArrowDownUp size={16} />}</span><div><strong>{event.title}</strong><p>{event.description}</p><span>{event.side === 'home' ? card.home.short : card.away.short}</span></div></li>)}</ol>
  </>
}

export function DetailModal({ card, saved, onSave, onClose }: { card: FeedCard | 'about'; saved: boolean; onSave: () => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current!
    const previous = document.activeElement as HTMLElement | null
    element.showModal()
    return () => { element.close(); previous?.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-shell"><div className="dialog-top"><span>{card === 'about' ? 'WILLKOMMEN IM FLOW' : card.league}</span><div><DemoBadge /><button className="icon-button" aria-label="Detailansicht schließen" onClick={onClose}><X size={21} /></button></div></div>
      <div className="dialog-body">
        {card === 'about' ? <><Brand /><h2 id="detail-title">Dein Spiel. Dein Flow.</h2><p>Bundesliga-News und Spiele in einem vertikalen Feed. Jede Karte füllt die Bildschirmhöhe — im 9:16-Hochformat auf großen Bildschirmen und bildschirmfüllend auf schmalen Smartphones.</p><div className="about-info"><CircleHelp size={21} /><p>Alle Nachrichten, Spielstände, Ereignisse und Vergleichswerte sind erfundene Demodaten. Es gibt keine Anbindung an Live-APIs. Wappen sind eigens gestaltete Platzhalter.</p></div><h3>So findest du deinen Flow</h3><ul className="about-list"><li>Wische nach oben oder scrolle zur nächsten Karte.</li><li>Nutze am Desktop die Pfeiltasten ↑ ↓ oder die Pfeile neben dem Feed.</li><li>Öffne eine Story oder ein Spiel für alle Details.</li><li>Speichere deine Highlights über das Lesezeichen.</li><li>Wechsle zwischen News und Spielen oder suche nach einem Bundesliga-Thema.</li></ul><p className="small-muted">Gespeicherte Karten werden nur in diesem Browser gespeichert. Keine Registrierung erforderlich.</p></> : <>
          {card.type === 'news' && <img className="detail-hero" src={card.image} alt={card.imageAlt} />}
          <p className="detail-eyebrow">{card.type === 'news' ? card.category : 'DAS SPIEL IM DETAIL'}</p>
          <h2 id="detail-title">{card.title}</h2><p className="detail-subtitle">{card.subtitle}</p>
          <div className="demo-notice">Demoinhalt · {card.type === 'news' ? 'Fiktive Nachricht, keine aktuelle Berichterstattung.' : 'Erfundener Spielstand und Spielverlauf. Kein Live-Ticker.'}</div>
          {card.type === 'news' && <><div className="detail-author"><span className="source-icon">f.</span><strong>{card.source}</strong><span>{card.published} · {card.readTime}</span></div><div className="article-body">{card.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><p className="image-credit">Symbolbild: Unsplash · Lokal gespeichertes Foto</p></>}
          {card.type === 'match' && <MatchDetails card={card} />}
          <button className={`primary-button detail-save ${saved ? 'saved' : ''}`} onClick={onSave}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Aus Merkliste entfernen' : 'Für später speichern'}<ArrowUpRight size={16} /></button>
        </>}
      </div>
    </div>
  </dialog>
}
