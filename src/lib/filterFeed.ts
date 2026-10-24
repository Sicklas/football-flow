import type { FeedCard, FeedFilter } from '../types'

export function filterFeed(cards: FeedCard[], filter: FeedFilter, query: string, savedIds: string[]) {
  const search = query.trim().toLocaleLowerCase('de-DE')
  return cards.filter(card => {
    if (filter === 'saved' ? !savedIds.includes(card.id) : filter !== 'all' && card.type !== filter) return false
    const searchable = [card.title, card.subtitle, card.league,
      ...(card.type === 'match' ? [card.home.name, card.away.name, card.home.short, card.away.short] : []),
      ...(card.type === 'news' ? [card.category, ...card.body] : []),
    ].join(' ').toLocaleLowerCase('de-DE')
    return !search || searchable.includes(search)
  })
}
