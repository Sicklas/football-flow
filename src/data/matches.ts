import type { MatchCardData } from '../types'
import { teams } from './teams.ts'

export const matches: MatchCardData[] = [
  {
    id: 'match-bayern-leverkusen', type: 'match', league: 'Bundesliga',
    title: 'Spitzenspiel unter Flutlicht', subtitle: 'Ein offenes Spiel. Und noch ist alles drin.',
    home: teams.bayern, away: teams.leverkusen, score: [2, 1], minute: 74, status: 'live',
    venue: 'München · Demo-Spieltag 8', possession: [58, 42], shots: [14, 9], xg: [2.1, 1.3],
    events: [
      { minute: '71', kind: 'substitution', title: 'Neue Energie für Leverkusen', description: 'Ein frischer Offensivspieler kommt ins Spiel.', side: 'away' },
      { minute: '63', kind: 'goal', title: 'Tor für Bayern! 2 : 1', description: 'Ein direkter Abschluss nach einer flachen Hereingabe.', side: 'home' },
      { minute: '48', kind: 'card', title: 'Gelbe Karte für Leverkusen', description: 'Taktisches Foul im Mittelfeld.', side: 'away' },
      { minute: '34', kind: 'goal', title: 'Ausgleich! 1 : 1', description: 'Leverkusen trifft nach einem schnellen Gegenstoß.', side: 'away' },
      { minute: '18', kind: 'goal', title: 'Bayern geht in Führung! 1 : 0', description: 'Der erste Treffer des fiktiven Abends.', side: 'home' },
    ],
  },
  {
    id: 'match-dortmund-frankfurt', type: 'match', league: 'Bundesliga',
    title: 'Alles offen in Dortmund', subtitle: 'Zwei Spielideen. Ein Duell auf Augenhöhe.',
    home: teams.dortmund, away: teams.frankfurt, score: [1, 1], minute: 61, status: 'live',
    venue: 'Dortmund · Demo-Spieltag 8', possession: [46, 54], shots: [8, 11], xg: [1.2, 1.5],
    events: [
      { minute: '57', kind: 'goal', title: 'Frankfurt gleicht aus! 1 : 1', description: 'Ein präziser Schuss aus dem Rückraum.', side: 'away' },
      { minute: '42', kind: 'card', title: 'Gelbe Karte für Dortmund', description: 'Zu spät im Zweikampf.', side: 'home' },
      { minute: '23', kind: 'goal', title: 'Dortmund trifft! 1 : 0', description: 'Die Gastgeber nutzen eine Ecke zur Führung.', side: 'home' },
    ],
  },
  {
    id: 'match-stuttgart-leipzig', type: 'match', league: 'Bundesliga',
    title: 'Drama bis zum Schluss', subtitle: 'Große Bühne. Große Momente. Bis zur letzten Sekunde.',
    home: teams.stuttgart, away: teams.leipzig, score: [3, 2], minute: 90, status: 'finished',
    venue: 'Stuttgart · Demo-Spieltag 8', possession: [48, 52], shots: [16, 13], xg: [2.8, 2.0],
    events: [
      { minute: '90+4', kind: 'whistle', title: 'Abpfiff in Stuttgart', description: 'Ein torreiches Demo-Spiel endet 3 : 2.', side: 'home' },
      { minute: '88', kind: 'goal', title: 'Die Entscheidung! 3 : 2', description: 'Stuttgart trifft nach einer Freistoßflanke.', side: 'home' },
      { minute: '76', kind: 'goal', title: 'Leipzig gleicht aus! 2 : 2', description: 'Ein Sololauf wird mit dem Ausgleich belohnt.', side: 'away' },
      { minute: '51', kind: 'goal', title: 'Stuttgart dreht das Spiel! 2 : 1', description: 'Ein Konter nach der Pause bringt die Führung.', side: 'home' },
      { minute: '29', kind: 'goal', title: 'Ausgleich für Stuttgart! 1 : 1', description: 'Ein Kopfball nach einem Eckstoß.', side: 'home' },
      { minute: '12', kind: 'goal', title: 'Leipzig legt vor! 0 : 1', description: 'Ein schneller Angriff durch das Zentrum.', side: 'away' },
    ],
  },
  {
    id: 'match-bremen-freiburg', type: 'match', league: 'Bundesliga',
    title: 'Bremen hält dagegen', subtitle: 'Die Schlussphase läuft. Bleibt es beim knappen Vorsprung?',
    home: teams.bremen, away: teams.freiburg, score: [1, 0], minute: 82, status: 'live',
    venue: 'Bremen · Demo-Spieltag 8', possession: [44, 56], shots: [9, 12], xg: [1.1, 1.4],
    events: [
      { minute: '78', kind: 'substitution', title: 'Freiburg setzt auf frische Kräfte', description: 'Ein offensiver Wechsel für die Schlussphase.', side: 'away' },
      { minute: '65', kind: 'card', title: 'Gelbe Karte für Bremen', description: 'Ein unterbundener Konter im Mittelfeld.', side: 'home' },
      { minute: '38', kind: 'goal', title: 'Bremen geht in Führung! 1 : 0', description: 'Ein Kopfball nach einer Flanke von rechts.', side: 'home' },
    ],
  },
]

