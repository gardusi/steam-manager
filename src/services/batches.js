// Splits `items` into chunks of `size` and fetches them in parallel
export const inBatches = async (items, size, fetchBatch) => {
  const batches = []
  for (let i = 0; i < items.length; i += size) batches.push(items.slice(i, i + size))
  return Promise.all(batches.map(fetchBatch))
}
