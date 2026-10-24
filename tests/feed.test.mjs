import test from 'node:test'
import assert from 'node:assert/strict'
import { feed } from '../src/data/feed.ts'
import { filterFeed } from '../src/lib/filterFeed.ts'

test('nine unique Bundesliga cards, mixing five news stories and four matches', () => {
  assert.equal(feed.length, 9)
  assert.equal(new Set(feed.map(card => card.id)).size, 9)
  assert.equal(feed.filter(card => card.type === 'news').length, 5)
  assert.equal(feed.filter(card => card.type === 'match').length, 4)
  assert.ok(feed.every(card => card.league === 'Bundesliga'))
  assert.deepEqual(feed.slice(0, 4).map(card => card.type), ['news', 'match', 'news', 'match'])
})

test('news and match filters return the expected content', () => {
  assert.equal(filterFeed(feed, 'match', '', []).length, 4)
  assert.equal(filterFeed(feed, 'news', '', []).length, 5)
  assert.equal(filterFeed(feed, 'all', '', []).length, 9)
})

test('search finds nested team names and article text, ignoring case and whitespace', () => {
  const cards = filterFeed(feed, 'match', '  FRANKFURT  ', [])
  assert.equal(cards.length, 1)
  assert.equal(cards[0].id, 'match-dortmund-frankfurt')
  assert.ok(filterFeed(feed, 'news', 'Stuttgart', []).length > 0)
  assert.equal(filterFeed(feed, 'all', 'unbekannter Suchbegriff', []).length, 0)
})

test('saved feed combines bookmarks and search', () => {
  const ids = ['news-klassiker', 'match-dortmund-frankfurt']
  assert.equal(filterFeed(feed, 'saved', '', ids).length, 2)
  assert.equal(filterFeed(feed, 'saved', 'Frankfurt', ids)[0]?.id, 'match-dortmund-frankfurt')
  assert.equal(filterFeed(feed, 'saved', '', []).length, 0)
})

test('scores agree with goal events and possession totals 100 percent', () => {
  for (const card of feed) {
    if (card.type !== 'match') continue
    assert.equal(card.possession[0] + card.possession[1], 100)
    assert.equal(card.events.filter(event => event.kind === 'goal' && event.side === 'home').length, card.score[0])
    assert.equal(card.events.filter(event => event.kind === 'goal' && event.side === 'away').length, card.score[1])
  }
})
