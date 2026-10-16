const apiUrl = '/api/steam'

const steamId = import.meta.env.VITE_STEAM_ID

const params = {
  filters: () => ({
    steamid: steamId,
    include_played_free_games: '1',
    include_appinfo: '1'
  })
}

const target = {
  getOwnedGames: () => ({
    url: `${apiUrl}/IPlayerService/GetOwnedGames/v1`,
    params: params.filters()
  })
}

export default target
