import request from '..'
import target from './target'

const storeUrl = 'https://store.steampowered.com'
const appsImageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps'

export const fetchOwnedGames = async () => {
  const { response } = await request(target.getOwnedGames())
  const ownedGames = response.games.map((game) => ({
    appId: game.appid,
    link: `${storeUrl}/app/${game.appid}`,
    logoUrl: `${appsImageUrl}/${game.appid}/header.jpg`,
    playtime: game.playtime_forever / 60,
    name: game.name
  }))
  return ownedGames
}
