// Last loaded data, kept in localStorage so the app can show it instantly
// while fresh data loads. Bump a resource's version when its stored shape changes.
const keyFor = (name) => `steam-manager:${name}:${import.meta.env.VITE_STEAM_ID}`

export const readCache = (name) => {
  try {
    const raw = window.localStorage.getItem(keyFor(name))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const writeCache = (name, data) => {
  try {
    window.localStorage.setItem(keyFor(name), JSON.stringify(data))
  } catch {
    // Storage full or blocked: the app still works, just without the cache
  }
}

// Removes data stored under an old version of a cache name
export const dropCache = (name) => {
  try {
    window.localStorage.removeItem(keyFor(name))
  } catch {}
}
