// src/stores/products.js
import { defineStore } from 'pinia'
import { 
  fetchAllProducts, 
  fetchProductsByCategory, 
  fetchProductById,
  fetchFeaturedProducts,
  fetchRelatedProducts 
} from '@/api/products'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    currentProduct: null,
    featuredProducts: [],
    relatedProducts: [],
    loading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.items.find(product => product.id === id)
    },
  },

  actions: {
    async loadAllProducts() {
      this.loading = true
      this.error = null
      try {
        this.items = await fetchAllProducts()
      } catch (err) {
        this.error = 'Erro ao carregar produtos'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async loadByCategory(slug) {
      this.loading = true
      this.error = null
      try {
        this.items = await fetchProductsByCategory(slug)
      } catch (err) {
        this.error = 'Erro ao carregar produtos'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async loadProductById(id) {
      this.loading = true
      this.error = null
      try {
        this.currentProduct = await fetchProductById(id)
      } catch (err) {
        this.error = 'Erro ao carregar produto'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async loadFeaturedProducts() {
      this.loading = true
      this.error = null
      try {
        this.featuredProducts = await fetchFeaturedProducts()
      } catch (err) {
        this.error = 'Erro ao carregar produtos em destaque'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async loadRelatedProducts(productId) {
      this.loading = true
      this.error = null
      try {
        this.relatedProducts = await fetchRelatedProducts(productId)
      } catch (err) {
        this.error = 'Erro ao carregar produtos relacionados'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
})