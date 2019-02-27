import { success, failed, request } from '..'

const corsProxy = 'https://cors-anywhere.herokuapp.com'
const apiUrl = `${corsProxy}/https://api.steampowered.com`
const storeUrl = 'https://store.steampowered.com'

const apiKey = '6C07A0039600F983FF9DE827D6D95500'
const steamId = '76561198061553967'

const appsBaseImageUrl = 'http://media.steampowered.com/steamcommunity/public/images/apps'

const endpoints = {
  getOwnedGames: 'IPlayerService/GetOwnedGames/v1'
}

export const fetchOwnedGames = async () => {
  try {
    const params = {
      steamid: steamId,
      include_played_free_games: '1',
      include_appinfo: '1',
      key: apiKey
    }
    const { response } = await request(`${apiUrl}/${endpoints.getOwnedGames}`, params)
    const ownedGames = response.games.map((game) => ({
      appId: game.appid,
      // iconUrl: `${appsBaseImageUrl}/${game.appid}/${game.img_icon_url}`,
      link: `${storeUrl}/app/${game.appid}`,
      logoUrl: `${appsBaseImageUrl}/${game.appid}/${game.img_logo_url}.jpg`,
      playtime: game.playtime_forever / 60,
      name: game.name
    }))
    return success({ games: ownedGames })
  } catch (error) {
    return failed()
  }
}
