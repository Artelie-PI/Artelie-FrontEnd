import apiClient from '@/axios'
import { enrichProductsWithImages } from '@/utils/imageMapping'

let categoriesCache = null;

export async function fetchCategories() {
  if (categoriesCache) return categoriesCache;
  
  try {
    const { data } = await apiClient.get('/category/')
    categoriesCache = Array.isArray(data) ? data : (data.results || [])
    return categoriesCache
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

export async function findCategoryById(id) {
  const categories = await fetchCategories();
  return categories.find(c => c.id === Number(id)) || null;
}

export async function fetchProductsByCategory(categoryId) {
  try {
    const { data } = await apiClient.get('/products/')
    const allProducts = Array.isArray(data) ? data : (data.results || [])
    
    const filtered = allProducts.filter(product => {
      const productCategoryId = product.category?.id || product.category_id || product.category;
      return productCategoryId === Number(categoryId);
    });
    
    return enrichProductsWithImages(filtered)
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria ${categoryId}:`, error)
    return []
  }
}
