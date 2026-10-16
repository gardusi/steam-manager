import { useMemo, useState } from 'react'

export const useFilteredGames = (ownedGames) => {
  const [query, setQuery] = useState('')

  const games = useMemo(() => {
    if (!query) return ownedGames
    const queryTokens = query.toLocaleLowerCase('en-US').split(/-| /)
    return ownedGames.filter(game => {
      const nameTokens = game.name.toLocaleLowerCase('en-US').split(/-| /)
      return nameTokens.some(nt => queryTokens.some(qt => nt.startsWith(qt)))
    })
  }, [ownedGames, query])

  return [games, setQuery]
}
