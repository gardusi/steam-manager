import { describe, expect, it } from 'vitest'
import { ApiError } from '../services/errors'
import { describeError } from './errorMessages'

describe('describeError', () => {
  it('points to the right key for each service', () => {
    expect(describeError(new ApiError('unauthorized', { service: 'steam' }))).toContain('STEAM_API_KEY')
    expect(describeError(new ApiError('unauthorized', { service: 'itad' }))).toContain('ITAD_API_KEY')
  })
  it('explains how to make the profile public', () => {
    expect(describeError(new ApiError('private-profile', { service: 'steam' }))).toContain('Detalhes dos jogos')
  })
  it('tells the user to start the app when the local server is down', () => {
    expect(describeError(new ApiError('network'))).toContain('yarn start')
  })
  it('falls back to a generic message for unknown errors', () => {
    expect(describeError(new Error('boom'))).toContain('.env.local')
    expect(describeError(undefined)).toContain('.env.local')
  })
})
