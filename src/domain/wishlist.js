// Totals for the wishlist summary tiles
export const summarizeWishlist = (items) => {
  const onSale = items.filter(item => item.cut > 0)
  return {
    count: items.length,
    onSale: onSale.length,
    biggestCut: Math.max(0, ...onSale.map(item => item.cut)),
    atHistoricalLow: items.filter(item => item.atHistoricalLow).length,
    total: items.reduce((acc, item) => acc + (item.price ?? 0), 0),
    savings: onSale.reduce((acc, item) => acc + (item.regular - item.price), 0)
  }
}
