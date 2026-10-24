import test from 'node:test'
import assert from 'node:assert/strict'
import { availableMatchdays, currentMatchday, matchdays } from '../src/data/matchdays.ts'
import { news } from '../src/data/news.ts'
import { changeVote, initialSection, parseVotes, sortMatches, sortNews, voteCounts } from '../src/lib/prototype.ts'

test('every matchday contains nine unique matches and all 18 clubs once', () => {
  for (const day of availableMatchdays) {
    const matches = matchdays[day]
    assert.equal(matches.length, 9)
    assert.equal(new Set(matches.map(match => match.id)).size, 9)
    assert.equal(new Set(matches.flatMap(match => [match.home.name, match.away.name])).size, 18)
    assert.ok(matches.every(match => match.matchday === day))
    for (const match of matches) {
      assert.notEqual(match.home.name, match.away.name)
      if (match.status === 'scheduled') {
        assert.match(match.kickoff, /^\d{2}:\d{2}$/)
        assert.ok(match.dateLabel)
        assert.equal(match.events.length, 0)
      } else {
        assert.equal(match.events.filter(e => e.kind === 'goal' && e.side === 'home').length, match.score[0])
        assert.equal(match.events.filter(e => e.kind === 'goal' && e.side === 'away').length, match.score[1])
        assert.ok(match.events.every(e => Number(e.minute) <= match.minute))
      }
    }
  }
})
test('live, upcoming, finished ordering works without mutating source data', () => {
  const source = [...matchdays[currentMatchday]].reverse()
  const before = [...source]
  const sorted = sortMatches(source)
  assert.deepEqual(sorted.map(m => m.status), ['live', 'live', 'scheduled', 'scheduled', 'scheduled', 'scheduled', 'finished', 'finished', 'finished'])
  assert.deepEqual(source, before)
  const noLive = sortMatches(source.filter(m => m.status !== 'live'))
  assert.equal(noLive[0].status, 'scheduled')
  assert.equal(noLive.at(-1).status, 'finished')
})
test('startup follows live status and valid manual session preference wins', () => {
  assert.equal(initialSection(matchdays[8], null), 'matches')
  assert.equal(initialSection(matchdays[9], null), 'news')
  assert.equal(initialSection(matchdays[8], 'news'), 'news')
  assert.equal(initialSection(matchdays[9], 'matches'), 'matches')
  assert.equal(initialSection(matchdays[8], 'broken'), 'matches')
})
test('a vote can be cast, changed, removed and restored without double counting', () => {
  const card = news[0]
  let votes = changeVote({}, card.id, 'up')
  assert.deepEqual(voteCounts(card, votes[card.id]), { up: 343, down: 28 })
  votes = changeVote(votes, card.id, 'down')
  assert.deepEqual(voteCounts(card, votes[card.id]), { up: 342, down: 29 })
  votes = parseVotes(JSON.stringify(votes))
  assert.equal(votes[card.id], 'down')
  votes = changeVote(votes, card.id, 'down')
  assert.deepEqual(votes, {})
  assert.deepEqual(voteCounts(card, votes[card.id]), { up: 342, down: 28 })
})
test('votes are independent and invalid local storage is ignored', () => {
  const first = changeVote({}, news[0].id, 'up')
  const second = changeVote(first, news[1].id, 'down')
  assert.equal(second[news[0].id], 'up')
  assert.equal(second[news[1].id], 'down')
  assert.equal(first[news[1].id], undefined)
  for (const raw of [null, 'bad json', 'null', '[]', '42', '"up"']) assert.deepEqual(parseVotes(raw), {})
  assert.deepEqual(parseVotes('{"a":"up","b":"down","c":true}'), { a: 'up', b: 'down' })
})
test('news remain chronological regardless of input order or voting', () => {
  assert.deepEqual(sortNews([...news].reverse()).map(n => n.id), news.map(n => n.id))
  assert.ok(news.every(n => Number.isFinite(Date.parse(n.publishedAt))))
})
