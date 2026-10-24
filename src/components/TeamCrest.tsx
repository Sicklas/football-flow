import type { CSSProperties } from 'react'
import type { Team } from '../types'

export function TeamCrest({ team }: { team: Team }) {
  return <span className="team-crest" style={{ '--team-color': team.color, '--team-secondary': team.secondary } as CSSProperties} aria-label={`${team.name} · Demo-Wappen`}>
    <span className="crest-star">★</span><strong>{team.monogram}</strong><span className="crest-lines" />
  </span>
}
