import type { Team } from '../types'

// Original, locally rendered demo crests; no official club logo assets.
export const teams = {
  bayern: { name: 'FC Bayern München', short: 'FC Bayern', color: '#da3048', secondary: '#3677c8', monogram: 'FCB' },
  dortmund: { name: 'Borussia Dortmund', short: 'Dortmund', color: '#f5d72f', secondary: '#171916', monogram: 'BVB' },
  leverkusen: { name: 'Bayer 04 Leverkusen', short: 'Leverkusen', color: '#db3440', secondary: '#202020', monogram: 'B04' },
  frankfurt: { name: 'Eintracht Frankfurt', short: 'Frankfurt', color: '#c83e44', secondary: '#e6e2d8', monogram: 'SGE' },
  stuttgart: { name: 'VfB Stuttgart', short: 'Stuttgart', color: '#f0e9df', secondary: '#d93b49', monogram: 'VfB' },
  leipzig: { name: 'RB Leipzig', short: 'Leipzig', color: '#d34450', secondary: '#e6e2d8', monogram: 'RBL' },
  bremen: { name: 'Werder Bremen', short: 'Bremen', color: '#268565', secondary: '#e4e9e2', monogram: 'SVW' },
  freiburg: { name: 'SC Freiburg', short: 'Freiburg', color: '#d54b50', secondary: '#272c26', monogram: 'SCF' },
} satisfies Record<string, Team>
