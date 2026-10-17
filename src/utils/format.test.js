import { describe, expect, it } from 'vitest'
import {
  formatHours, formatNumber, formatPercent, formatPrice, formatRelativeDate, formatRelativeTime, pluralize
} from './format'

// Intl puts a non-breaking space between "R$" and the number
const plain = (text) => text.replace(/\u00a0/g, ' ')
const day = 24 * 60 * 60 * 1000
const now = new Date(2026, 9, 17, 12, 0).getTime()

describe('formatPrice', () => {
  it('formats BRL with comma decimals and dot thousands', () => {
    expect(plain(formatPrice(13980.09))).toBe('R$ 13.980,09')
    expect(plain(formatPrice(0))).toBe('R$ 0,00')
  })
})

describe('formatNumber / formatPercent', () => {
  it('uses pt-BR separators and rounds', () => {
    expect(formatNumber(5901.4)).toBe('5.901')
    expect(formatPercent(0.974)).toBe('97%')
  })
})

describe('formatHours', () => {
  it('shows minutes below one hour', () => {
    expect(formatHours(0.4)).toBe('24 min')
    expect(formatHours(0)).toBe('0 min')
  })
  it('shows one decimal below 100 hours', () => {
    expect(formatHours(17.84)).toBe('17,8 h')
    expect(formatHours(1)).toBe('1,0 h')
  })
  it('drops decimals from 100 hours up', () => {
    expect(formatHours(653.1)).toBe('653 h')
    expect(formatHours(5901)).toBe('5.901 h')
  })
})

describe('pluralize', () => {
  it('picks the form by count', () => {
    expect(pluralize(1, 'jogo', 'jogos')).toBe('1 jogo')
    expect(pluralize(0, 'jogo', 'jogos')).toBe('0 jogos')
    expect(pluralize(1200, 'jogo', 'jogos')).toBe('1.200 jogos')
  })
})

describe('formatRelativeDate', () => {
  it('uses words for today and yesterday', () => {
    expect(formatRelativeDate(now, now)).toBe('hoje')
    expect(formatRelativeDate(now - day, now)).toBe('ontem')
  })
  it('counts days under a month', () => {
    expect(formatRelativeDate(now - 5 * day, now)).toBe('há 5 dias')
  })
  it('uses numbers for months and years ("há 1 mês", not "mês passado")', () => {
    expect(formatRelativeDate(now - 40 * day, now)).toBe('há 1 mês')
    expect(formatRelativeDate(now - 200 * day, now)).toBe('há 7 meses')
    expect(formatRelativeDate(now - 400 * day, now)).toBe('há 1 ano')
    expect(formatRelativeDate(now - 900 * day, now)).toBe('há 2 anos')
  })
})

describe('formatRelativeTime', () => {
  it('goes from "agora" to minutes, hours and then days', () => {
    expect(formatRelativeTime(now, now)).toBe('agora')
    expect(formatRelativeTime(now - 5 * 60000, now)).toBe('há 5 minutos')
    expect(formatRelativeTime(now - 3 * 3600000, now)).toBe('há 3 horas')
    expect(formatRelativeTime(now - 2 * day, now)).toBe('anteontem')
  })
})
