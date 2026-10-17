const apiUrl = '/api/steam'

const steamId = import.meta.env.VITE_STEAM_ID

const listDataRequest = { include_basic_info: true, include_release: true }
const detailsDataRequest = { ...listDataRequest, include_assets: true, include_platforms: true }

const params = {
  filters: () => ({
    steamid: steamId,
    include_played_free_games: '1',
    include_appinfo: '1'
  }),
  storeItems: (appIds, dataRequest) => ({
    input_json: JSON.stringify({
      ids: appIds.map(appid => ({ appid })),
      context: { language: 'brazilian', country_code: 'BR' },
      data_request: dataRequest
    })
  })
}

const target = {
  getOwnedGames: () => ({
    url: `${apiUrl}/IPlayerService/GetOwnedGames/v1`,
    params: params.filters()
  }),
  // Requires the wishlist to be public on the Steam profile
  getWishlist: () => ({
    url: `${apiUrl}/IWishlistService/GetWishlist/v1`,
    params: { steamid: steamId }
  }),
  getStoreItems: (appIds) => ({
    url: `${apiUrl}/IStoreBrowseService/GetItems/v1`,
    params: params.storeItems(appIds, listDataRequest)
  }),
  getStoreDetails: (appId) => ({
    url: `${apiUrl}/IStoreBrowseService/GetItems/v1`,
    params: params.storeItems([appId], detailsDataRequest)
  }),
  // Names, descriptions and icons of every achievement in a game
  getAchievementSchema: (appId) => ({
    url: `${apiUrl}/ISteamUserStats/GetSchemaForGame/v2`,
    params: { appid: appId, l: 'brazilian' }
  }),
  // Which achievements the user unlocked and when (needs public game details)
  getPlayerAchievements: (appId) => ({
    url: `${apiUrl}/ISteamUserStats/GetPlayerAchievements/v1`,
    params: { appid: appId, steamid: steamId, l: 'brazilian' }
  }),
  // Share of all players who unlocked each achievement
  getGlobalAchievementPercentages: (appId) => ({
    url: `${apiUrl}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2`,
    params: { gameid: appId }
  })
}

export default target
