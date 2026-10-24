import { news } from './news.ts'
import { matches } from './matches.ts'
import type { FeedCard } from '../types'

// Shared search/bookmark inventory. The UI presents games and news separately.
export const feed: FeedCard[] = [...news, ...matches]
