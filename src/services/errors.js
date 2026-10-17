// Failures the UI can explain to the user. `code` is one of:
// - 'network': the local dev/preview server (and its API proxy) can't be reached
// - 'unauthorized': the API rejected the key (Steam answers 401, ITAD 403)
// - 'unavailable': the API is down or overloaded (5xx)
// - 'private-profile': Steam hides the data because the profile isn't public
// - 'http': any other unexpected response
// `service` is 'steam' or 'itad'.
export class ApiError extends Error {
  constructor (code, { service, status, cause } = {}) {
    super(`${service ?? 'api'} request failed: ${code}${status ? ` (${status})` : ''}`, { cause })
    this.name = 'ApiError'
    this.code = code
    this.service = service
    this.status = status
  }
}

export const codeForStatus = (status) => {
  if (status === 401 || status === 403) return 'unauthorized'
  if (status >= 500) return 'unavailable'
  return 'http'
}
