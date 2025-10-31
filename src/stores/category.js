// src/stores/categories.js
import { defineStore } from 'pinia'
import { fetchCategories } from '@/api/products'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  getters: {
    getCategoryBySlug: (state) => (slug) => {
      return state.items.find(cat => cat.slug === slug)
    },
  },

  actions: {
    async loadCategories() {
      // Evita carregar novamente se já tiver dados
      if (this.items.length > 0) return

      this.loading = true
      this.error = null
      try {
        this.items = await fetchCategories()
      } catch (err) {
        this.error = 'Erro ao carregar categorias'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
})