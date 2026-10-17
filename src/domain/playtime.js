// Below this many hours a game counts as never played
export const neverPlayedThreshold = 0.01

export const isPlayed = (game) => game.playtime >= neverPlayedThreshold

// Playtime ranges shared by the statistics chart and the library filter.
// `key` is also the value of the `faixa` URL param.
export const playtimeBuckets = [
  { key: '100h-ou-mais', label: '100 h ou mais', test: (hours) => hours >= 100 },
  { key: '10-a-100h', label: '10 a 100 h', test: (hours) => hours >= 10 && hours < 100 },
  { key: '1-a-10h', label: '1 a 10 h', test: (hours) => hours >= 1 && hours < 10 },
  { key: 'menos-de-1h', label: 'Menos de 1 h', test: (hours) => hours >= neverPlayedThreshold && hours < 1 },
  { key: 'nunca-jogados', label: 'Nunca jogados', test: (hours) => hours < neverPlayedThreshold }
]

// Cost per hour only means something once a game has been played for a while
export const minHoursForCostPerHour = 1

export const costPerHour = ({ price, playtime }) =>
  price > 0 && playtime >= minHoursForCostPerHour ? price / playtime : null
