import styled from 'styled-components'
import { useGameList } from './hooks'
import FilterChips from '../../components/filterChips'
import GameCard, { GameCardSkeleton } from '../../components/gameCard'
import Search from '../../components/search'
import StatusMessage from '../../components/statusMessage'
import { Page, PageTitle, space } from '../../globalStyles'
import { describeError } from '../../utils/errorMessages'
import { playtimeBuckets } from '../../domain/playtime'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(2)};
`

const emptyMessage = (query, bucket) => {
  if (query && bucket) return `Nenhum jogo encontrado para “${query}” em ${bucket.label.toLowerCase()}`
  if (query) return `Nenhum jogo encontrado para “${query}”`
  return `Nenhum jogo em ${bucket.label.toLowerCase()}`
}

const DashboardView = ({ ownedGames, isLoading, isError, error, onRetry }) => {
  const {
    games, query, setQuery, sortOptions, sortOption, setSortOption,
    bucket, bucketCounts, setBucket, clearFilters
  } = useGameList(ownedGames)

  const filterOptions = [
    { key: null, label: 'Todos', count: ownedGames.length },
    ...playtimeBuckets.map(b => ({ key: b.key, label: b.label, count: bucketCounts[b.key] }))
  ]

  const renderContent = () => {
    if (isError) {
      return (
        <StatusMessage
          tone='error'
          title='Não foi possível carregar sua biblioteca'
          description={describeError(error)}
          actionLabel='Tentar novamente'
          onAction={onRetry}
        />
      )
    }
    if (isLoading) {
      return (
        <List aria-busy='true' aria-label='Carregando jogos'>
          {Array.from({ length: 6 }, (_, i) => <GameCardSkeleton key={i} />)}
        </List>
      )
    }
    if (games.length === 0) {
      return query || bucket
        ? (
            <StatusMessage
              title={emptyMessage(query, bucket)}
              description={query ? 'Confira a grafia ou tente outro termo.' : undefined}
              actionLabel='Limpar filtros'
              onAction={clearFilters}
            />
          )
        : <StatusMessage title='Sua biblioteca está vazia' />
    }
    return (
      <List>
        {games.map(game => (
          <GameCard game={game} key={game.appId} showCostPerHour={sortOption.value === 'custo-por-hora'} />
        ))}
      </List>
    )
  }

  return (
    <Page>
      <title>Meus jogos · Steam Manager</title>
      <PageTitle>Meus jogos</PageTitle>
      <Search
        query={query}
        onQuery={setQuery}
        resultCount={games.length}
        totalCount={ownedGames.length}
        sortOptions={sortOptions}
        sortOption={sortOption}
        onSort={setSortOption}
      >
        {!isLoading && !isError && (
          <FilterChips
            label='Filtrar por tempo de jogo'
            options={filterOptions}
            active={bucket?.key ?? null}
            onChange={setBucket}
          />
        )}
      </Search>
      {renderContent()}
    </Page>
  )
}
export default DashboardView
