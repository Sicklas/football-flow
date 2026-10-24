export type League = 'Bundesliga'
export type FeedFilter = 'all' | 'news' | 'match' | 'saved'

export interface Team {
  name: string
  short: string
  color: string
  secondary?: string
  monogram: string
}

interface BaseCard {
  id: string
  league: League
  title: string
  subtitle: string
}

export interface NewsCardData extends BaseCard {
  type: 'news'
  image: string
  imageAlt: string
  category: string
  source: string
  published: string
  readTime: string
  body: string[]
}

export interface MatchEvent {
  minute: string
  kind: 'goal' | 'card' | 'substitution' | 'whistle'
  title: string
  description: string
  side: 'home' | 'away'
}

export interface MatchCardData extends BaseCard {
  type: 'match'
  home: Team
  away: Team
  score: [number, number]
  minute: number
  status: 'live' | 'finished'
  venue: string
  events: MatchEvent[]
  possession: [number, number]
  shots: [number, number]
  xg: [number, number]
}

export type FeedCard = NewsCardData | MatchCardData
