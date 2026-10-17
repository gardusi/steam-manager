import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { useLibrary } from './library'
import { useWishlist } from './wishlist'

// One status for everything the app loads: when the saved data was last refreshed,
// whether something is loading, whether a refresh failed, and a way to refresh it all
export const useSyncStatus = () => {
  const queryClient = useQueryClient()
  const library = useLibrary()
  const wishlist = useWishlist()
  const updates = [library.updatedAt, wishlist.updatedAt].filter(Boolean)

  return {
    updatedAt: updates.length ? Math.min(...updates) : null,
    refreshing: useIsFetching() > 0,
    failed: library.refreshFailed || wishlist.refreshFailed,
    // Refetches every query on screen (including the game page) and marks the rest stale
    refreshAll: () => queryClient.invalidateQueries()
  }
}
