const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const integer = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })
const decimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const percent = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 })

export const formatPrice = (value) => currency.format(value)
export const formatNumber = (value) => integer.format(value)
export const formatPercent = (value) => percent.format(value)

// 0.4 -> "24 min", 17.8 -> "17,8 h", 653.1 -> "653 h"
export const formatHours = (hours) => {
  if (hours < 1) return `${Math.round(hours * 60)} min`
  if (hours < 100) return `${decimal.format(hours)} h`
  return `${integer.format(hours)} h`
}

export const pluralize = (count, singular, plural) => `${formatNumber(count)} ${count === 1 ? singular : plural}`

const shortDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
const longDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
const monthYear = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: '2-digit' })

// "25/11/2020"
export const formatDate = (timestamp) => shortDate.format(timestamp)
// "16 de novembro de 2004"
export const formatLongDate = (timestamp) => longDate.format(timestamp)
// "jan. de 26", for chart axes
export const formatMonthYear = (timestamp) => monthYear.format(timestamp)

// 'auto' gives "ontem"/"hoje"; months and years read better as "há 1 mês" than "mês passado"
const relative = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
const relativeNumeric = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'always' })
const day = 24 * 60 * 60 * 1000

// 1710620914000 -> "há 2 anos", "há 1 mês", "ontem", "hoje"
export const formatRelativeDate = (timestamp, now = Date.now()) => {
  const days = Math.round((timestamp - now) / day)
  if (days === 0) return 'hoje'
  if (Math.abs(days) < 30) return relative.format(days, 'day')
  if (Math.abs(days) < 365) return relativeNumeric.format(Math.round(days / 30), 'month')
  return relativeNumeric.format(Math.round(days / 365), 'year')
}

// For "updated X ago" labels: "agora", "há 5 minutos", "há 2 horas", then days
export const formatRelativeTime = (timestamp, now = Date.now()) => {
  const minutes = Math.round((timestamp - now) / 60000)
  if (minutes === 0) return 'agora'
  if (Math.abs(minutes) < 60) return relative.format(minutes, 'minute')
  if (Math.abs(minutes) < 24 * 60) return relative.format(Math.round(minutes / 60), 'hour')
  return formatRelativeDate(timestamp, now)
}
