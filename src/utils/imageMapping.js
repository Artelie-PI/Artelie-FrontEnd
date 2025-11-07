export function enrichProductWithImage(p) {
  if (!p) return p
  if (p.image && typeof p.image === 'object') {
    const url = p.image.url || null
    const attachmentKey = p.image.attachment_key || p.image.attachmentKey || null
    return { ...p, image: url ? { url, attachmentKey } : null }
  }
  if (typeof p.image === 'string') {
    return { ...p, image: { url: p.image, attachmentKey: null } }
  }
  return { ...p, image: null }
}
export function enrichProductsWithImages(list) {
  return Array.isArray(list) ? list.map(enrichProductWithImage) : []
}
