import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Carrega o carrinho do localStorage quando o app iniciar
import { useCartStore } from './stores/cart'
import { useUserStore } from './stores/user'
const cartStore = useCartStore()
const userStore = useUserStore()
userStore.loadUser()
cartStore.loadFromStorage()

app.mount('#app')

