import { isPlayed, playtimeBuckets } from '../../domain/playtime'
import { byName, nullsLast } from '../../utils/sort'

const playedFirst = (compare) => (a, b) => {
  if (isPlayed(a) !== isPlayed(b)) return isPlayed(a) ? -1 : 1
  return compare(a, b)
}

// `value` is stored in the `ordem` URL param; the first one is the default
export const sortOptions = [
  { value: 'nome', label: 'Nome', compare: byName },
  { value: 'mais-jogados', label: 'Mais jogados', compare: (a, b) => b.playtime - a.playtime },
  { value: 'menos-jogados', label: 'Menos jogados', compare: (a, b) => a.playtime - b.playtime },
  { value: 'recentes', label: 'Jogados recentemente', compare: nullsLast('lastPlayed', -1) },
  { value: 'esquecidos', label: 'Esquecidos', compare: playedFirst(nullsLast('lastPlayed', 1)) },
  { value: 'maior-preco', label: 'Maior preço', compare: nullsLast('price', -1), needsPrices: true },
  { value: 'menor-preco', label: 'Menor preço', compare: nullsLast('price', 1), needsPrices: true },
  { value: 'custo-por-hora', label: 'Menor custo por hora', compare: nullsLast('costPerHour', 1), needsPrices: true }
]

// Playtime ranges as list filters; `key` is stored in the `faixa` URL param
export const filters = playtimeBuckets.map(bucket => ({ ...bucket, test: (game) => bucket.test(game.playtime) }))
