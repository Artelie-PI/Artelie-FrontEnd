// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CartView from '@/views/CartView.vue'
import CategoryView from '@/views/CategoryView.vue' // import direto; você pode lazy-load se preferir

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/shop',
          name: 'cart',
          component: CartView,
        },
        { path: '', name: 'home', component: HomeView },
        { path: 'category/:slug', name: 'category', component: CategoryView, props: true },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})

export default router
