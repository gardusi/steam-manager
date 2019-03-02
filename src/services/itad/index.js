import request from '..'
import target from './target'

export const fetchGamePrices = async (appsId) => {
  const { data: plains } = await request(target.getGamePlains(appsId))
  const [{ data: prices }, { data: lowest }] = await Promise.all([
    request(target.getGamePrices(plains)),
    request(target.getGameLowest(plains))
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
  return gamePrices
}
