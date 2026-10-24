import type { MatchCardData } from '../types'
import { TeamCrest } from './TeamCrest'

export function MatchRow({ match, onOpen }: { match: MatchCardData; onOpen: () => void }) {
  const scheduled = match.status === 'scheduled'
  return <button className={`match-row ${match.status}`} onClick={onOpen} aria-label={`${match.home.name} gegen ${match.away.name}, ${scheduled ? `Geplant, ${match.dateLabel}, ${match.kickoff}` : `${match.score[0]} zu ${match.score[1]}, ${match.status === 'live' ? `Live, ${match.minute}. Minute` : 'Beendet'}`}. Details öffnen`}>
    <TeamCrest team={match.home} /><span className="team-name home-name">{match.home.short === 'Bayern München' ? <>Bayern<br />München</> : match.home.short}</span>
    <span className="match-result"><span className={match.status === 'live' ? 'live-badge' : 'match-status'}>{match.status === 'live' ? <><i />LIVE</> : scheduled ? match.dateLabel : 'Beendet'}</span>
      <strong>{scheduled ? match.kickoff : `${match.score[0]} : ${match.score[1]}`}</strong>
      {match.status === 'live' && <span className="match-minute">{match.minute}′</span>}
      {scheduled && <span className="sr-only">Geplant</span>}
    </span>
    <span className="team-name away-name">{match.away.short}</span><TeamCrest team={match.away} />
  </button>
}
