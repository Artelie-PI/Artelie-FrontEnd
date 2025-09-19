import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CategoryView from '../views/CategoryView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'category/:slug', name: 'category', component: CategoryView },
      ],
    },
    { path: '/login', name: 'login', component: LoginView },
  ],
})

export default router
