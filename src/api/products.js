import apiClient from '@/axios'
import { enrichProductsWithImages, enrichProductWithImage } from '@/utils/imageMapping'

async function fetchWithRetry(url, retries = 2, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await apiClient.get(url)
      return data
    } catch (error) {
      if (i === retries - 1) throw error
      console.warn(`Tentativa ${i + 1} falhou, tentando novamente em ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Buscar todos os produtos
export async function fetchAllProducts() {
  const data = await fetchWithRetry('/products/')
  const products = Array.isArray(data) ? data : (data.results || [])
  return enrichProductsWithImages(products)
}

// Buscar produtos por categoria
export async function fetchProductsByCategory(slug) {
  try {
    const data = await fetchWithRetry(`/products/?category__slug=${slug}`)
    let results = Array.isArray(data) ? data : (data.results || [])

    if (results.length === 0) {
      const data2 = await fetchWithRetry(`/products/?category__name=${slug}`)
      results = Array.isArray(data2) ? data2 : (data2.results || [])
    }

    if (results.length === 0) {
      const data3 = await fetchWithRetry(`/products/?category=${slug}`)
      results = Array.isArray(data3) ? data3 : (data3.results || [])
    }

    return enrichProductsWithImages(results)
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error)
    return []
  }
}

// Buscar um produto específico por ID
export async function fetchProductById(id) {
  const data = await fetchWithRetry(`/products/${id}/`)
  return enrichProductWithImage(data)
}

// Buscar produtos em destaque
export async function fetchFeaturedProducts() {
  try {
    const data = await fetchWithRetry('/products/?featured=true')
    const products = Array.isArray(data) ? data : (data.results || [])
    return enrichProductsWithImages(products)
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error)
    try {
      const data = await fetchWithRetry('/products/')
      const products = Array.isArray(data) ? data : (data.results || [])
      return enrichProductsWithImages(products)
    } catch (fallbackError) {
      console.error('Erro no fallback:', fallbackError)
      return []
    }
  }
}

// Buscar produtos relacionados
export async function fetchRelatedProducts(productId) {
  try {
    const data = await fetchWithRetry(`/products/${productId}/related/`)
    const products = Array.isArray(data) ? data : (data.results || [])
    return enrichProductsWithImages(products)
  } catch (error) {
    console.error('Erro ao buscar produtos relacionados:', error)
    return []
  }
}

// Buscar categorias
export async function fetchCategories() {
  try {
    const data = await fetchWithRetry('/category/')
    return Array.isArray(data) ? data : (data.results || [])
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}
