import { useState } from 'react'

const STORAGE_KEY = 'football-flow:saved:v1'

export function useSavedCards() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : []
    } catch { return [] }
  })
  const toggle = (id: string) => {
    setSavedIds(previous => {
      const next = previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* Saving for this session still works if storage is unavailable. */ }
      return next
    })
  }
  return { savedIds, toggle }
}
