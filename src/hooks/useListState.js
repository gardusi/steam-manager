import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

const matchesQuery = (item, queryTokens) => {
  const nameTokens = item.name.toLocaleLowerCase('en-US').split(/-| /)
  return nameTokens.some(nt => queryTokens.some(qt => nt.startsWith(qt)))
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

  const filterCounts = useMemo(() => Object.fromEntries(filters.map(f =>
    [f.key, items.filter(f.test).length]
  )), [items, filters])

  const visibleItems = useMemo(() => {
    const queryTokens = query.toLocaleLowerCase('en-US').split(/-| /)
    return items
      .filter(item => !filter || filter.test(item))
      .filter(item => !query || matchesQuery(item, queryTokens))
      .toSorted(sortOption.compare)
  }, [items, query, filter, sortOption])

  return {
    items: visibleItems,
    query,
    setQuery,
    sortOption,
    setSortOption,
    filter,
    filterCounts,
    setFilter,
    clearFilters
  }
}
