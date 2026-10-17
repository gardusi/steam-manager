import { afterEach, describe, expect, it, vi } from 'vitest'
import request from './http'
import { fetchAchievements, fetchOwnedGames } from './steam'

// Responses as observed from the real APIs
const respond = (status, body) => Promise.resolve(new Response(JSON.stringify(body), { status }))
const failWith = (error) => vi.stubGlobal('fetch', vi.fn(() => Promise.reject(error)))
const answer = (...responses) => {
  const fetch = vi.fn()
  responses.forEach(([status, body]) => fetch.mockImplementationOnce(() => respond(status, body)))
  vi.stubGlobal('fetch', fetch)
}

afterEach(() => vi.unstubAllGlobals())

describe('request errors', () => {
  it('reports the local server being down as a network error', async () => {
    failWith(new TypeError('Failed to fetch'))
    await expect(request({ url: '/api/steam/x' })).rejects.toMatchObject({ code: 'network', service: 'steam' })
  })

  it('reports a rejected Steam key (401) as unauthorized', async () => {
    answer([401, {}])
    await expect(request({ url: '/api/steam/x' })).rejects.toMatchObject({ code: 'unauthorized', service: 'steam', status: 401 })
  })

  it('reports a rejected ITAD key (403) as unauthorized for ITAD', async () => {
    answer([403, { status_code: 403, reason_phrase: 'Invalid or expired api key' }])
    await expect(request({ url: '/api/itad/games/prices/v3' })).rejects.toMatchObject({ code: 'unauthorized', service: 'itad' })
  })

  it('reports 5xx as unavailable', async () => {
    answer([502, {}])
    await expect(request({ url: '/api/itad/x' })).rejects.toMatchObject({ code: 'unavailable' })
  })
})

describe('fetchOwnedGames', () => {
  it('detects a profile that hides its games (empty response, no game_count)', async () => {
    answer([200, { response: {} }])
    await expect(fetchOwnedGames()).rejects.toMatchObject({ code: 'private-profile' })
  })

  it('accepts a public library with no games', async () => {
    answer([200, { response: { game_count: 0 } }])
    await expect(fetchOwnedGames()).resolves.toEqual([])
  })
})

describe('fetchAchievements', () => {
  it('turns Steam\'s 403 "Profile is not public" into a private-profile error', async () => {
    answer(
      [200, { game: { availableGameStats: { achievements: [{ name: 'A', displayName: 'A' }] } } }],
      [403, { playerstats: { error: 'Profile is not public', success: false } }],
      [200, { achievementpercentages: { achievements: [] } }]
    )
    await expect(fetchAchievements(990080)).rejects.toMatchObject({ code: 'private-profile' })
  })
})
