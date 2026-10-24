import type { MatchCardData, NewsCardData } from '../types'

export type Section = 'matches' | 'news'
export type Vote = 'up' | 'down'
export type Votes = Record<string, Vote>
export const VOTES_KEY = 'football-flow:votes:v1'
export const SECTION_KEY = 'football-flow:section:v02'

export function initialSection(matches: MatchCardData[], stored: string | null): Section {
  if (stored === 'matches' || stored === 'news') return stored
  return matches.some(match => match.status === 'live') ? 'matches' : 'news'
}
export function sortMatches(matches: MatchCardData[]) {
  const order = { live: 0, scheduled: 1, finished: 2 }
  return [...matches].sort((a, b) => order[a.status] - order[b.status])
}
export function sortNews(news: NewsCardData[]) {
  return [...news].sort((a, b) => Date.parse(b.publishedAt ?? '') - Date.parse(a.publishedAt ?? ''))
}
export function parseVotes(value: string | null): Votes {
  try {
    const parsed: unknown = JSON.parse(value ?? '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(Object.entries(parsed).filter(([, vote]) => vote === 'up' || vote === 'down'))
  } catch { return {} }
}
export function changeVote(votes: Votes, id: string, vote: Vote): Votes {
  const next = { ...votes }
  if (next[id] === vote) delete next[id]
  else next[id] = vote
  return next
}
export function voteCounts(card: NewsCardData, vote?: Vote) {
  return { up: (card.upvotes ?? 0) + (vote === 'up' ? 1 : 0), down: (card.downvotes ?? 0) + (vote === 'down' ? 1 : 0) }
}
