import { describe, expect, it } from 'vitest'
import { byName, nullsLast } from './sort'

const items = [{ v: 3 }, { v: null }, { v: 1 }, { v: undefined }, { v: 2 }]

describe('nullsLast', () => {
  it('sorts ascending with missing values at the end', () => {
    expect(items.toSorted(nullsLast('v', 1)).map(i => i.v)).toEqual([1, 2, 3, null, undefined])
  })
  it('sorts descending with missing values still at the end', () => {
    expect(items.toSorted(nullsLast('v', -1)).map(i => i.v).slice(0, 3)).toEqual([3, 2, 1])
    expect(items.toSorted(nullsLast('v', -1)).slice(3).every(i => i.v == null)).toBe(true)
  })
})

describe('byName', () => {
  it('sorts names the Portuguese way (accents next to their letter)', () => {
    const names = ['Órbita', 'Zelda', 'abc', 'Ark'].map(name => ({ name }))
    expect(names.toSorted(byName).map(n => n.name)).toEqual(['abc', 'Ark', 'Órbita', 'Zelda'])
  })
})
