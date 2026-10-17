import { useMemo } from 'react'
import { useListState } from '../../hooks/useListState'
import { byName, nullsLast } from '../../utils/sort'

// `value` is stored in the `ordem` URL param
export const sortOptions = [
  {
    value: 'maior-desconto',
    label: 'Maior desconto',
    compare: (a, b) => (b.cut - a.cut) || byName(a, b),
    needsPrices: true
  },
  { value: 'menor-preco', label: 'Menor preço', compare: nullsLast('price', 1), needsPrices: true },
  { value: 'maior-preco', label: 'Maior preço', compare: nullsLast('price', -1), needsPrices: true },
  { value: 'adicionados', label: 'Adicionados recentemente', compare: (a, b) => b.addedAt - a.addedAt },
  { value: 'nome', label: 'Nome', compare: byName }
]

// `key` is stored in the `filtro` URL param
export const filters = [
  { key: 'em-promocao', label: 'Em promoção', test: (item) => item.cut > 0, needsPrices: true },
  { key: 'minimo-historico', label: 'No mínimo histórico', test: (item) => item.atHistoricalLow, needsPrices: true },
  { key: 'ate-20', label: 'Até R$ 20', test: (item) => item.price != null && item.price <= 20, needsPrices: true },
  { key: 'em-breve', label: 'Em breve', test: (item) => item.comingSoon }
]

export const useWishlistView = (items) => {
  const hasPrices = useMemo(() => items.some(item => item.price != null), [items])
  const availableSortOptions = useMemo(() => sortOptions.filter(o => hasPrices || !o.needsPrices), [hasPrices])
  const availableFilters = useMemo(() => filters.filter(f => hasPrices || !f.needsPrices), [hasPrices])
  const list = useListState(items, {
    sortOptions: availableSortOptions,
    filters: availableFilters,
    filterParam: 'filtro'
  })

  const summary = useMemo(() => {
    const priced = items.filter(item => item.price != null)
    const onSale = items.filter(item => item.cut > 0)
    return {
      count: items.length,
      onSale: onSale.length,
      biggestCut: Math.max(0, ...onSale.map(item => item.cut)),
      atHistoricalLow: items.filter(item => item.atHistoricalLow).length,
      total: priced.reduce((acc, item) => acc + item.price, 0),
      savings: onSale.reduce((acc, item) => acc + (item.regular - item.price), 0)
    }
  }, [items])

  return { ...list, hasPrices, sortOptions: availableSortOptions, filters: availableFilters, summary }
}
