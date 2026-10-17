import { useLocation, useNavigate, useParams } from 'react-router'
import AchievementList from '../../components/achievementList'
import AsyncSection from '../../components/asyncSection'
import DealPrice from '../../components/dealPrice'
import PriceHistoryChart from '../../components/priceHistoryChart'
import StatTile, { StatGrid } from '../../components/statTile'
import StatusMessage from '../../components/statusMessage'
import { ReleaseTags, Tag } from '../../components/tags'
import { costPerHour, isPlayed } from '../../domain/playtime'
import { Page } from '../../styles'
import { isValidAppId, useGameDetails } from '../../state/game'
import { useLibrary } from '../../state/library'
import { useWishlist } from '../../state/wishlist'
import { formatHours, formatLongDate, formatPrice, formatRelativeDate } from '../../utils/format'
import {
  Hero, HeroSkeleton, HeroInner, BackLink, GameTitle, Tags, Layout, Main, Aside, PriceArea,
  Actions, ActionLink, Facts, Description, SkeletonBlock
} from './style'

// Text plus a symbol, so the state never relies on color alone
const deckLabels = {
  verified: '✓ Verificado',
  playable: '◐ Jogável',
  unsupported: '✕ Não suportado',
  unknown: 'Não avaliado'
}

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

const GameHero = ({ name, details, owned, wished }) => (
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
)

const GameFacts = ({ details, wished }) => {
  const publishers = details.publishers.filter(p => !details.developers.includes(p))
  return (
    <Facts>
      {details.developers.length > 0 && (<><dt>Desenvolvedora</dt><dd>{details.developers.join(', ')}</dd></>)}
      {publishers.length > 0 && (<><dt>Publicadora</dt><dd>{publishers.join(', ')}</dd></>)}
      <dt>Lançamento</dt>
      <dd>{details.comingSoon || !details.releaseDate ? 'Em breve' : formatLongDate(details.releaseDate)}</dd>
      <dt>Steam Deck</dt>
      <dd>{deckLabels[details.deck]}</dd>
      {wished && (<><dt>Na lista desde</dt><dd>{formatLongDate(wished.addedAt)}</dd></>)}
    </Facts>
  )
}

const GameAside = ({ deal, details, owned, wished }) => (
  <Aside aria-label='Preço e informações'>
    <PriceArea>
      {deal.isLoading
        ? <SkeletonBlock $height={40} style={{ width: 160 }} />
        : <DealPrice deal={deal.data} comingSoon={details?.comingSoon} />}
    </PriceArea>
    <Actions>
      {owned && <ActionLink $primary href={`steam://run/${owned.appId}`}>▶ Jogar</ActionLink>}
      <ActionLink href={(details ?? owned ?? wished)?.link} target='_blank' rel='noopener noreferrer'>
        Ver na loja Steam ↗
      </ActionLink>
    </Actions>
    {details && <GameFacts details={details} wished={wished} />}
  </Aside>
)

const OwnedStats = ({ game, price }) => {
  const played = isPlayed(game)
  const perHour = costPerHour({ price, playtime: game.playtime })
  return (
    <StatGrid>
      <StatTile label='Tempo de jogo' value={played ? formatHours(game.playtime) : 'Nunca jogado'} />
      {played && (
        <StatTile label='Jogado pela última vez' value={game.lastPlayed ? formatRelativeDate(game.lastPlayed) : 'Sem registro'} />
      )}
      {perHour != null && <StatTile label='Custo por hora' value={`${formatPrice(perHour)}/h`} hint='Preço atual ÷ horas jogadas' />}
    </StatGrid>
  )
}

const NotFound = () => (
  <Page>
    <title>Jogo não encontrado · Steam Manager</title>
    <StatusMessage title='Jogo não encontrado' description='Confira o endereço ou volte para a sua biblioteca.' />
  </Page>
)

const GamePage = () => {
  const appId = Number(useParams().appId)
  const owned = useLibrary().games.find(game => game.appId === appId)
  const wished = useWishlist().items.find(item => item.appId === appId)
  const { store, deal, history, achievements } = useGameDetails(appId, { owned: Boolean(owned) })

  const details = store.data
  const name = details?.name ?? owned?.name ?? wished?.name
  const storeKnowsNothing = !store.isLoading && !store.isError && !details
  if (!isValidAppId(appId) || (storeKnowsNothing && !owned && !wished)) return <NotFound />

  return (
    <>
      {name && <title>{`${name} · Steam Manager`}</title>}
      {store.isLoading && !name
        ? <HeroSkeleton aria-hidden='true' />
        : <GameHero name={name} details={details} owned={owned} wished={wished} />}
      <Page>
        <Layout>
          <GameAside deal={deal} details={details} owned={owned} wished={wished} />
          <Main>
            {details?.description && <Description>{details.description}</Description>}
            {owned && <OwnedStats game={owned} price={deal.data?.price} />}
            <AsyncSection
              title='Histórico de preço na Steam'
              resource={history}
              skeletonHeight={300}
              errorTitle='Não foi possível carregar o histórico de preço'
              isEmpty={(data) => !data?.length}
              emptyNote='O IsThereAnyDeal não tem histórico de preço deste jogo na Steam.'
            >
              {(data) => <PriceHistoryChart history={data} steamLowest={deal.data?.steamLowest} />}
            </AsyncSection>
            {owned && (
              <AsyncSection
                title='Conquistas'
                resource={achievements}
                skeletonHeight={160}
                errorTitle='Não foi possível carregar suas conquistas'
                isEmpty={(data) => data.length === 0}
                emptyNote='Este jogo não tem conquistas.'
              >
                {(data) => <AchievementList achievements={data} />}
              </AsyncSection>
            )}
          </Main>
        </Layout>
      </Page>
    </>
  )
}
export default GamePage
