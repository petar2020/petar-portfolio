// Resolve prices in prose, metadata and FAQ from the same pricing catalogue
// that renders /sr/cenovnik. Unknown tokens fail validation instead of leaking.
export function resolvePricingCopy(value, pricing) {
  const [website, booking, app, shop] = pricing.packages
  const values = { maintenancePrice: pricing.maintenancePrice }
  for (const [key, item] of Object.entries({ website, booking, app, shop })) {
    values[`${key}Price`] = item.price
    values[`${key}Duration`] = item.duration
  }
  function resolve(item) {
    if (typeof item === 'string') return item.replace(/\{(\w+)\}/g, (token, key) => {
      if (!(key in values)) throw new Error(`Unknown pricing token: ${token}`)
      return values[key]
    })
    if (Array.isArray(item)) return item.map(resolve)
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item).map(([key, entry]) => [key, resolve(entry)]))
    return item
  }
  return resolve(value)
}
