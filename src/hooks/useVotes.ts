import { useEffect, useState } from 'react'
import { changeVote, parseVotes, VOTES_KEY, type Vote } from '../lib/prototype'

export function useVotes() {
  const [votes, setVotes] = useState(() => {
    try { return parseVotes(localStorage.getItem(VOTES_KEY)) } catch { return {} }
  })
  useEffect(() => {
    try { localStorage.setItem(VOTES_KEY, JSON.stringify(votes)) } catch { /* Private browsers can still vote for this session. */ }
  }, [votes])
  return { votes, vote: (id: string, value: Vote) => setVotes(previous => changeVote(previous, id, value)) }
}
