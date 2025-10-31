import apiClient from '@/axios'

let brandsCache = null;
let brandMapCache = null;

export async function fetchBrands() {
  if (brandsCache) return brandsCache;
  try {
    const { data } = await apiClient.get('/brands/');
    brandsCache = Array.isArray(data) ? data : (data.results || []);
    // Constrói o Map id -> name para uso rápido
    brandMapCache = new Map(brandsCache.map(b => [Number(b.id), String(b.name || '').trim()]));
    return brandsCache;
  } catch (error) {
    console.error('Erro ao buscar brands:', error);
    brandsCache = [];
    brandMapCache = new Map();
    return [];
  }
}

export async function getBrandMap() {
  if (brandMapCache) return brandMapCache;
  await fetchBrands();
  return brandMapCache || new Map();
}

export async function findBrandById(id) {
  const brands = await fetchBrands();
  return brands.find(b => b.id === Number(id)) || null;
}
