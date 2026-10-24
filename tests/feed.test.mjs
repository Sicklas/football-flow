import test from 'node:test'
import assert from 'node:assert/strict'
import { feed } from '../src/data/feed.ts'
import { filterFeed } from '../src/lib/filterFeed.ts'

test('inventory has five stories and nine unique Bundesliga matches', () => {
  assert.equal(feed.length, 14)
  assert.equal(new Set(feed.map(card => card.id)).size, 14)
  assert.equal(feed.filter(card => card.type === 'news').length, 5)
  assert.equal(feed.filter(card => card.type === 'match').length, 9)
  assert.ok(feed.every(card => card.league === 'Bundesliga'))
})
test('news and match filters return the expected content', () => {
  assert.equal(filterFeed(feed, 'match', '', []).length, 9)
  assert.equal(filterFeed(feed, 'news', '', []).length, 5)
  assert.equal(filterFeed(feed, 'all', '', []).length, 14)
})
test('search finds nested team names and article text, ignoring case and whitespace', () => {
  const cards = filterFeed(feed, 'match', '  FRANKFURT  ', [])
  assert.equal(cards.length, 1)
  assert.equal(cards[0].id, 'day-8-3')
  assert.ok(filterFeed(feed, 'news', 'Stuttgart', []).length > 0)
  assert.equal(filterFeed(feed, 'all', 'unbekannter Suchbegriff', []).length, 0)
})
test('saved inventory combines bookmarks and search', () => {
  const ids = ['news-klassiker', 'day-8-3']
  assert.equal(filterFeed(feed, 'saved', '', ids).length, 2)
  assert.equal(filterFeed(feed, 'saved', 'Frankfurt', ids)[0]?.id, 'day-8-3')
  assert.equal(filterFeed(feed, 'saved', '', []).length, 0)
})
test('played scores agree with goal events and possession totals 100 percent', () => {
  for (const card of feed) {
    if (card.type !== 'match' || card.status === 'scheduled') continue
    assert.equal(card.possession[0] + card.possession[1], 100)
    assert.equal(card.events.filter(event => event.kind === 'goal' && event.side === 'home').length, card.score[0])
    assert.equal(card.events.filter(event => event.kind === 'goal' && event.side === 'away').length, card.score[1])
  }
})
