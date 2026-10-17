const apiUrl = '/api/steam'

const steamId = import.meta.env.VITE_STEAM_ID

const params = {
  filters: () => ({
    steamid: steamId,
    include_played_free_games: '1',
    include_appinfo: '1'
  }),
  storeItems: (appIds) => ({
    input_json: JSON.stringify({
      ids: appIds.map(appid => ({ appid })),
      context: { language: 'brazilian', country_code: 'BR' },
      data_request: { include_basic_info: true, include_release: true }
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
    params: params.storeItems(appIds)
  })
}

export default target
