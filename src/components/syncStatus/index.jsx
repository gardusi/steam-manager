import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { SteamColors, reducedMotion, space } from '../../globalStyles'
import { formatRelativeTime } from '../../utils/format'

const spin = keyframes`
  to { transform: rotate(360deg); }
`
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${space(2)};
  margin-left: auto;
`
const Text = styled.span`
  font-size: 12px;
  color: ${({ $error }) => $error ? SteamColors.danger : SteamColors.textMuted};

  @media (max-width: 560px) {
    display: none;
  }
`
const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
  color: ${SteamColors.accent};
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;

  &:hover:not(:disabled) {
    background: ${SteamColors.surfaceHover};
    color: ${SteamColors.textBright};
  }
  &:disabled {
    cursor: default;
  }
  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    ${({ $spinning }) => $spinning && css`animation: ${spin} 1s linear infinite;`}
    ${reducedMotion('animation: none;')}
  }
`

// Re-renders every 30s so "há X minutos" stays current
const useNow = () => {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])
  return now
}

const SyncStatus = ({ updatedAt, refreshing, failed, onRefresh }) => {
  const now = useNow()
  if (!updatedAt && !refreshing) return null

  let text = `Atualizado ${formatRelativeTime(updatedAt, now)}`
  if (refreshing) text = 'Atualizando…'
  else if (failed) text = 'Falha ao atualizar. Mostrando dados salvos'

  return (
    <Container>
      <Text $error={failed && !refreshing} role='status'>{text}</Text>
      <RefreshButton
        type='button'
        onClick={onRefresh}
        disabled={refreshing}
        $spinning={refreshing}
        aria-label='Atualizar dados'
        title='Atualizar dados'
      >
        <svg viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' />
        </svg>
      </RefreshButton>
    </Container>
  )
}
export default SyncStatus
