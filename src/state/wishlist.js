import { useQuery } from '@tanstack/react-query'
import { attachPrices } from '../domain/prices'
import { fetchGamePrices, fetchWishlist } from '../services'
import { toResource } from './resource'

const noItems = []

const loadWishlist = async () => {
  const items = await fetchWishlist()
  return attachPrices(items, await fetchGamePrices(items.map(item => item.appId)))
}

// The user's Steam wishlist with current deals: { items, ...resource }
export const useWishlist = () => {
  const resource = toResource(useQuery({ queryKey: ['wishlist'], queryFn: loadWishlist, meta: { persist: true } }))
  return { ...resource, items: resource.data ?? noItems }
}
