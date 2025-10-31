import apiClient from '@/axios'

let brandsCache = null;

export async function fetchBrands() {
  if (brandsCache) return brandsCache;
  
  try {
    const { data } = await apiClient.get('/brands/')
    brandsCache = Array.isArray(data) ? data : (data.results || [])
    return brandsCache
  } catch (error) {
    console.error('Erro ao buscar brands:', error)
    return []
  }
}

export async function findBrandById(id) {
  const brands = await fetchBrands();
  return brands.find(b => b.id === Number(id)) || null;
}
