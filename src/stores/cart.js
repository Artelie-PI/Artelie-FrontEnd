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
      const item = this.items.find((p) => p.id === product.id);
      if (item) {
        item.quantity += quantity;
      } else {
        this.items.push({ ...product, quantity });
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter((p) => p.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});
