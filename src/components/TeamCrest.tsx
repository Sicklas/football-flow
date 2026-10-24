import type { CSSProperties } from 'react'
import type { Team } from '../types'

export function TeamCrest({ team }: { team: Team }) {
  if (team.crest) return <img className="team-crest crest-image" src={team.crest} alt={`${team.name} Wappen`} width="44" height="44" />
  return <span className="team-crest crest-fallback" style={{ '--team-color': team.color, '--team-secondary': team.secondary } as CSSProperties} aria-label={`${team.name} · Platzhalter-Wappen`}>
    <strong>{team.monogram}</strong>
  </span>
}
