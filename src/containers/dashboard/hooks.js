import { useEffect, useState } from 'react'

export const useOwnedGames = (props) => {
  const [games, setGames] = useState([])

  useEffect(() => {
    props.getOwnedGames()
  }, [])
  useEffect(() => {
    setGames(props.ownedGames)
  }, [props.ownedGames])

  const filterGames = (query) => {
    if (!query) setGames(props.ownedGames)
    else {
      const queryTokens = query.toLocaleLowerCase('en-US').split(/-| /)
      setGames(props.ownedGames.filter(game => {
        const nameTokens = game.name.toLocaleLowerCase('en-US').split(/-| /)
        return nameTokens.some(nt => queryTokens.some(qt => nt.startsWith(qt)))
      }))
    }
  }
  return [games, filterGames]
}
