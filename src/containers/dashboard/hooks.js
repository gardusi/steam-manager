import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { findBucket, neverPlayedThreshold, playtimeBuckets } from '../../utils/playtime'

// Sorts by a nullable field, always keeping missing values at the end
const nullsLast = (field, direction) => (a, b) => {
  if (a[field] == null) return b[field] == null ? 0 : 1
  if (b[field] == null) return -1
  return direction * (a[field] - b[field])
}
const playedOnly = (compare) => (a, b) => {
  const aPlayed = a.playtime >= neverPlayedThreshold
  const bPlayed = b.playtime >= neverPlayedThreshold
  if (aPlayed !== bPlayed) return aPlayed ? -1 : 1
  return compare(a, b)
}

// `value` is stored in the `ordem` URL param
export const sortOptions = [
  { value: 'nome', label: 'Nome', compare: (a, b) => a.name.localeCompare(b.name, 'pt-BR') },
  { value: 'mais-jogados', label: 'Mais jogados', compare: (a, b) => b.playtime - a.playtime },
  { value: 'menos-jogados', label: 'Menos jogados', compare: (a, b) => a.playtime - b.playtime },
  { value: 'recentes', label: 'Jogados recentemente', compare: nullsLast('lastPlayed', -1) },
  { value: 'esquecidos', label: 'Esquecidos', compare: playedOnly(nullsLast('lastPlayed', 1)) },
  { value: 'maior-preco', label: 'Maior preço', compare: (a, b) => b.price - a.price, needsPrices: true },
  { value: 'menor-preco', label: 'Menor preço', compare: (a, b) => a.price - b.price, needsPrices: true },
  { value: 'custo-por-hora', label: 'Menor custo por hora', compare: nullsLast('costPerHour', 1), needsPrices: true }
]

const matchesQuery = (game, queryTokens) => {
  const nameTokens = game.name.toLocaleLowerCase('en-US').split(/-| /)
  return nameTokens.some(nt => queryTokens.some(qt => nt.startsWith(qt)))
}

export const useGameList = (ownedGames) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const bucket = findBucket(searchParams.get('faixa'))

  const hasPrices = useMemo(() => ownedGames.some(game => game.price > 0), [ownedGames])
  const availableSortOptions = useMemo(
    () => sortOptions.filter(option => hasPrices || !option.needsPrices),
    [hasPrices]
  )
  const sortOption = availableSortOptions.find(option => option.value === searchParams.get('ordem')) ?? availableSortOptions[0]

  // Typing replaces the history entry so Back doesn't step through every keystroke
  const updateParam = useCallback((key, value, defaultValue = '') => {
    setSearchParams(params => {
      const next = new URLSearchParams(params)
      if (!value || value === defaultValue) next.delete(key)
      else next.set(key, value)
      return next
    }, { replace: key === 'q' })
  }, [setSearchParams])

  const setQuery = useCallback((value) => updateParam('q', value), [updateParam])
  const setSortOption = useCallback((option) => updateParam('ordem', option.value, sortOptions[0].value), [updateParam])
  const setBucket = useCallback((key) => updateParam('faixa', key), [updateParam])
  const clearFilters = useCallback(() => setSearchParams(params => {
    const next = new URLSearchParams(params)
    next.delete('q')
    next.delete('faixa')
    return next
  }), [setSearchParams])

  const bucketCounts = useMemo(() => Object.fromEntries(playtimeBuckets.map(b =>
    [b.key, ownedGames.filter(game => b.test(game.playtime)).length]
  )), [ownedGames])

  const games = useMemo(() => {
    const queryTokens = query.toLocaleLowerCase('en-US').split(/-| /)
    return ownedGames
      .filter(game => !bucket || bucket.test(game.playtime))
      .filter(game => !query || matchesQuery(game, queryTokens))
      .toSorted(sortOption.compare)
  }, [ownedGames, query, bucket, sortOption])

  return {
    games,
    query,
    setQuery,
    sortOptions: availableSortOptions,
    sortOption,
    setSortOption,
    bucket,
    bucketCounts,
    setBucket,
    clearFilters
  }
}
