import apiClient from '@/axios';
import { fetchAllPages } from '@/api/paginate';

export async function fetchCategories() {
  const { data } = await apiClient.get('/category/');
  return Array.isArray(data) ? data : (data.results || []);
}

// Mantém a versão antiga, caso precise
export async function fetchProductsByCategory(categoryId, page = 1, pageSize = 20) {
  const { data } = await apiClient.get('/products/', { params: { page, page_size: pageSize } });
  const all = Array.isArray(data) ? data : (data.results || []);
  return all.filter(p => {
    const pid = p.category?.id ?? p.category_id ?? p.category;
    return Number(pid) === Number(categoryId);
  });
}

// NOVA: busca TODAS as páginas e filtra por categoria
export async function fetchProductsByCategoryAll(categoryId) {
  const all = await fetchAllPages('/products/');
  return all.filter(p => {
    const pid = p.category?.id ?? p.category_id ?? p.category;
    return Number(pid) === Number(categoryId);
  });
}
export async function findCategoryById(id) {
  const { data } = await apiClient.get(`/category/${id}/`)
  return data || null
}

