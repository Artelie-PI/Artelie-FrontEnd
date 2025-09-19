// src/stores/user.js
import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    displayName: (state) => state.user?.username || 'Usuário',
  },

  actions: {
    async login(username, password) {
      const data = await apiLogin(username, password)
      this.accessToken = data.access
      this.refreshToken = data.refresh
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      this.user = { username } // simulação, depois pode buscar no backend
    },

    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      apiLogout()
    },
  },
})
