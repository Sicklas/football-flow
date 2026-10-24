import { ArrowUpRight, Bookmark, Clock3, Radio, Sparkles } from 'lucide-react'
import type { FeedCard, MatchCardData, NewsCardData } from '../types'
import { TeamCrest } from './TeamCrest'

type CardProps<T extends FeedCard = FeedCard> = { card: T; saved: boolean; onSave: () => void; onOpen: () => void }

export function DemoBadge() { return <span className="demo-badge">DEMODATEN</span> }

function CardFooter({ card, saved, onSave, onOpen }: CardProps) {
  return <div className="card-footer"><button className="read-button group" onClick={onOpen}>{card.type === 'news' ? 'Ganze Story lesen' : 'Zum Spielverlauf'}<ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button><button className={`icon-button save-button ${saved ? 'is-saved' : ''}`} aria-label={saved ? 'Aus Merkliste entfernen' : 'Karte speichern'} aria-pressed={saved} onClick={onSave}><Bookmark size={20} fill={saved ? 'currentColor' : 'none'} /></button></div>
}

function NewsCard(props: CardProps<NewsCardData>) {
  const { card, onOpen } = props
  return <article className="feed-card news-card">
    <img className="news-image" src={card.image} alt={card.imageAlt} loading={card.id === 'news-klassiker' ? 'eager' : 'lazy'} />
    <div className="news-shade" /><button className="news-image-target" onClick={onOpen} aria-label={`Story öffnen: ${card.title}`} />
    <div className="card-topline"><span className="category-badge"><span className="tiny-dot" />{card.category}</span><DemoBadge /></div>
    <div className="news-content"><span className="league-label"><span />BUNDESLIGA</span><button className="headline-button" onClick={onOpen}><h2>{card.title}</h2></button><p className="news-summary">{card.subtitle}</p><div className="news-meta"><span className="source-icon">f.</span><strong>{card.source}</strong><span className="meta-dot">·</span><span>{card.published}</span><span className="read-time"><Clock3 size={12} />{card.readTime.split(' ')[0]} Min.</span></div><CardFooter {...props} /></div>
  </article>
}

function MatchCard(props: CardProps<MatchCardData>) {
  const { card, onOpen } = props
  const lastGoal = card.events.find(event => event.kind === 'goal')
  return <article className="feed-card match-card"><div className="pitch-pattern" aria-hidden="true"><span /></div><div className="card-topline"><span className={`category-badge ${card.status === 'live' ? 'live-category' : ''}`}><Radio size={13} />{card.status === 'live' ? 'LIVE-MATCH' : 'ABPFIFF'}</span><DemoBadge /></div>
    <div className="match-main"><span className="league-label"><span />BUNDESLIGA</span><h2 className="match-title">{card.title}</h2><span className={`match-minute ${card.status === 'live' ? 'is-live' : ''}`}><span />{card.status === 'live' ? `${card.minute}′ · 2. Halbzeit` : 'Beendet · 90′'}</span><button className="scoreboard" onClick={onOpen} aria-label={`${card.home.name} ${card.score[0]} zu ${card.score[1]} ${card.away.name}, Spieldetails öffnen`}><span className="scoreboard-team"><TeamCrest team={card.home} /><strong>{card.home.short}</strong><span>Heim</span></span><span className="score"><strong>{card.score[0]}<span>:</span>{card.score[1]}</strong><span>DEMOSPIEL</span></span><span className="scoreboard-team"><TeamCrest team={card.away} /><strong>{card.away.short}</strong><span>Auswärts</span></span></button><p className="match-venue">{card.venue}</p>{lastGoal && <div className="match-moment"><span className="moment-icon">⚽</span><div><span>{lastGoal.minute}′ · DER LETZTE TREFFER</span><strong>{lastGoal.title}</strong></div></div>}</div>
    <div className="standard-card-bottom"><p className="demo-footnote">Fiktiver Spielstand · keine Live-Daten</p><CardFooter {...props} /></div>
  </article>
}

export function FeedCardView(props: CardProps) {
  return props.card.type === 'news' ? <NewsCard {...props} card={props.card} /> : <MatchCard {...props} card={props.card} />
}

export function EmptyFeed({ saved, onReset }: { saved: boolean; onReset: () => void }) {
  return <div className="empty-feed"><span className="empty-icon">{saved ? <Bookmark size={32} /> : <Sparkles size={32} />}</span><h2>{saved ? 'Deine Highlights warten.' : 'Hier ist es noch ruhig.'}</h2><p>{saved ? 'Tippe auf das Lesezeichen einer Karte, um sie hier für später zu sammeln.' : 'Für diesen Suchbegriff gibt es keine Karten. Entdecke weitere Bundesliga-Geschichten im Feed.'}</p><button className="primary-button" onClick={onReset}>Zum gesamten Feed <ArrowUpRight size={17} /></button></div>
}
