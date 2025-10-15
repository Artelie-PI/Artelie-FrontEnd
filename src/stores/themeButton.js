import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeButton', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      document.body.classList.toggle('dark-theme', this.isDark)
    }
  }
})