import type { Team } from '../types'

// Local assets extracted from the supplied reference; two original fallback crests.
export const teams = {
  bayern: { crest: '/images/clubs/bayern.png', name: 'FC Bayern München', short: 'Bayern München', color: '#da3048', secondary: '#3677c8', monogram: 'FCB' },
  dortmund: { crest: '/images/clubs/dortmund.png', name: 'Borussia Dortmund', short: 'Dortmund', color: '#f5d72f', secondary: '#171916', monogram: 'BVB' },
  leverkusen: { crest: '/images/clubs/leverkusen.png', name: 'Bayer 04 Leverkusen', short: 'Leverkusen', color: '#db3440', secondary: '#202020', monogram: 'B04' },
  frankfurt: { crest: '/images/clubs/frankfurt.png', name: 'Eintracht Frankfurt', short: 'Frankfurt', color: '#c83e44', secondary: '#e6e2d8', monogram: 'SGE' },
  stuttgart: { crest: '/images/clubs/stuttgart.png', name: 'VfB Stuttgart', short: 'Stuttgart', color: '#f0e9df', secondary: '#d93b49', monogram: 'VfB' },
  leipzig: { crest: '/images/clubs/leipzig.png', name: 'RB Leipzig', short: 'Leipzig', color: '#d34450', secondary: '#e6e2d8', monogram: 'RBL' },
  bremen: { crest: '/images/clubs/bremen.png', name: 'Werder Bremen', short: 'Bremen', color: '#268565', secondary: '#e4e9e2', monogram: 'SVW' },
  freiburg: { crest: '/images/clubs/freiburg.png', name: 'SC Freiburg', short: 'Freiburg', color: '#d54b50', secondary: '#272c26', monogram: 'SCF' },
  hoffenheim: { name: 'TSG Hoffenheim', short: 'Hoffenheim', color: '#2879bf', secondary: '#fff', monogram: 'TSG', crest: '/images/clubs/hoffenheim.png' },
  gladbach: { name: 'Borussia Mönchengladbach', short: 'M’gladbach', color: '#202522', secondary: '#fff', monogram: 'BMG', crest: '/images/clubs/gladbach.png' },
  wolfsburg: { name: 'VfL Wolfsburg', short: 'Wolfsburg', color: '#40b94b', secondary: '#fff', monogram: 'WOB', crest: '/images/clubs/wolfsburg.png' },
  augsburg: { name: 'FC Augsburg', short: 'Augsburg', color: '#d22d36', secondary: '#fff', monogram: 'FCA', crest: '/images/clubs/augsburg.png' },
  heidenheim: { name: '1. FC Heidenheim', short: 'Heidenheim', color: '#154e83', secondary: '#ed3343', monogram: 'FCH', crest: '/images/clubs/heidenheim.png' },
  union: { name: '1. FC Union Berlin', short: 'Union Berlin', color: '#d93932', secondary: '#f3c743', monogram: 'FCU', crest: '/images/clubs/union.png' },
  bochum: { name: 'VfL Bochum', short: 'Bochum', color: '#18659e', secondary: '#fff', monogram: 'VfL', crest: '/images/clubs/bochum.png' },
  mainz: { name: '1. FSV Mainz 05', short: 'Mainz', color: '#db2539', secondary: '#fff', monogram: '05', crest: '/images/clubs/mainz.png' },
  pauli: { name: 'FC St. Pauli', short: 'St. Pauli', color: '#5c3e30', secondary: '#fff', monogram: 'FCSP' },
  kiel: { name: 'Holstein Kiel', short: 'Kiel', color: '#2368ae', secondary: '#e43d46', monogram: 'KSV' },
} satisfies Record<string, Team>
