import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterEmailView from '../views/RegisterEmailView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterEmailView,
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: RegisterUserView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    }
  ],
})

export default router
