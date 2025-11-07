import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    shipping: null
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    total: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      const shippingCost = state.shipping?.value || 0
      return subtotal + shippingCost
    }
  },

  actions: {
    addToCart(product, quantity = 1) {
      const name = product.name || product.title || 'Produto'
      const normalized = {
        id: product.id,
        name,
        title: name,
        price: Number(product.price) || 0,
        image: product.image?.url || product.image || '',
      }

      const existingItem = this.items.find(item => item.id === normalized.id)

      if (existingItem) {
        existingItem.quantity += quantity
        if (existingItem.quantity <= 0) {
          this.removeFromCart(normalized.id)
        }
      } else {
        if (quantity > 0) {
          this.items.push({
            ...normalized,
            quantity: quantity
          })
        }
      }

      this.saveToStorage()
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveToStorage()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = Number(quantity) || 1
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

    setShipping(shippingData) {
      this.shipping = shippingData
      this.saveToStorage()
    },

    saveToStorage() {
      localStorage.setItem('cart', JSON.stringify({
        items: this.items,
        shipping: this.shipping
      }))
    },

    loadFromStorage() {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          this.items = (data.items || []).map(it => {
            const name = it.name || it.title || 'Produto'
            return {
              id: it.id,
              name,
              title: name,
              price: Number(it.price) || 0,
              image: it.image?.url || it.image || '',
              quantity: Number(it.quantity) || 1,
            }
          })
          this.shipping = data.shipping || null
        } catch (e) {
          console.error('Erro ao carregar carrinho:', e)
        }
      }
    }
  }
})
