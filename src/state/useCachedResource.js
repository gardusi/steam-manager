import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchStatus } from '../services'
import { readCache, writeCache } from './cache'

const emptyState = {
  status: fetchStatus.idle,
  data: null,
  updatedAt: null,
  refreshing: false,
  error: null
}

// Loads data with `load()`, caching it under `cacheName` (e.g. 'owned-games:v2').
// Cached data renders immediately and is refreshed in the background; if a refresh
// fails the cached data stays. Returns { status, data, updatedAt, refreshing, error, reload }.
export const useCachedResource = (cacheName, load) => {
  const [state, setState] = useState(() => {
    const cached = readCache(cacheName)
    return cached ? { ...emptyState, ...cached, status: fetchStatus.success } : emptyState
  })
  const [attempt, setAttempt] = useState(0)
  const reload = useCallback(() => setAttempt(current => current + 1), [])

  useEffect(() => {
    let cancelled = false
    setState(current => current.status === fetchStatus.success
      ? { ...current, refreshing: true, error: null }
      : { ...current, status: fetchStatus.fetching, error: null })

    load()
      .then(data => {
        if (cancelled) return
        const updatedAt = Date.now()
        writeCache(cacheName, { data, updatedAt })
        setState({ ...emptyState, status: fetchStatus.success, data, updatedAt })
      })
      .catch(error => {
        console.error(error)
        if (cancelled) return
        setState(current => current.status === fetchStatus.success
          ? { ...current, refreshing: false, error }
          : { ...current, status: fetchStatus.error, error })
      })

    return () => { cancelled = true }
  }, [cacheName, load, attempt])

  return useMemo(() => ({ ...state, reload }), [state, reload])
}
