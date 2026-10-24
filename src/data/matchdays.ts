import type { MatchCardData, Team } from '../types'
import { teams } from './teams.ts'

export const currentMatchday = 8
export const availableMatchdays = [6, 7, 8, 9, 10]

const fixtures: [Team, Team][] = [
  [teams.bayern, teams.dortmund], [teams.leipzig, teams.freiburg],
  [teams.stuttgart, teams.bremen], [teams.leverkusen, teams.frankfurt],
  [teams.hoffenheim, teams.gladbach], [teams.wolfsburg, teams.augsburg],
  [teams.heidenheim, teams.union], [teams.bochum, teams.mainz],
  [teams.pauli, teams.kiel],
]

function createMatch(day: number, index: number, home: Team, away: Team): MatchCardData {
  const isCurrent = day === currentMatchday
  const status = day < currentMatchday ? 'finished' : day > currentMatchday ? 'scheduled'
    : index < 2 ? 'live' : index < 6 ? 'scheduled' : 'finished'
  const score: [number, number] = status === 'scheduled' ? [0, 0] : isCurrent
    ? [[2, 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [1, 3], [0, 2], [2, 2]][index] as [number, number]
    : [(day + index) % 4, (day * 2 + index) % 3]
  const minute = status === 'live' ? index === 0 ? 67 : 23 : status === 'finished' ? 90 : 0
  const kickoff = ['15:30', '15:30', '15:30', '18:30', '15:30', '17:30', '20:30', '15:30', '17:30'][index]
  const date = new Date(Date.UTC(2026, 9, 10 + (day - 6) * 7 + (index < 4 ? 0 : 1)))
  const dateLabel = isCurrent && index < 4 ? 'Heute' : `${index < 4 ? 'Sa' : 'So'}, ${date.getUTCDate()}. ${date.getUTCMonth() === 9 ? 'Okt.' : 'Nov.'}`
  // Goal events and statistics are illustrative, never presented as live data.
  const events: MatchCardData['events'] = status === 'scheduled' ? [] : [
    ...Array.from({ length: score[0] }, (_, i) => ({ minute: String(12 + i * 19), kind: 'goal' as const, title: `Tor für ${home.short}`, description: 'Fiktiver Treffer nach einem Angriff über den Flügel.', side: 'home' as const })),
    ...Array.from({ length: score[1] }, (_, i) => ({ minute: String(18 + i * 17), kind: 'goal' as const, title: `Tor für ${away.short}`, description: 'Fiktiver Treffer nach einer Hereingabe.', side: 'away' as const })),
  ].sort((a, b) => Number(b.minute) - Number(a.minute))
  return {
    id: `day-${day}-${index}`, type: 'match', league: 'Bundesliga',
    title: `${home.short} gegen ${away.short}`, subtitle: `${day}. Spieltag · ${status === 'scheduled' ? 'Die Begegnung steht bevor.' : 'Alle Tore und Zahlen auf einen Blick.'}`,
    home, away, status, score, minute, kickoff, dateLabel, matchday: day,
    venue: `${home.short} · ${day}. Spieltag`, events,
    possession: status === 'scheduled' ? [0, 0] : [54, 46],
    shots: status === 'scheduled' ? [0, 0] : [12, 8], xg: status === 'scheduled' ? [0, 0] : [1.8, 1.1],
  }
}

// Each fictional matchday features every one of the 18 clubs exactly once.
export const matchdays: Record<number, MatchCardData[]> = Object.fromEntries(
  availableMatchdays.map(day => {
    const rotation = (day - currentMatchday + fixtures.length) % fixtures.length
    return [day, fixtures.map(([home], index) => createMatch(day, index, home, fixtures[(index + rotation) % fixtures.length][1]))]
  }),
)
