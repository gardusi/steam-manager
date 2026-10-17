import styled from 'styled-components'
import StatusMessage from '../statusMessage'
import { Panel, SectionTitle, colors, skeleton, space } from '../../styles'
import { describeError } from '../../utils/errorMessages'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(4)};
`
const Placeholder = styled.div`
  height: ${({ $height }) => $height}px;
  border-radius: 2px;
  ${skeleton}
`
const Note = styled.p`
  font-size: 12px;
  color: ${colors.textMuted};
`

// A titled panel whose content loads on its own: skeleton → error with retry →
// a note when there's nothing to show → children(data)
const AsyncSection = ({ title, resource, skeletonHeight, errorTitle, isEmpty = (data) => data == null, emptyNote, children }) => {
  let body
  if (resource.isLoading) body = <Placeholder $height={skeletonHeight} aria-label={`Carregando ${title.toLowerCase()}`} />
  else if (resource.isError) {
    body = (
      <StatusMessage
        tone='error'
        title={errorTitle}
        description={describeError(resource.error)}
        actionLabel='Tentar novamente'
        onAction={resource.reload}
      />
    )
  } else if (isEmpty(resource.data)) body = <Note>{emptyNote}</Note>
  else body = children(resource.data)

  return (
    <Panel>
      <Body>
        <SectionTitle as='h2'>{title}</SectionTitle>
        {body}
      </Body>
    </Panel>
  )
}
export default AsyncSection
