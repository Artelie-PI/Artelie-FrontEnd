// src/stores/products.js
import { defineStore } from 'pinia'
import { fetchProductsByCategory } from '@/api/products'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  actions: {
    async loadByCategory(slug) {
      this.loading = true
      this.error = null
      try {
        this.items = await fetchProductsByCategory(slug)
      } catch (err) {
        this.error = 'Erro ao carregar produtos'
      } finally {
        this.loading = false
      }
    },
  },
})
