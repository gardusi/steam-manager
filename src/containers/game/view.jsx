import { useLocation, useNavigate } from 'react-router'
import AchievementList from '../../components/achievementList'
import DealPrice from '../../components/dealPrice'
import PriceHistoryChart from '../../components/priceHistoryChart'
import StatTile, { StatGrid } from '../../components/statTile'
import StatusMessage from '../../components/statusMessage'
import { ReleaseTags, Tag } from '../../components/wishlistCard'
import { Page, Panel, SectionTitle } from '../../globalStyles'
import { fetchStatus } from '../../services'
import { formatHours, formatPrice, formatRelativeDate } from '../../utils/format'
import { minHoursForCostPerHour, neverPlayedThreshold } from '../../utils/playtime'
import {
  Hero, HeroSkeleton, HeroInner, BackLink, GameTitle, Tags, Layout, Main, Aside, PriceArea,
  Actions, ActionLink, Facts, Description, SectionHeader, SectionNote, PanelBody, SkeletonBlock
} from './style'

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

// Text plus a symbol, so the state never relies on color alone
const deckLabels = {
  verified: '✓ Verificado',
  playable: '◐ Jogável',
  unsupported: '✕ Não suportado',
  unknown: 'Não avaliado'
}

const isLoading = (resource) => resource.status === fetchStatus.idle || resource.status === fetchStatus.fetching

// "Voltar" returns to the previous page inside the app, or to the library on a direct visit
const Back = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const hasHistory = location.key !== 'default'
  return (
    <BackLink
      to='/dashboard'
      onClick={(event) => {
        if (!hasHistory) return
        event.preventDefault()
        navigate(-1)
      }}
    >
      ← Voltar
    </BackLink>
  )
}

const PriceSection = ({ history, steamLowest }) => {
  let body
  if (isLoading(history)) body = <SkeletonBlock $height={300} aria-label='Carregando histórico de preço' />
  else if (history.status === fetchStatus.error) {
    body = <StatusMessage tone='error' title='Não foi possível carregar o histórico de preço' actionLabel='Tentar novamente' onAction={history.reload} />
  } else if (!history.data?.length) {
    body = <SectionNote>O IsThereAnyDeal não tem histórico de preço deste jogo na Steam.</SectionNote>
  } else body = <PriceHistoryChart history={history.data} steamLowest={steamLowest} />

  return (
    <Panel>
      <PanelBody>
        <SectionHeader>
          <SectionTitle as='h2'>Histórico de preço na Steam</SectionTitle>
        </SectionHeader>
        {body}
      </PanelBody>
    </Panel>
  )
}

const AchievementsSection = ({ achievements }) => {
  let body
  if (isLoading(achievements)) body = <SkeletonBlock $height={160} aria-label='Carregando conquistas' />
  else if (achievements.status === fetchStatus.error) {
    body = (
      <StatusMessage
        tone='error'
        title='Não foi possível carregar suas conquistas'
        description='As conquistas precisam estar públicas: no perfil da Steam, em Privacidade, deixe “Detalhes dos jogos” como Público.'
        actionLabel='Tentar novamente'
        onAction={achievements.reload}
      />
    )
  } else if (achievements.data.length === 0) body = <SectionNote>Este jogo não tem conquistas.</SectionNote>
  else body = <AchievementList achievements={achievements.data} />

  return (
    <Panel>
      <PanelBody>
        <SectionTitle as='h2'>Conquistas</SectionTitle>
        {body}
      </PanelBody>
    </Panel>
  )
}

const GameView = ({ valid, owned, wished, store, deal, history, achievements }) => {
  const details = store.data
  const name = details?.name ?? owned?.name ?? wished?.name

  if (!valid || (store.status === fetchStatus.success && !details && !owned && !wished)) {
    return (
      <Page>
        <title>Jogo não encontrado · Steam Manager</title>
        <StatusMessage title='Jogo não encontrado' description='Confira o endereço ou volte para a sua biblioteca.' />
      </Page>
    )
  }

  const currentDeal = deal.data
  const played = owned && owned.playtime >= neverPlayedThreshold
  const costPerHour = owned && currentDeal?.price > 0 && owned.playtime >= minHoursForCostPerHour
    ? currentDeal.price / owned.playtime
    : null
  const publishers = details?.publishers.filter(p => !details.developers.includes(p)) ?? []

  return (
    <>
      {name && <title>{`${name} · Steam Manager`}</title>}
      {isLoading(store) && !name
        ? <HeroSkeleton aria-hidden='true' />
        : (
            <Hero $image={details?.heroUrl ?? (owned ?? wished)?.logoUrl}>
              <Back />
              <HeroInner>
                <GameTitle>{name}</GameTitle>
                <Tags>
                  {owned && <Tag>Na sua biblioteca</Tag>}
                  {wished && <Tag>Na lista de desejos</Tag>}
                  {details && <ReleaseTags game={details} />}
                </Tags>
              </HeroInner>
            </Hero>
          )}

      <Page>
        <Layout>
          <Aside aria-label='Preço e informações'>
            <PriceArea>
              {isLoading(deal)
                ? <SkeletonBlock $height={40} style={{ width: 160 }} />
                : <DealPrice deal={currentDeal} comingSoon={details?.comingSoon} />}
            </PriceArea>
            <Actions>
              {owned && (
                <ActionLink $primary href={`steam://run/${owned.appId}`}>▶ Jogar</ActionLink>
              )}
              <ActionLink href={details?.link ?? (owned ?? wished)?.link} target='_blank' rel='noopener noreferrer'>
                Ver na loja Steam ↗
              </ActionLink>
            </Actions>
            {details && (
              <Facts>
                {details.developers.length > 0 && (<><dt>Desenvolvedora</dt><dd>{details.developers.join(', ')}</dd></>)}
                {publishers.length > 0 && (<><dt>Publicadora</dt><dd>{publishers.join(', ')}</dd></>)}
                <dt>Lançamento</dt>
                <dd>{details.comingSoon || !details.releaseDate ? 'Em breve' : dateFormat.format(details.releaseDate)}</dd>
                <dt>Steam Deck</dt>
                <dd>{deckLabels[details.deck]}</dd>
                {wished && (<><dt>Na lista desde</dt><dd>{dateFormat.format(wished.addedAt)}</dd></>)}
              </Facts>
            )}
          </Aside>

          <Main>
            {details?.description && <Description>{details.description}</Description>}
            {owned && (
              <StatGrid>
                <StatTile label='Tempo de jogo' value={played ? formatHours(owned.playtime) : 'Nunca jogado'} />
                {played && (
                  <StatTile label='Jogado pela última vez' value={owned.lastPlayed ? formatRelativeDate(owned.lastPlayed) : 'Sem registro'} />
                )}
                {costPerHour != null && (
                  <StatTile label='Custo por hora' value={`${formatPrice(costPerHour)}/h`} hint='Preço atual ÷ horas jogadas' />
                )}
              </StatGrid>
            )}
            <PriceSection history={history} steamLowest={currentDeal?.steamLowest} />
            {owned && <AchievementsSection achievements={achievements} />}
          </Main>
        </Layout>
      </Page>
    </>
  )
}
export default GameView
