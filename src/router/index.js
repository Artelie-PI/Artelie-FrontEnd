import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProductLayout from '@/layouts/ProductLayout.vue'
import ProductView from '@/views/ProductView.vue'
import RelatedProduct from '@/components/RelatedProduct.vue'
import CartView from '@/views/CartView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ContactView from '@/views/ContactView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'

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
        { path: 'contact', name: 'contact', component: ContactView },
        { path: 'cart', name: 'cart', component: CartView }, // Mudou de /shop para /cart
        // Redirect antigo /shop para /cart
        { path: 'shop', redirect: '/cart' }
      ],
    },
    {
      path: '/produto',
      component: ProductLayout,
      children: [
        { 
          path: ':id', 
          name: 'product', 
          component: ProductView,
          props: true 
        },
        { 
          path: ':id/relacionados', 
          name: 'related-products', 
          component: RelatedProduct,
          props: true 
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/verify-email/:token',
      name: 'verify-email',
      component: VerifyEmailView,
    },
    // Redirect para home se rota não encontrada
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

export default router