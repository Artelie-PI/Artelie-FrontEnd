import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  
  actions: {
    addToCart(product, quantity = 1) {
      // Garante que o produto tem todas as propriedades necessárias
      const productData = {
        id: product.id,
        title: product.title || product.name,
        price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
        image: product.image,
      };

      const item = this.items.find((p) => p.id === productData.id);
      
      if (item) {
        // Se a quantidade for negativa e o item já existe, diminui
        if (quantity < 0 && item.quantity + quantity > 0) {
          item.quantity += quantity;
        } else if (quantity > 0) {
          item.quantity += quantity;
        }
      } else if (quantity > 0) {
        // Só adiciona novo item se quantity for positiva
        this.items.push({ ...productData, quantity });
      }
    },
    
    removeFromCart(id) {
      this.items = this.items.filter((p) => p.id !== id);
    },
    
    clearCart() {
      this.items = [];
    },

    updateQuantity(id, quantity) {
      const item = this.items.find((p) => p.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (quantity <= 0) {
        this.removeFromCart(id);
      }
    },
  },
});