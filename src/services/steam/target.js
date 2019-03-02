const corsProxy = 'https://cors-anywhere.herokuapp.com'
const apiUrl = `${corsProxy}/https://api.steampowered.com`

const apiKey = '6C07A0039600F983FF9DE827D6D95500'
const steamId = '76561198061553967'

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
