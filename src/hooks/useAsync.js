import { useCallback, useEffect, useState } from 'react'
import { fetchStatus } from '../services'

// Results kept for the session, so revisiting a page doesn't refetch
const memory = new Map()

// Runs `load()` for `key` and returns { status, data, error, reload }.
// Pass a null key to skip loading (e.g. data that doesn't apply).
export const useAsync = (key, load) => {
  const [state, setState] = useState(() => initialState(key))
  const [attempt, setAttempt] = useState(0)
  const reload = useCallback(() => {
    memory.delete(key)
    setAttempt(current => current + 1)
  }, [key])

  useEffect(() => {
    if (key == null) return
    if (memory.has(key)) {
      setState({ status: fetchStatus.success, data: memory.get(key), error: null })
      return
    }
    let cancelled = false
    setState({ status: fetchStatus.fetching, data: null, error: null })
    load()
      .then(data => {
        memory.set(key, data)
        if (!cancelled) setState({ status: fetchStatus.success, data, error: null })
      })
      .catch(error => {
        console.error(error)
        if (!cancelled) setState({ status: fetchStatus.error, data: null, error })
      })
    return () => { cancelled = true }
    // `load` is recreated on every render; `key` identifies what it loads
  }, [key, attempt])

  return { ...state, reload }
}

const initialState = (key) => {
  if (key == null) return { status: fetchStatus.idle, data: null, error: null }
  if (memory.has(key)) return { status: fetchStatus.success, data: memory.get(key), error: null }
  return { status: fetchStatus.fetching, data: null, error: null }
}
