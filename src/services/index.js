export const FetchStatus = { idle: 'idle', success: 'success', failed: 'failed' }

export const success = (payload) => ({ ...payload, status: FetchStatus.success })
export const failed = () => ({ status: FetchStatus.failed })

export const request = (url, params) => new Promise((resolve, reject) => {
  if (params) url += `?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`
  fetch(url)
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(error => reject(error))
})

export { fetchOwnedGames } from './steam'
export { fetchGamePrices } from './itad'
