import { useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
import BarList from '../../components/barList'
import StatTile, { StatGrid } from '../../components/statTile'
import StatusMessage from '../../components/statusMessage'
import { Page, PageTitle, Panel, SectionTitle, SteamColors, space } from '../../globalStyles'
import { formatHours, formatNumber, formatPercent, formatPrice, pluralize } from '../../utils/format'
import { describeError } from '../../utils/errorMessages'
import { minHoursForCostPerHour, playtimeBuckets } from '../../domain/playtime'

const Panels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr));
  gap: ${space(3)};
  margin-top: ${space(3)};
`
const Attribution = styled.p`
  margin-top: ${space(6)};
  font-size: 12px;
  color: ${SteamColors.textMuted};

  a {
    color: ${SteamColors.secondary};
  }
`
const PanelHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${space(3)};

  a {
    font-size: 12px;
    color: ${SteamColors.secondary};
    white-space: nowrap;
  }
`
const PanelHint = styled.p`
  margin: -${space(2)} 0 ${space(3)};
  font-size: 12px;
  color: ${SteamColors.textMuted};
`

const costItems = (games) => games.map(game => ({
  key: game.appId,
  label: game.name,
  value: game.costPerHour,
  valueLabel: `${formatPrice(game.costPerHour)}/h`,
  tooltip: `${formatPrice(game.price)} por ${formatHours(game.playtime)}`,
  href: `/game/${game.appId}`
}))

const StatisticsView = ({ games, metadata, isLoading: loading, isError, error, onRetry }) => {
  const distribution = useMemo(() => metadata
    ? playtimeBuckets.map(({ key, label }) => ({
      key,
      label,
      value: metadata.buckets[key],
      valueLabel: formatNumber(metadata.buckets[key]),
      tooltip: `${pluralize(metadata.buckets[key], 'jogo', 'jogos')} · ${formatPercent(metadata.buckets[key] / metadata.numberOfGames)} da biblioteca`,
      href: `/dashboard?faixa=${key}`
    }))
    : [], [metadata])

  const topPlayed = useMemo(() => metadata
    ? games.toSorted((a, b) => b.playtime - a.playtime).slice(0, 5).map(game => ({
      key: game.appId,
      label: game.name,
      value: game.playtime,
      valueLabel: formatHours(game.playtime),
      tooltip: `${formatPercent(game.playtime / metadata.hoursPlayed)} do seu tempo total`,
      href: `/game/${game.appId}`
    }))
    : [], [games, metadata])

  const costRanking = useMemo(() => {
    const ranked = games.filter(game => game.costPerHour != null).toSorted((a, b) => a.costPerHour - b.costPerHour)
    return { best: costItems(ranked.slice(0, 5)), worst: costItems(ranked.slice(-5).reverse()) }
  }, [games])

  if (isError) {
    return (
      <Page>
        <title>Estatísticas · Steam Manager</title>
        <PageTitle>Estatísticas</PageTitle>
        <StatusMessage
          tone='error'
          title='Não foi possível carregar suas estatísticas'
          description={describeError(error)}
          actionLabel='Tentar novamente'
          onAction={onRetry}
        />
      </Page>
    )
  }

  const hasPrices = metadata?.accountValue != null

  if (!loading && metadata?.numberOfGames === 0) {
    return (
      <Page>
        <title>Estatísticas · Steam Manager</title>
        <PageTitle>Estatísticas</PageTitle>
        <StatusMessage title='Sua biblioteca está vazia' description='As estatísticas aparecem quando houver jogos na sua conta.' />
      </Page>
    )
  }

  return (
    <Page>
      <title>Estatísticas · Steam Manager</title>
      <PageTitle>Estatísticas</PageTitle>
      <StatGrid aria-busy={loading}>
        <StatTile loading={loading} label='Jogos na biblioteca' value={formatNumber(metadata?.numberOfGames ?? 0)} />
        <StatTile loading={loading} label='Tempo de jogo' value={formatHours(metadata?.hoursPlayed ?? 0)} />
        <StatTile
          loading={loading}
          label='Jogos já iniciados'
          value={formatPercent(metadata?.percentualPlayed ?? 0)}
          hint={metadata && `${pluralize(metadata.timeNeverPlayed, 'nunca jogado', 'nunca jogados')}`}
        />
        {(loading || hasPrices) && (
          <>
            <StatTile loading={loading} label='Valor da conta' value={formatPrice(metadata?.accountValue ?? 0)} hint='Preço atual na Steam' />
            <StatTile loading={loading} label='Custo por hora jogada' value={formatPrice(metadata?.valuePerHour ?? 0)} />
          </>
        )}
      </StatGrid>

      {!loading && (
        <Panels>
          <Panel>
            <SectionTitle>Distribuição do tempo de jogo</SectionTitle>
            <BarList label='Jogos por faixa de tempo de jogo' items={distribution} />
          </Panel>
          <Panel>
            <SectionTitle>Mais jogados</SectionTitle>
            <BarList label='Cinco jogos com mais horas' items={topPlayed} />
          </Panel>
          {hasPrices && costRanking.best.length > 0 && (
            <>
              <Panel>
                <PanelHeader>
                  <SectionTitle>Melhor custo por hora</SectionTitle>
                  <Link to='/dashboard?ordem=custo-por-hora'>Ver todos</Link>
                </PanelHeader>
                <PanelHint>Preço atual dividido pelas horas jogadas, em jogos com {minHoursForCostPerHour} h ou mais</PanelHint>
                <BarList label='Cinco jogos com menor custo por hora' items={costRanking.best} />
              </Panel>
              <Panel>
                <SectionTitle>Pior custo por hora</SectionTitle>
                <PanelHint>Os que mais custaram pelo pouco que foram jogados</PanelHint>
                <BarList label='Cinco jogos com maior custo por hora' items={costRanking.worst} />
              </Panel>
            </>
          )}
        </Panels>
      )}

      {hasPrices && (
        <Attribution>
          Preços fornecidos por <a href='https://isthereanydeal.com' target='_blank' rel='noopener noreferrer'>IsThereAnyDeal.com</a>
        </Attribution>
      )}
    </Page>
  )
}
export default StatisticsView
