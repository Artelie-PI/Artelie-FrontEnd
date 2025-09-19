// src/stores/products.js
import { defineStore } from 'pinia'
import { fetchProductsByCategory } from '@/api/products'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
    lastCategory: null,
  }),
  getters: {
    hasItems: (s) => s.items && s.items.length > 0,
  },
  actions: {
    async loadByCategory(slug, { force = false } = {}) {
      if (!slug) {
        this.items = []
        this.error = 'Categoria inválida'
        return []
      }

      if (!force && this.lastCategory === slug && this.items?.length) {
        return this.items
      }

      this.loading = true
      this.error = null
      try {
        const products = await fetchProductsByCategory(slug)
        this.items = Array.isArray(products) ? products : (products ? [products] : [])
        this.lastCategory = slug
        return this.items
      } catch (err) {
        this.items = []
        this.error = err.message || 'Erro ao carregar produtos'
        throw err
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.items = []
      this.error = null
      this.lastCategory = null
    }
  }
})
