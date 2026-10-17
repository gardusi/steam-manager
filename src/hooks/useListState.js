import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

const tokenize = (text) => text.toLocaleLowerCase('en-US').split(/-| /)

// Matches when any word of the name starts with any word of the query
const matchesQuery = (item, queryTokens) =>
  tokenize(item.name).some(nt => queryTokens.some(qt => nt.startsWith(qt)))

// Filters by `filter` and `query`, then sorts with `sortOption.compare`
export const applyListState = (items, { query, filter, sortOption }) => {
  const queryTokens = tokenize(query)
  return items
    .filter(item => !filter || filter.test(item))
    .filter(item => !query || matchesQuery(item, queryTokens))
    .toSorted(sortOption.compare)
}

// Search, single-choice filter and sort for a list of named items, kept in the URL
// as `q`, `filterParam` and `ordem` so reloads and shared links restore them.
// - sortOptions: [{ value, label, compare }], the first one is the default
// - filters: [{ key, label, test(item) }]
export const useListState = (items, { sortOptions, filters, filterParam }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const filter = filters.find(f => f.key === searchParams.get(filterParam))
  const sortOption = sortOptions.find(option => option.value === searchParams.get('ordem')) ?? sortOptions[0]

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
  const setSortOption = useCallback((option) => updateParam('ordem', option.value, sortOptions[0].value), [updateParam, sortOptions])
  const setFilter = useCallback((key) => updateParam(filterParam, key), [updateParam, filterParam])
  const clearFilters = useCallback(() => setSearchParams(params => {
    const next = new URLSearchParams(params)
    next.delete('q')
    next.delete(filterParam)
    return next
  }), [setSearchParams, filterParam])

  // Ready for <FilterChips>: "Todos" plus each filter, with how many items it matches
  const filterOptions = useMemo(() => [
    { key: null, label: 'Todos', count: items.length },
    ...filters.map(f => ({ key: f.key, label: f.label, count: items.filter(f.test).length }))
  ], [items, filters])

  const visibleItems = useMemo(
    () => applyListState(items, { query, filter, sortOption }),
    [items, query, filter, sortOption]
  )

  return {
    items: visibleItems,
    query,
    setQuery,
    sortOption,
    setSortOption,
    filter,
    filterOptions,
    setFilter,
    clearFilters
  }
}

// Options marked `needsPrices` only make sense when prices were loaded
export const availableOptions = (options, hasPrices) => options.filter(option => hasPrices || !option.needsPrices)
