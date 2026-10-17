import { describe, expect, it } from 'vitest'
import { applyListState } from './useListState'
import { byName } from '../utils/sort'

const games = [
  { name: 'Half-Life 2', playtime: 5 },
  { name: 'Half-Life', playtime: 17 },
  { name: 'Counter-Strike 2', playtime: 653 },
  { name: 'The Elder Scrolls V: Skyrim', playtime: 379 }
]
const byNameOption = { compare: byName }
const names = (list) => list.map(game => game.name)

describe('applyListState', () => {
  it('returns everything sorted when there is no query or filter', () => {
    expect(names(applyListState(games, { query: '', sortOption: byNameOption }))).toEqual([
      'Counter-Strike 2', 'Half-Life', 'Half-Life 2', 'The Elder Scrolls V: Skyrim'
    ])
  })

  it('matches the start of any word, ignoring case and hyphens', () => {
    expect(names(applyListState(games, { query: 'life', sortOption: byNameOption }))).toEqual(['Half-Life', 'Half-Life 2'])
    expect(names(applyListState(games, { query: 'SKY', sortOption: byNameOption }))).toEqual(['The Elder Scrolls V: Skyrim'])
  })

  it('does not match the middle of a word', () => {
    expect(applyListState(games, { query: 'alf', sortOption: byNameOption })).toEqual([])
  })

  it('combines filter, query and sort', () => {
    const filter = { test: (game) => game.playtime >= 10 }
    const mostPlayed = { compare: (a, b) => b.playtime - a.playtime }
    expect(names(applyListState(games, { query: '', filter, sortOption: mostPlayed }))).toEqual([
      'Counter-Strike 2', 'The Elder Scrolls V: Skyrim', 'Half-Life'
    ])
  })

  it('does not mutate the input', () => {
    const copy = [...games]
    applyListState(games, { query: '', sortOption: byNameOption })
    expect(games).toEqual(copy)
  })
})
