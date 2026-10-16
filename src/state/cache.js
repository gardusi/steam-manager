// Last loaded library, kept in localStorage so the app can show it instantly
// while fresh data loads. Bump the version when the stored shape changes.
const cacheKey = `steam-manager:owned-games:v2:${import.meta.env.VITE_STEAM_ID}`

export const readCache = () => {
  try {
    const raw = window.localStorage.getItem(cacheKey)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const writeCache = (data) => {
  try {
    window.localStorage.setItem(cacheKey, JSON.stringify(data))
  } catch {
    // Storage full or blocked: the app still works, just without the cache
  }
}
