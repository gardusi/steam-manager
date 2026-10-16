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
