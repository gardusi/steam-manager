export const fetchStatus = {
  idle: 'idle',
  fetching: 'fetching',
  success: 'success',
  error: 'error'
}

const request = (endpoint) => new Promise((resolve, reject) => {
  if (endpoint.params) endpoint.url += `?${Object.keys(endpoint.params).map(key => `${key}=${endpoint.params[key]}`).join('&')}`
  fetch(endpoint.url)
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(error => reject(error))
})
export default request

export { fetchOwnedGames } from './steam'
export { fetchGamePrices } from './itad'
