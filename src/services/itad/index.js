import { success, failed, request } from '..'

const corsProxy = 'https://cors-anywhere.herokuapp.com'
const apiUrl = `${corsProxy}/https://api.isthereanydeal.com`

const apiKey = '5478f09f50a818c61459be08515b616b5419393e'

const endpoints = {
  getGamePlains: 'v01/game/plain/id',
  getGamePrices: 'v01/game/prices',
  getGameLowest: 'v01/game/lowest'
}

export const fetchGamePrices = async (appsId) => {
  var params = {}
  try {
    params = {
      key: apiKey,
      shop: 'steam',
      ids: appsId.map(appId => `app%2F${appId}`).join()
    }
    const { data: plains } = await request(`${apiUrl}/${endpoints.getGamePlains}`, params)

    params = {
      key: apiKey,
      shops: 'steam',
      country: 'BR',
      plains: Object.values(plains).join()
    }
    const [{ data: prices }, { data: lowest }] = await Promise.all([
      request(`${apiUrl}/${endpoints.getGamePrices}`, params),
      request(`${apiUrl}/${endpoints.getGameLowest}`, params)
    ])

    const gamePrices = Object.keys(plains).map(key => {
      const appId = key.split('/')[1]
      const [ price, low ] = [ prices[plains[key]], lowest[plains[key]] ]
      const values = (price && price.list && price.list[0]) || { price_new: 0 }
      return {
        appId,
        // TODO: Read price_old and price_cut for discounts
        price: (values && values.price_new) || 0,
        lowest: (low && low.price) || 0
      }
    })
    return success({ gamePrices })
  } catch (error) {
    return failed()
  }
}
