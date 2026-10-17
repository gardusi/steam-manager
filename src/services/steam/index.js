import request from '../http'
import target from './target'
import { inBatches } from '../batches'
import { ApiError } from '../errors'

const storeUrl = 'https://store.steampowered.com'
const appsImageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps'

const appLinks = (appId) => ({
  link: `${storeUrl}/app/${appId}`,
  logoUrl: `${appsImageUrl}/${appId}/header.jpg`
})

export const fetchOwnedGames = async () => {
  const { response } = await request(target.getOwnedGames())
  // A public library always has game_count (0 when empty); Steam answers an empty
  // `response` when the profile's game details aren't public
  if (response.game_count === undefined) throw new ApiError('private-profile', { service: 'steam' })
  const ownedGames = (response.games ?? []).map((game) => ({
    appId: game.appid,
    ...appLinks(game.appid),
    playtime: game.playtime_forever / 60,
    // Unix seconds; 0 when Steam never recorded a session
    lastPlayed: game.rtime_last_played ? game.rtime_last_played * 1000 : null,
    name: game.name
  }))
  return ownedGames
}

// The wishlist API only returns app ids, so names and release info come from the store
export const fetchWishlist = async () => {
  const { response } = await request(target.getWishlist())
  const entries = response.items ?? []
  const storeItems = (await inBatches(entries.map(entry => entry.appid), 100,
    async batch => (await request(target.getStoreItems(batch))).response.store_items ?? []
  )).flat()
  const storeById = new Map(storeItems.map(item => [item.appid, item]))

  return entries.map(entry => {
    const store = storeById.get(entry.appid)
    const release = store?.release ?? {}
    return {
      appId: entry.appid,
      ...appLinks(entry.appid),
      name: store?.name ?? `App ${entry.appid}`,
      addedAt: entry.date_added * 1000,
      priority: entry.priority,
      releaseDate: release.steam_release_date ? release.steam_release_date * 1000 : null,
      comingSoon: Boolean(store?.is_coming_soon ?? release.is_coming_soon),
      earlyAccess: Boolean(store?.is_early_access ?? release.is_early_access)
    }
  })
}

const assetsUrl = 'https://shared.akamai.steamstatic.com/store_item_assets'
// Literal placeholder in Steam's asset_url_format, e.g. "steam/apps/220/${FILENAME}?t=..."
const filenamePlaceholder = '$' + '{FILENAME}'

// Steam Deck compatibility category from the store
const deckCompatibility = { 1: 'unsupported', 2: 'playable', 3: 'verified' }

export const fetchStoreDetails = async (appId) => {
  const { response } = await request(target.getStoreDetails(appId))
  const store = response.store_items?.[0]
  if (!store?.name) return null
  const release = store.release ?? {}
  const assets = store.assets ?? {}
  const assetUrl = (file) => file && assets.asset_url_format
    ? `${assetsUrl}/${assets.asset_url_format.replace(filenamePlaceholder, file)}`
    : null
  return {
    appId,
    ...appLinks(appId),
    name: store.name,
    description: store.basic_info?.short_description ?? '',
    developers: store.basic_info?.developers?.map(d => d.name) ?? [],
    publishers: store.basic_info?.publishers?.map(p => p.name) ?? [],
    releaseDate: release.steam_release_date ? release.steam_release_date * 1000 : null,
    comingSoon: Boolean(store.is_coming_soon ?? release.is_coming_soon),
    earlyAccess: Boolean(store.is_early_access ?? release.is_early_access),
    heroUrl: assetUrl(assets.library_hero),
    deck: deckCompatibility[store.platforms?.steam_deck_compat_category] ?? 'unknown'
  }
}

// All achievements of a game merged with the user's progress and global rarity:
// [{ id, name, description, hidden, icon, iconLocked, unlocked, unlockedAt, percent }]
// Returns [] for games without achievements.
export const fetchAchievements = async (appId) => {
  const schema = await request(target.getAchievementSchema(appId))
  const definitions = schema.game?.availableGameStats?.achievements ?? []
  if (definitions.length === 0) return []

  const [player, global] = await Promise.all([
    // Steam answers 403 "Profile is not public" when it won't show this player's progress
    request(target.getPlayerAchievements(appId)).catch(error => {
      throw error.status === 403 ? new ApiError('private-profile', { service: 'steam', status: 403, cause: error }) : error
    }),
    request(target.getGlobalAchievementPercentages(appId)).catch(() => null)
  ])
  const progress = new Map((player.playerstats?.achievements ?? []).map(a => [a.apiname, a]))
  const rarity = new Map((global?.achievementpercentages?.achievements ?? []).map(a => [a.name, Number(a.percent)]))

  return definitions.map(definition => {
    const mine = progress.get(definition.name)
    return {
      id: definition.name,
      name: definition.displayName,
      description: definition.description ?? '',
      hidden: Boolean(definition.hidden),
      icon: definition.icon,
      iconLocked: definition.icongray,
      unlocked: Boolean(mine?.achieved),
      unlockedAt: mine?.unlocktime ? mine.unlocktime * 1000 : null,
      percent: rarity.get(definition.name) ?? null
    }
  })
}
