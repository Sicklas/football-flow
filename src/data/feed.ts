import { news } from './news.ts'
import { matches } from './matches.ts'
import type { FeedCard } from '../types'

// API adapter boundary: replace this array with mapped API responses later.
// Every headline, score, event and statistic here is fictional demo content.
export const feed: FeedCard[] = [
  news[0], matches[0], news[1], matches[1], news[2],
  matches[2], news[3], matches[3], news[4],
]
