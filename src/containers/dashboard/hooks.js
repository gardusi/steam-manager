import { useMemo, useState } from 'react'

export const sortOptions = [
  { value: 'name', label: 'Nome', compare: (a, b) => a.name.localeCompare(b.name, 'pt-BR') },
  { value: 'playtimeDesc', label: 'Mais jogados', compare: (a, b) => b.playtime - a.playtime },
  { value: 'playtimeAsc', label: 'Menos jogados', compare: (a, b) => a.playtime - b.playtime },
  { value: 'priceDesc', label: 'Maior preço', compare: (a, b) => b.price - a.price },
  { value: 'priceAsc', label: 'Menor preço', compare: (a, b) => a.price - b.price }
]

export const useGameList = (ownedGames) => {
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState(sortOptions[0])

  const games = useMemo(() => {
    const queryTokens = query.toLocaleLowerCase('en-US').split(/-| /)
    const filtered = !query
      ? ownedGames
      : ownedGames.filter(game => {
        const nameTokens = game.name.toLocaleLowerCase('en-US').split(/-| /)
        return nameTokens.some(nt => queryTokens.some(qt => nt.startsWith(qt)))
      })
    return filtered.toSorted(sortOption.compare)
  }, [ownedGames, query, sortOption])

  return { games, setQuery, sortOption, setSortOption }
}
