import styled from 'styled-components'
import { useWishlistView } from './hooks'
import FilterChips from '../../components/filterChips'
import { GameRowSkeleton } from '../../components/gameRow'
import Search from '../../components/search'
import StatTile, { StatGrid } from '../../components/statTile'
import StatusMessage from '../../components/statusMessage'
import WishlistCard from '../../components/wishlistCard'
import { Page, PageTitle, space } from '../../globalStyles'
import { describeError, publicProfileHint } from '../../utils/errorMessages'
import { formatNumber, formatPrice } from '../../utils/format'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(2)};
`
const Summary = styled(StatGrid)`
  margin-bottom: ${space(4)};
`

const emptyMessage = (query, filter) => {
  if (query && filter) return `Nenhum jogo encontrado para “${query}” em ${filter.label.toLowerCase()}`
  if (query) return `Nenhum jogo encontrado para “${query}”`
  return `Nenhum jogo em ${filter.label.toLowerCase()}`
}

const WishlistView = ({ items, isLoading, isError, error, onRetry }) => {
  const {
    items: visibleItems, query, setQuery, sortOptions, sortOption, setSortOption,
    filters, filter, filterCounts, setFilter, clearFilters, hasPrices, summary
  } = useWishlistView(items)
  const isReady = !isLoading && !isError

  const filterOptions = [
    { key: null, label: 'Todos', count: items.length },
    ...filters.map(f => ({ key: f.key, label: f.label, count: filterCounts[f.key] }))
  ]

  const renderContent = () => {
    if (isError) {
      return (
        <StatusMessage
          tone='error'
          title='Não foi possível carregar sua lista de desejos'
          description={describeError(error)}
          actionLabel='Tentar novamente'
          onAction={onRetry}
        />
      )
    }
    if (isLoading) {
      return (
        <List aria-busy='true' aria-label='Carregando lista de desejos'>
          {Array.from({ length: 6 }, (_, i) => <GameRowSkeleton key={i} />)}
        </List>
      )
    }
    if (visibleItems.length === 0) {
      return query || filter
        ? (
            <StatusMessage
              title={emptyMessage(query, filter)}
              description={query ? 'Confira a grafia ou tente outro termo.' : undefined}
              actionLabel='Limpar filtros'
              onAction={clearFilters}
            />
          )
        : (
            <StatusMessage
              title='Sua lista de desejos está vazia'
              description={`Se ela tem jogos, a lista pode estar privada. ${publicProfileHint}`}
            />
          )
    }
    return (
      <List>
        {visibleItems.map(item => <WishlistCard item={item} key={item.appId} />)}
      </List>
    )
  }

  return (
    <Page>
      <title>Lista de desejos · Steam Manager</title>
      <PageTitle>Lista de desejos</PageTitle>
      {!isError && (
        <Summary aria-busy={isLoading}>
          <StatTile loading={isLoading} label='Jogos na lista' value={formatNumber(summary.count)} />
          {(isLoading || hasPrices) && (
            <>
              <StatTile
                loading={isLoading}
                label='Em promoção'
                value={formatNumber(summary.onSale)}
                hint={summary.onSale > 0 ? `Até -${summary.biggestCut}%` : 'Nenhuma promoção agora'}
              />
              <StatTile
                loading={isLoading}
                label='No mínimo histórico'
                value={formatNumber(summary.atHistoricalLow)}
                hint='Menor preço já cobrado na Steam'
              />
              <StatTile
                loading={isLoading}
                label='Total da lista'
                value={formatPrice(summary.total)}
                hint={summary.savings > 0 ? `${formatPrice(summary.savings)} de desconto hoje` : 'Preço atual na Steam'}
              />
            </>
          )}
        </Summary>
      )}
      <Search
        query={query}
        onQuery={setQuery}
        resultCount={visibleItems.length}
        totalCount={items.length}
        sortOptions={sortOptions}
        sortOption={sortOption}
        onSort={setSortOption}
        placeholder='Buscar na lista de desejos'
      >
        {isReady && (
          <FilterChips label='Filtrar lista de desejos' options={filterOptions} active={filter?.key ?? null} onChange={setFilter} />
        )}
      </Search>
      {renderContent()}
    </Page>
  )
}
export default WishlistView
