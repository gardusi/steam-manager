export const fetchStatus = {
  idle: 'idle',
  fetching: 'fetching',
  success: 'success',
  error: 'error'
}

const request = async ({ url, params, method = 'GET', body }) => {
  const query = params ? `?${new URLSearchParams(params)}` : ''
  const response = await fetch(`${url}${query}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined
  })
  if (!response.ok) throw new Error(`${method} ${url} failed with ${response.status}`)
  return response.json()
}
export default request

export { fetchOwnedGames } from './steam'
export { fetchGamePrices } from './itad'
