import request from '..'
import target from './target'
import { inBatches } from '../batches'

const storeUrl = 'https://store.steampowered.com'
const appsImageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps'

const appLinks = (appId) => ({
  link: `${storeUrl}/app/${appId}`,
  logoUrl: `${appsImageUrl}/${appId}/header.jpg`
})

export const fetchOwnedGames = async () => {
  const { response } = await request(target.getOwnedGames())
  const ownedGames = response.games.map((game) => ({
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
