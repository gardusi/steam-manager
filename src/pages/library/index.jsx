import { useMemo } from 'react'
import FilterChips from '../../components/filterChips'
import GameCard from '../../components/gameCard'
import ListContent from '../../components/listContent'
import ListToolbar from '../../components/listToolbar'
import { Page, PageTitle } from '../../styles'
import { availableOptions, useListState } from '../../hooks/useListState'
import { useLibrary } from '../../state/library'
import { filters, sortOptions } from './listOptions'

const LibraryPage = () => {
  const library = useLibrary()
  const hasPrices = library.games.some(game => game.price > 0)
  const options = useMemo(() => availableOptions(sortOptions, hasPrices), [hasPrices])
  const list = useListState(library.games, { sortOptions: options, filters, filterParam: 'faixa' })
  const ready = !library.isLoading && !library.isError

  return (
    <Page>
      <title>Meus jogos · Steam Manager</title>
      <PageTitle>Meus jogos</PageTitle>
      <ListToolbar
        query={list.query}
        onQuery={list.setQuery}
        placeholder='Buscar na biblioteca'
        resultCount={list.items.length}
        totalCount={library.games.length}
        sortOptions={options}
        sortOption={list.sortOption}
        onSort={list.setSortOption}
      >
        {ready && (
          <FilterChips
            label='Filtrar por tempo de jogo'
            options={list.filterOptions}
            active={list.filter?.key ?? null}
            onChange={list.setFilter}
          />
        )}
      </ListToolbar>
      <ListContent
        resource={library}
        errorTitle='Não foi possível carregar sua biblioteca'
        loadingLabel='Carregando jogos'
        emptyTitle='Sua biblioteca está vazia'
        items={list.items}
        query={list.query}
        filter={list.filter}
        onClearFilters={list.clearFilters}
        renderItem={game => (
          <GameCard key={game.appId} game={game} showCostPerHour={list.sortOption.value === 'custo-por-hora'} />
        )}
      />
    </Page>
  )
}
export default LibraryPage
