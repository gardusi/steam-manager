const apiUrl = '/api/itad'

// IsThereAnyDeal shop id for Steam
const steamShopId = 61

const target = {
  lookupGameIds: (appsId) => ({
    url: `${apiUrl}/lookup/id/shop/${steamShopId}/v1`,
    method: 'POST',
    body: appsId.map(appId => `app/${appId}`)
  }),
  getGamePrices: (gameIds) => ({
    url: `${apiUrl}/games/prices/v3`,
    method: 'POST',
    params: { country: 'BR', shops: steamShopId },
    body: gameIds
  })
}

export default target
