import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'
import apiClient from '@/axios'

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
      } catch {
        this.user = { email }
      }
    },
    
    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      apiLogout()
    },

    async loadUser() {
      if (this.accessToken) {
        try {
          const { data } = await apiClient.get('/api/users/me/')
          this.user = data
        } catch (error) {
          console.error('Erro ao carregar usuário:', error)
          this.logout()
        }
      }
    }
  },
})