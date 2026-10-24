import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { availableMatchdays } from '../data/matchdays'

export function MatchdaySelector({ day, onChange }: { day: number; onChange: (day: number) => void }) {
  const list = useRef<HTMLDivElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const index = availableMatchdays.indexOf(day)
  const move = (direction: number) => {
    const next = availableMatchdays[index + direction]
    if (next !== undefined) onChange(next)
  }
  useEffect(() => {
    const active = list.current?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (active && list.current) list.current.scrollLeft = Math.max(0, active.offsetLeft - list.current.offsetLeft - list.current.clientWidth / 2 + active.clientWidth / 2)
  }, [day])
  return <div className="matchday-navigation" aria-label="Spieltagsauswahl">
    <button className="day-arrow" disabled={index === 0} aria-label="Vorheriger Spieltag" onClick={() => move(-1)}><ChevronLeft size={22} /></button>
    <div className="matchday-list" ref={list} onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }} onTouchEnd={event => {
      if (!touch.current) return
      const dx = touch.current.x - event.changedTouches[0].clientX
      const dy = touch.current.y - event.changedTouches[0].clientY
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx > 0 ? 1 : -1)
      touch.current = null
    }}>
      {availableMatchdays.map(value => <button key={value} aria-pressed={day === value} className={`day-tab ${day === value ? 'active' : ''}`} onClick={() => onChange(value)}><strong>{value}.</strong><span>Spieltag</span></button>)}
    </div>
    <button className="day-arrow" disabled={index === availableMatchdays.length - 1} aria-label="Nächster Spieltag" onClick={() => move(1)}><ChevronRight size={22} /></button>
  </div>
}
