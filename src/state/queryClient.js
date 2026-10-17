import { QueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const minute = 60 * 1000
const week = 7 * 24 * 60 * minute
const transientErrors = ['network', 'unavailable']

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reopening a page within 5 minutes reuses the data; older data refreshes in the background
      staleTime: 5 * minute,
      // Must outlive the persisted cache, or restored queries would be dropped right away
      gcTime: week,
      refetchOnWindowFocus: false,
      // A wrong key or a private profile won't fix itself; only retry transient failures
      retry: (failureCount, error) => transientErrors.includes(error?.code) && failureCount < 2
    }
  }
})

// Keeps queries marked with `meta: { persist: true }` in localStorage between visits
export const createPersistOptions = () => ({
  persister: createSyncStoragePersister({ storage: window.localStorage, key: 'steam-manager:cache' }),
  maxAge: week,
  // A different Steam ID or stored shape discards the old cache: bump the version
  // whenever the shape of persisted data changes
  buster: `v1:${import.meta.env.VITE_STEAM_ID}`,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => query.state.status === 'success' && query.meta?.persist === true
  }
})

// Before TanStack Query the app cached each resource under its own key
export const removeLegacyCache = () => {
  try {
    Object.keys(window.localStorage)
      .filter(key => /^steam-manager:(owned-games|wishlist):/.test(key))
      .forEach(key => window.localStorage.removeItem(key))
  } catch {
    // Storage blocked: nothing to clean up
  }
}
