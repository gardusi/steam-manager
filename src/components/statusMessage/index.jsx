import styled from 'styled-components'
import { Button, colors, space } from '../../styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space(3)};
  padding: ${space(12)} ${space(4)};
  text-align: center;
`
const Title = styled.p`
  font-size: 18px;
  color: ${({ $tone }) => $tone === 'error' ? colors.danger : colors.textStrong};
`
const Description = styled.p`
  color: ${colors.textMuted};
  max-width: 420px;
`

// Centered message for empty and error states, with an optional action
const StatusMessage = ({ title, description, actionLabel, onAction, tone }) => (
  <Container role={tone === 'error' ? 'alert' : 'status'}>
    <Title $tone={tone}>{title}</Title>
    {description && <Description>{description}</Description>}
    {actionLabel && <Button type='button' onClick={onAction}>{actionLabel}</Button>}
  </Container>
)
export default StatusMessage
