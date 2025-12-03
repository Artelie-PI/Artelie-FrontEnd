import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

const BASE = '/'

export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'Logo.png'
      ],
      manifest: {
        name: 'ArtelieOnline',
        short_name: 'Artelie',
        description: 'Artelie: venda de produtos para artesanto e arte',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '.',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        id: 'com.artelie.app',
        orientation: 'any',
        launch_handler: { client_mode: ['navigate-existing', 'auto'] }
      },
      
      devOptions: {
        enabled: false
      }
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  preview: {
    port: 4173,
    strictPort: false,
    open: false
  },

  server: {
    port: 5173,
    host: true
  }
})
