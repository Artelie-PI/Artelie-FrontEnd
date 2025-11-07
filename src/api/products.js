import apiClient from '@/axios'
import { enrichProductsWithImages, enrichProductWithImage } from '@/utils/imageMapping'
import { formatProduct } from '@/utils/productHelper'
import { fetchProductsByCategory as _fetchByCat, fetchCategories as _fetchCats } from '@/api/category'

const unwrap = (data) => (Array.isArray(data) ? data : (data?.results || []))

async function fetchWithRetry(url, retries = 2, delay = 1200) {
  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await apiClient.get(url)
      return data
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

export async function fetchAllProducts() {
  const data = await fetchWithRetry('/products/')
  const items = unwrap(data)
  return enrichProductsWithImages(items).map(formatProduct)
}
export const fetchProductsByCategory = _fetchByCat

export async function fetchProductById(id) {
  const data = await fetchWithRetry(`/products/${id}/`)
  return formatProduct(enrichProductWithImage(data))
}

export async function fetchFeaturedProducts() {
  const primary = await fetchWithRetry('/products/?featured=true').catch(() => null)
  const prim = unwrap(primary || [])
  if (prim.length) return enrichProductsWithImages(prim).map(formatProduct)

  const fallback = await fetchWithRetry('/products/')
  return enrichProductsWithImages(unwrap(fallback)).map(formatProduct)
}

export async function fetchRelatedProducts(productId) {
  const data = await fetchWithRetry(`/products/${productId}/related/`).catch(() => null)
  return enrichProductsWithImages(unwrap(data || [])).map(formatProduct)
}

export async function fetchCategories() {
  return _fetchCats()
}
