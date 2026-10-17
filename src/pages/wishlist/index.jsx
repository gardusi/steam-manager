import { useMemo } from 'react'
import styled from 'styled-components'
import FilterChips from '../../components/filterChips'
import ListContent from '../../components/listContent'
import ListToolbar from '../../components/listToolbar'
import StatTile, { StatGrid } from '../../components/statTile'
import WishlistCard from '../../components/wishlistCard'
import { summarizeWishlist } from '../../domain/wishlist'
import { Page, PageTitle, space } from '../../globalStyles'
import { availableOptions, useListState } from '../../hooks/useListState'
import { useWishlist } from '../../state/wishlist'
import { publicProfileHint } from '../../utils/errorMessages'
import { formatNumber, formatPrice } from '../../utils/format'
import { filters, sortOptions } from './listOptions'

const Tiles = styled(StatGrid)`
  margin-bottom: ${space(4)};
`

const Summary = ({ items, loading, hasPrices }) => {
  const summary = useMemo(() => summarizeWishlist(items), [items])
  return (
    <Tiles aria-busy={loading}>
      <StatTile loading={loading} label='Jogos na lista' value={formatNumber(summary.count)} />
      {(loading || hasPrices) && (
        <>
          <StatTile
            loading={loading}
            label='Em promoção'
            value={formatNumber(summary.onSale)}
            hint={summary.onSale > 0 ? `Até -${summary.biggestCut}%` : 'Nenhuma promoção agora'}
          />
          <StatTile loading={loading} label='No mínimo histórico' value={formatNumber(summary.atHistoricalLow)} hint='Menor preço já cobrado na Steam' />
          <StatTile
            loading={loading}
            label='Total da lista'
            value={formatPrice(summary.total)}
            hint={summary.savings > 0 ? `${formatPrice(summary.savings)} de desconto hoje` : 'Preço atual na Steam'}
          />
        </>
      )}
    </Tiles>
  )
}

const WishlistPage = () => {
  const wishlist = useWishlist()
  const hasPrices = wishlist.items.some(item => item.price != null)
  const options = useMemo(() => availableOptions(sortOptions, hasPrices), [hasPrices])
  const listFilters = useMemo(() => availableOptions(filters, hasPrices), [hasPrices])
  const list = useListState(wishlist.items, { sortOptions: options, filters: listFilters, filterParam: 'filtro' })
  const ready = !wishlist.isLoading && !wishlist.isError

  return (
    <Page>
      <title>Lista de desejos · Steam Manager</title>
      <PageTitle>Lista de desejos</PageTitle>
      {!wishlist.isError && <Summary items={wishlist.items} loading={wishlist.isLoading} hasPrices={hasPrices} />}
      <ListToolbar
        query={list.query}
        onQuery={list.setQuery}
        placeholder='Buscar na lista de desejos'
        resultCount={list.items.length}
        totalCount={wishlist.items.length}
        sortOptions={options}
        sortOption={list.sortOption}
        onSort={list.setSortOption}
      >
        {ready && (
          <FilterChips
            label='Filtrar lista de desejos'
            options={list.filterOptions}
            active={list.filter?.key ?? null}
            onChange={list.setFilter}
          />
        )}
      </ListToolbar>
      <ListContent
        resource={wishlist}
        errorTitle='Não foi possível carregar sua lista de desejos'
        loadingLabel='Carregando lista de desejos'
        emptyTitle='Sua lista de desejos está vazia'
        emptyDescription={`Se ela tem jogos, a lista pode estar privada. ${publicProfileHint}`}
        items={list.items}
        query={list.query}
        filter={list.filter}
        onClearFilters={list.clearFilters}
        renderItem={item => <WishlistCard key={item.appId} item={item} />}
      />
    </Page>
  )
}
export default WishlistPage
