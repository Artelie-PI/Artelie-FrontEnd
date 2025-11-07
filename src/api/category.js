import apiClient from '@/axios'
import { enrichProductsWithImages } from '@/utils/imageMapping'

const unwrap = (data) => (Array.isArray(data) ? data : (data?.results || []))

export async function fetchCategories() {
  const { data } = await apiClient.get('/category/')
  return unwrap(data)
}

export async function findCategoryById(id) {
  const { data } = await apiClient.get(`/category/${id}/`)
  return data || null
}

export async function fetchProductsByCategory(filter) {
  const { data } = await apiClient.get('/products/')
  const all = unwrap(data)
  const targetId = Number(typeof filter === 'object' ? filter?.id : filter)
  const targetSlug = String((typeof filter === 'object' ? filter?.slug : filter) || '')
    .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')

  const filtered = Array.isArray(all) ? all.filter(p => {
    const catObj = p?.category
    const pid = (catObj && catObj.id) ?? p?.category_id ?? (typeof catObj === 'number' ? catObj : null)
    if (pid != null && !Number.isNaN(targetId) && Number(pid) === targetId) return true

    const base = (catObj && (catObj.slug || catObj.name)) || (typeof catObj === 'string' ? catObj : '')
    if (base) {
      const norm = String(base).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')
      if (targetSlug && norm === targetSlug) return true
    }
    return false
  }) : []
  return enrichProductsWithImages(filtered)
}
