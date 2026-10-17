import { costPerHour, isPlayed, playtimeBuckets } from './playtime'
import { attachPrices } from './prices'

// Totals shown on the statistics page
export const buildMetadata = (games) => {
  const buckets = Object.fromEntries(playtimeBuckets.map(bucket =>
    [bucket.key, games.filter(game => bucket.test(game.playtime)).length]
  ))
  const neverPlayed = games.filter(game => !isPlayed(game)).length
  return {
    hoursPlayed: games.reduce((acc, game) => acc + game.playtime, 0),
    numberOfGames: games.length,
    buckets,
    timeNeverPlayed: neverPlayed,
    percentualPlayed: games.length ? 1 - neverPlayed / games.length : 0
  }
}

// Owned games with their current Steam price and cost per hour, plus totals.
// Account value is only known when ITAD returned prices.
export const buildLibrary = (games, prices) => {
  const priced = attachPrices(games, prices).map(game => ({ ...game, costPerHour: costPerHour(game) }))
  const metadata = buildMetadata(priced)
  if (prices.length > 0) {
    metadata.accountValue = priced.reduce((acc, game) => acc + (game.price ?? 0), 0)
    metadata.valuePerHour = metadata.hoursPlayed ? metadata.accountValue / metadata.hoursPlayed : 0
  }
  return { games: priced, metadata }
}
