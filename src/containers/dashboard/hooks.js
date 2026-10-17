import { useMemo } from 'react'
import { useListState } from '../../hooks/useListState'
import { isPlayed, playtimeBuckets } from '../../domain/playtime'
import { byName, nullsLast } from '../../utils/sort'

const playedOnly = (compare) => (a, b) => {
  if (isPlayed(a) !== isPlayed(b)) return isPlayed(a) ? -1 : 1
  return compare(a, b)
}

// `value` is stored in the `ordem` URL param
export const sortOptions = [
  { value: 'nome', label: 'Nome', compare: byName },
  { value: 'mais-jogados', label: 'Mais jogados', compare: (a, b) => b.playtime - a.playtime },
  { value: 'menos-jogados', label: 'Menos jogados', compare: (a, b) => a.playtime - b.playtime },
  { value: 'recentes', label: 'Jogados recentemente', compare: nullsLast('lastPlayed', -1) },
  { value: 'esquecidos', label: 'Esquecidos', compare: playedOnly(nullsLast('lastPlayed', 1)) },
  { value: 'maior-preco', label: 'Maior preço', compare: nullsLast('price', -1), needsPrices: true },
  { value: 'menor-preco', label: 'Menor preço', compare: nullsLast('price', 1), needsPrices: true },
  { value: 'custo-por-hora', label: 'Menor custo por hora', compare: nullsLast('costPerHour', 1), needsPrices: true }
]

const bucketFilters = playtimeBuckets.map(bucket => ({ ...bucket, test: (game) => bucket.test(game.playtime) }))

export const useGameList = (ownedGames) => {
  const hasPrices = useMemo(() => ownedGames.some(game => game.price > 0), [ownedGames])
  const availableSortOptions = useMemo(
    () => sortOptions.filter(option => hasPrices || !option.needsPrices),
    [hasPrices]
  )
  const list = useListState(ownedGames, {
    sortOptions: availableSortOptions,
    filters: bucketFilters,
    filterParam: 'faixa'
  })

  return {
    games: list.items,
    query: list.query,
    setQuery: list.setQuery,
    sortOptions: availableSortOptions,
    sortOption: list.sortOption,
    setSortOption: list.setSortOption,
    bucket: list.filter,
    bucketCounts: list.filterCounts,
    setBucket: list.setFilter,
    clearFilters: list.clearFilters
  }
}
