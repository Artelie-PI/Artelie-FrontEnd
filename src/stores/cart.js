// src/stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    shipping: null // Adiciona informações de frete
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    total: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      const shippingCost = state.shipping?.value || 0
      return subtotal + shippingCost
    }
  },

  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
        
        // Remove se quantidade <= 0
        if (existingItem.quantity <= 0) {
          this.removeFromCart(product.id)
        }
      } else {
        if (quantity > 0) {
          this.items.push({
            ...product,
            quantity: quantity
          })
        }
      }
      
      // Persiste no localStorage
      this.saveToStorage()
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveToStorage()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      
      if (item) {
        item.quantity = quantity
        
        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        }
      }
      
      this.saveToStorage()
    },

    clearCart() {
      this.items = []
      this.shipping = null
      this.saveToStorage()
    },

    // ✅ Novo método para salvar informações de frete
    setShipping(shippingData) {
      this.shipping = shippingData
      this.saveToStorage()
    },

    // Salva no localStorage
    saveToStorage() {
      localStorage.setItem('cart', JSON.stringify({
        items: this.items,
        shipping: this.shipping
      }))
    },

    // Carrega do localStorage
    loadFromStorage() {
      const stored = localStorage.getItem('cart')
      
      if (stored) {
        try {
          const data = JSON.parse(stored)
          this.items = data.items || []
          this.shipping = data.shipping || null
        } catch (e) {
          console.error('Erro ao carregar carrinho:', e)
        }
      }
    }
  }
})
