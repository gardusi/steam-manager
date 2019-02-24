const corsProxy = 'https://cors-anywhere.herokuapp.com'
const apiUrl = `${corsProxy}/https://api.steampowered.com`
// const storeUrl = 'https://store.steampowered.com/api'

const apiKey = '6C07A0039600F983FF9DE827D6D95500'
const steamId = '76561198061553967'

const appsBaseImageUrl = 'http://media.steampowered.com/steamcommunity/public/images/apps'

export const FetchStatus = {
  Idle: 'Idle',
  Success: 'Success',
  Failed: 'Failed'
}

const endpoints = {
  getOwnedGames: 'IPlayerService/GetOwnedGames/v1'
}

const request = (url) => new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(({ response }) => resolve(response))
    .catch(error => reject(error))
})

export const fetchOwnedGames = async () => {
  try {
    const { games } = await request(`${apiUrl}/${endpoints.getOwnedGames}?steamid=${steamId}&include_appinfo=1&key=${apiKey}`)
    const ownedGames = games.map((game) => ({
      appId: game.appid,
      // iconUrl: `${appsBaseImageUrl}/${game.appid}/${game.img_icon_url}`,
      logoUrl: `${appsBaseImageUrl}/${game.appid}/${game.img_logo_url}.jpg`,
      playtime: game.playtime_forever,
      name: game.name
    }))
    return { ownedGames, status: FetchStatus.Success }
  } catch (error) {
    return { status: FetchStatus.Failed }
  }
}
