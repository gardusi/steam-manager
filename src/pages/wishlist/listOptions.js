import { byName, nullsLast } from '../../utils/sort'

// `value` is stored in the `ordem` URL param; the first one is the default
export const sortOptions = [
  { value: 'maior-desconto', label: 'Maior desconto', compare: (a, b) => (b.cut - a.cut) || byName(a, b), needsPrices: true },
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
