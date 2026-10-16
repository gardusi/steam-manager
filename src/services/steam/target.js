const corsProxy = 'https://cors-anywhere.herokuapp.com'
const apiUrl = `${corsProxy}/https://api.steampowered.com`

const apiKey = import.meta.env.VITE_STEAM_API_KEY
const steamId = import.meta.env.VITE_STEAM_ID

const params = {
  filters: () => ({
    steamid: steamId,
    include_played_free_games: '1',
    include_appinfo: '1',
    key: apiKey
  })
}

const target = {
  getOwnedGames: () => ({
    url: `${apiUrl}/IPlayerService/GetOwnedGames/v1`,
    params: params.filters()
  })
}

export default target
