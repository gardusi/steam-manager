import { useMemo, useState } from 'react'
import styled from 'styled-components'
import FilterChips from '../filterChips'
import { Button, SteamColors, VisuallyHidden, radius, space } from '../../globalStyles'
import { formatNumber, formatPercent } from '../../utils/format'

const initialVisible = 12
// Steam calls achievements unlocked by fewer than 10% of players rare
const rareThreshold = 10

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
const percentFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${space(2)} ${space(6)};
`
const Progress = styled.div`
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
  gap: ${space(1.5)};
`
const ProgressLabel = styled.p`
  font-size: 13px;
  color: ${SteamColors.textMuted};

  strong {
    font-size: 16px;
    color: ${SteamColors.textBright};
  }
`
// Meter: the unfilled track is a lighter step of the fill's hue
const Track = styled.div`
  height: 8px;
  border-radius: 4px;
  background: rgba(61, 155, 233, 0.2);
  overflow: hidden;
`
const Fill = styled.div`
  height: 100%;
  border-radius: 4px;
  background: ${SteamColors.chart};
`
const Highlight = styled.p`
  font-size: 13px;
  color: ${SteamColors.textMuted};

  strong {
    color: ${SteamColors.textBright};
    font-weight: 600;
  }
`
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: ${space(2)};
`
const Item = styled.li`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: ${space(3)};
  align-items: center;
  padding: ${space(2)};
  border-radius: ${radius};
  background: ${({ $unlocked }) => $unlocked ? 'rgba(61, 155, 233, 0.08)' : 'rgba(0, 0, 0, 0.15)'};
`
const Icon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 2px;
  opacity: ${({ $unlocked }) => $unlocked ? 1 : 0.6};
`
const Text = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const Name = styled.p`
  font-size: 14px;
  color: ${({ $unlocked }) => $unlocked ? SteamColors.textBright : SteamColors.accent};
`
const Description = styled.p`
  font-size: 12px;
  color: ${SteamColors.textMuted};
  font-style: ${({ $hidden }) => $hidden ? 'italic' : 'normal'};
`
const Meta = styled.p`
  font-size: 11px;
  color: ${SteamColors.textMuted};
`
const RareTag = styled.span`
  margin-left: ${space(1.5)};
  padding: 0 ${space(1)};
  border-radius: 2px;
  font-weight: 600;
  color: ${SteamColors.primaryDark};
  background: #e4c368;
`
const ShowAll = styled(Button)`
  align-self: center;
`

const filters = [
  { key: null, label: 'Todas', test: () => true },
  { key: 'desbloqueadas', label: 'Desbloqueadas', test: (a) => a.unlocked },
  { key: 'bloqueadas', label: 'Bloqueadas', test: (a) => !a.unlocked }
]

// Unlocked: most recent first. Locked: most common first, i.e. the likeliest next ones.
const byProgress = (a, b) => {
  if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1
  if (a.unlocked) return (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0)
  return (b.percent ?? -1) - (a.percent ?? -1)
}

const AchievementItem = ({ achievement }) => {
  const secret = achievement.hidden && !achievement.unlocked
  const description = secret ? 'Conquista oculta' : achievement.description
  const rare = achievement.percent != null && achievement.percent < rareThreshold
  return (
    <Item $unlocked={achievement.unlocked}>
      <Icon
        src={achievement.unlocked ? achievement.icon : achievement.iconLocked}
        alt=''
        width={48}
        height={48}
        loading='lazy'
        $unlocked={achievement.unlocked}
      />
      <Text>
        <Name $unlocked={achievement.unlocked}>
          {achievement.name}
          <VisuallyHidden>{achievement.unlocked ? ' (desbloqueada)' : ' (bloqueada)'}</VisuallyHidden>
        </Name>
        {description && <Description $hidden={secret}>{description}</Description>}
        <Meta>
          {achievement.unlocked && achievement.unlockedAt && `Desbloqueada em ${dateFormat.format(achievement.unlockedAt)} · `}
          {achievement.percent != null
            ? `${percentFormat.format(achievement.percent)}% dos jogadores`
            : 'Raridade indisponível'}
          {rare && <RareTag>Rara</RareTag>}
        </Meta>
      </Text>
    </Item>
  )
}

const AchievementList = ({ achievements }) => {
  const [filterKey, setFilterKey] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const unlocked = achievements.filter(a => a.unlocked)
  const rarestUnlocked = unlocked
    .filter(a => a.percent != null)
    .reduce((rarest, a) => !rarest || a.percent < rarest.percent ? a : rarest, null)
  const filter = filters.find(f => f.key === filterKey)
  const visible = useMemo(
    () => achievements.filter(filter.test).toSorted(byProgress),
    [achievements, filter]
  )
  const shown = showAll ? visible : visible.slice(0, initialVisible)
  const share = unlocked.length / achievements.length

  return (
    <>
      <Summary>
        <Progress>
          <ProgressLabel>
            <strong>{formatNumber(unlocked.length)}</strong> de {formatNumber(achievements.length)} conquistas · {formatPercent(share)}
          </ProgressLabel>
          <Track
            role='meter'
            aria-label='Conquistas desbloqueadas'
            aria-valuemin={0}
            aria-valuemax={achievements.length}
            aria-valuenow={unlocked.length}
          >
            <Fill style={{ width: `${share * 100}%` }} />
          </Track>
        </Progress>
        {rarestUnlocked && (
          <Highlight>
            Mais rara que você tem: <strong>{rarestUnlocked.name}</strong> ({percentFormat.format(rarestUnlocked.percent)}% dos jogadores)
          </Highlight>
        )}
      </Summary>
      <FilterChips
        label='Filtrar conquistas'
        options={filters.map(f => ({ key: f.key, label: f.label, count: achievements.filter(f.test).length }))}
        active={filterKey}
        onChange={(key) => { setFilterKey(key); setShowAll(false) }}
      />
      <List>
        {shown.map(achievement => <AchievementItem key={achievement.id} achievement={achievement} />)}
      </List>
      {visible.length > shown.length && (
        <ShowAll type='button' onClick={() => setShowAll(true)}>
          Mostrar todas ({formatNumber(visible.length)})
        </ShowAll>
      )}
    </>
  )
}
export default AchievementList
