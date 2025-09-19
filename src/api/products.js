// src/api/products.js
import apiClient from '@/axios'

export async function fetchProductsByCategory(slug) {
  const attempts = [
    `/api/products/?category=${encodeURIComponent(slug)}`,
    `/api/products/?category__slug=${encodeURIComponent(slug)}`,
    `/api/products/?category_slug=${encodeURIComponent(slug)}`,
    `/api/categories/${encodeURIComponent(slug)}/products/`,
    `/api/categories/${encodeURIComponent(slug)}/`,
  ]

  for (const path of attempts) {
    try {
      const res = await apiClient.get(path)
      if (res && res.status >= 200 && res.status < 300) {
        const payload = res.data
        const items = payload?.results ?? payload

        if (!Array.isArray(items) && payload?.products) {
          return payload.products
        }
        if (Array.isArray(items)) return items
        if (payload && payload.id && payload.products && Array.isArray(payload.products)) {
          return payload.products
        }
        return items || payload
      }
    } catch (e) {
      // tenta próxima URL
    }
  }

  throw new Error('Não foi possível buscar produtos para a categoria no backend. Verifique endpoints no servidor.')
}
