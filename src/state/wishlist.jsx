import { createContext, useContext, useMemo } from 'react'
import { fetchWishlist, fetchGamePrices } from '../services'
import { dropCache } from './cache'
import { useCachedResource } from './useCachedResource'
import { isAtHistoricalLow } from '../utils/prices'

const WishlistContext = createContext(null)

// v1 stored a different shape
dropCache('wishlist:v1')

const loadWishlist = async () => {
  const items = await fetchWishlist()
  const prices = await fetchGamePrices(items.map(item => item.appId))
  const pricesByAppId = new Map(prices.map(item => [item.appId, item]))

  return items.map(item => {
    const { price = null, regular = null, cut = 0, steamLowest = null } = pricesByAppId.get(`${item.appId}`) ?? {}
    return {
      ...item,
      price,
      regular,
      cut,
      steamLowest,
      atHistoricalLow: isAtHistoricalLow(price, steamLowest)
    }
  })
}

export const WishlistProvider = ({ children }) => {
  const resource = useCachedResource('wishlist:v2', loadWishlist)
  const value = useMemo(() => {
    const { data, ...rest } = resource
    return { ...rest, items: data ?? [] }
  }, [resource])
  return <WishlistContext value={value}>{children}</WishlistContext>
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return context
}
