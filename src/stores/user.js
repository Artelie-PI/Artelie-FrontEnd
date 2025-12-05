import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'
import apiClient from '@/axios'
import { useCartStore } from '@/stores/cart'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    displayName: (state) => state.user?.username || state.user?.email || 'Usuário',
  },

  actions: {
    async login(email, password) {
      const data = await apiLogin(email, password)
      this.accessToken = data.access
      this.refreshToken = data.refresh
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      try {
        const { data: userData } = await apiClient.get('/api/users/me/')
        this.user = userData
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch {
        this.user = { email }
        localStorage.setItem('user', JSON.stringify(this.user))
      }

      const cartStore = useCartStore()
      cartStore.loadFromStorage()
    },

    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      apiLogout()
      localStorage.removeItem('user')

      const cartStore = useCartStore()
      cartStore.clearCart()
    },

    async loadUser() {
      if (!this.user) {
        const raw = localStorage.getItem('user')
        if (raw) {
          try { this.user = JSON.parse(raw) } catch {}
        }
      }

      if (this.accessToken && !this.user) {
        try {
          const { data } = await apiClient.get('/api/users/me/')
          this.user = data
          localStorage.setItem('user', JSON.stringify(this.user))
        } catch (error) {
          this.logout()
        }
      }
    }
  },
})
