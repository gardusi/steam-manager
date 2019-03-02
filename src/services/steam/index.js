import request from '..'
import target from './target'

const storeUrl = 'https://store.steampowered.com'
const appsBaseImageUrl = 'http://media.steampowered.com/steamcommunity/public/images/apps'

export const fetchOwnedGames = async () => {
  const { response } = await request(target.getOwnedGames())
  const ownedGames = response.games.map((game) => ({
    appId: game.appid,
    // iconUrl: `${appsBaseImageUrl}/${game.appid}/${game.img_icon_url}`,
    link: `${storeUrl}/app/${game.appid}`,
    logoUrl: `${appsBaseImageUrl}/${game.appid}/${game.img_logo_url}.jpg`,
    playtime: game.playtime_forever / 60,
    name: game.name
  }))
  return ownedGames
}
