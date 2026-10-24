import { useEffect, useState } from 'react'

const STORAGE_KEY = 'football-flow:saved:v1'

export function useSavedCards() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : []
    } catch { return [] }
  })
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds)) } catch { /* Bookmarks remain usable in memory. */ }
  }, [savedIds])
  const toggle = (id: string) => setSavedIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id])
  return { savedIds, toggle }
}
