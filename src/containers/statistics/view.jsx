import { useMemo } from 'react'
import styled from 'styled-components'
import BarList from '../../components/barList'
import StatTile, { StatGrid } from '../../components/statTile'
import StatusMessage from '../../components/statusMessage'
import { Page, PageTitle, Panel, SectionTitle, SteamColors, space } from '../../globalStyles'
import { fetchStatus } from '../../services'
import { formatHours, formatNumber, formatPercent, formatPrice, pluralize } from '../../utils/format'

const Panels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

const playtimeBuckets = [
  { key: 'time100plus', label: '100 h ou mais' },
  { key: 'time100to10', label: '10 a 100 h' },
  { key: 'time10to1', label: '1 a 10 h' },
  { key: 'time1minus', label: 'Menos de 1 h' },
  { key: 'timeNeverPlayed', label: 'Nunca jogados' }
]

const StatisticsView = ({ games, metadata, status, onRetry }) => {
  const loading = status === fetchStatus.idle || status === fetchStatus.fetching

  const distribution = useMemo(() => metadata
    ? playtimeBuckets.map(({ key, label }) => ({
      key,
      label,
      value: metadata[key],
      valueLabel: formatNumber(metadata[key]),
      tooltip: `${pluralize(metadata[key], 'jogo', 'jogos')} · ${formatPercent(metadata[key] / metadata.numberOfGames)} da biblioteca`
    }))
    : [], [metadata])

  const topPlayed = useMemo(() => metadata
    ? games.toSorted((a, b) => b.playtime - a.playtime).slice(0, 5).map(game => ({
      key: game.appId,
      label: game.name,
      value: game.playtime,
      valueLabel: formatHours(game.playtime),
      tooltip: `${formatPercent(game.playtime / metadata.hoursPlayed)} do seu tempo total`
    }))
    : [], [games, metadata])

  if (status === fetchStatus.error) {
    return (
      <Page>
        <title>Estatísticas · Steam Manager</title>
        <PageTitle>Estatísticas</PageTitle>
        <StatusMessage
          tone='error'
          title='Não foi possível carregar suas estatísticas'
          description='Verifique sua conexão e as chaves de API no .env.local.'
          actionLabel='Tentar novamente'
          onAction={onRetry}
        />
      </Page>
    )
  }

  const hasPrices = metadata?.accountValue != null

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
