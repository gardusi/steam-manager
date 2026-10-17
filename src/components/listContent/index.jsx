import styled from 'styled-components'
import { GameRowSkeleton } from '../gameRow'
import StatusMessage from '../statusMessage'
import { space } from '../../globalStyles'
import { describeError } from '../../utils/errorMessages'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(2)};
`

const noResultsTitle = (query, filter) => {
  const where = filter && ` em ${filter.label.toLowerCase()}`
  if (query) return `Nenhum jogo encontrado para “${query}”${where ?? ''}`
  return `Nenhum jogo${where}`
}

// The body of a filterable game list, in whichever state it's in:
// error (with retry) → loading skeleton → empty → no results for the filters → the list
const ListContent = ({
  resource,
  errorTitle,
  loadingLabel,
  emptyTitle,
  emptyDescription,
  items,
  query,
  filter,
  onClearFilters,
  renderItem
}) => {
  if (resource.isError) {
    return (
      <StatusMessage
        tone='error'
        title={errorTitle}
        description={describeError(resource.error)}
        actionLabel='Tentar novamente'
        onAction={resource.reload}
      />
    )
  }
  if (resource.isLoading) {
    return (
      <List aria-busy='true' aria-label={loadingLabel}>
        {Array.from({ length: 6 }, (_, i) => <GameRowSkeleton key={i} />)}
      </List>
    )
  }
  if (items.length === 0) {
    return query || filter
      ? (
          <StatusMessage
            title={noResultsTitle(query, filter)}
            description={query ? 'Confira a grafia ou tente outro termo.' : undefined}
            actionLabel='Limpar filtros'
            onAction={onClearFilters}
          />
        )
      : <StatusMessage title={emptyTitle} description={emptyDescription} />
  }
  return <List>{items.map(renderItem)}</List>
}
export default ListContent
