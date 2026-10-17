import { ApiError, codeForStatus } from './errors'

// Calls one of the APIs through the dev/preview proxy (/api/steam, /api/itad).
// Throws ApiError so the UI can explain what went wrong.
const request = async ({ url, params, method = 'GET', body }) => {
  const service = url.startsWith('/api/itad') ? 'itad' : 'steam'
  const query = params ? `?${new URLSearchParams(params)}` : ''
  let response
  try {
    response = await fetch(`${url}${query}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    })
  } catch (cause) {
    throw new ApiError('network', { service, cause })
  }
  if (!response.ok) throw new ApiError(codeForStatus(response.status), { service, status: response.status })
  return response.json()
}
export default request
