// src/api/products.js
import apiClient from '@/axios'

export async function fetchProductsByCategory(slug) {
  const { data } = await apiClient.get(`/products/?category=${slug}`)
  return data
}
