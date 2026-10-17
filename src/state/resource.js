// Reads a TanStack Query result the way the pages need it.
// A failed background refresh keeps the previous data (status 'error' with data),
// so `isError` here means "failed and there's nothing to show".
export const toResource = (query) => {
  const hasData = query.data !== undefined
  return {
    data: query.data,
    isLoading: query.isPending,
    isError: query.isError && !hasData,
    error: query.error,
    isRefreshing: query.isFetching && hasData,
    refreshFailed: query.isError && hasData,
    updatedAt: query.dataUpdatedAt || null,
    reload: query.refetch
  }
}
