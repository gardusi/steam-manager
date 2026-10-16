import styled from 'styled-components'
import { sortOptions, useGameList } from './hooks'
import GameCard, { GameCardSkeleton } from '../../components/gameCard'
import Search from '../../components/search'
import StatusMessage from '../../components/statusMessage'
import { Page, PageTitle, space } from '../../globalStyles'
import { fetchStatus } from '../../services'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(2)};
`

const DashboardView = ({ ownedGames, status, onRetry }) => {
  const { games, query, setQuery, sortOption, setSortOption } = useGameList(ownedGames)
  const isLoading = status === fetchStatus.idle || status === fetchStatus.fetching

  const renderContent = () => {
    if (status === fetchStatus.error) {
      return (
        <StatusMessage
          tone='error'
          title='Não foi possível carregar sua biblioteca'
          description='Verifique sua conexão e as chaves de API no .env.local.'
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
      return query
        ? (
            <StatusMessage
              title={`Nenhum jogo encontrado para “${query}”`}
              description='Confira a grafia ou tente outro termo.'
              actionLabel='Limpar busca'
              onAction={() => setQuery('')}
            />
          )
        : <StatusMessage title='Sua biblioteca está vazia' />
    }
    return (
      <List>
        {games.map(game => <GameCard game={game} key={game.appId} />)}
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
      />
      {renderContent()}
    </Page>
  )
}
export default DashboardView
