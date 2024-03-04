const corsProxy = 'https://cors-anywhere.herokuapp.com'
const apiUrl = `${corsProxy}/https://api.isthereanydeal.com`

const apiKey = '<API-KEY>'

const params = {
  plains: (appsId) => ({
    key: apiKey,
    shop: 'steam',
    ids: appsId.map(appId => `app%2F${appId}`).join()
  }),
  pricing: (plains) => ({
    key: apiKey,
    shops: 'steam',
    country: 'BR',
    plains: Object.values(plains).join()
  })
}

const target = {
  getGamePlains: (appsId) => ({
    url: `${apiUrl}/v01/game/plain/id`,
    params: params.plains(appsId)
  }),
  getGamePrices: (plains) => ({
    url: `${apiUrl}/v01/game/prices`,
    params: params.pricing(plains)
  }),
  getGameLowest: (plains) => ({
    url: `${apiUrl}/v01/game/lowest`,
    params: params.pricing(plains)
  })
}

export default target
