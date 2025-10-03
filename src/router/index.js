import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProductLayout from '@/layouts/ProductLayout.vue'
import ProductView from '@/views/ProductView.vue'
import RelatedProduct from '@/components/RelatedProduct.vue'
import CartView from '@/views/CartView.vue'
import CategoryView from '@/views/CategoryView.vue' // import direto; você pode lazy-load se preferir
import ContactView from '@/views/ContactView.vue'

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
       { path: '/shop', name: 'cart', component: CartView }
      ],
    },
    {
      path: '/produto',
      name: 'product-layout',
      component: ProductLayout,
      children: [
        { path: '/produto', name: 'product', component: ProductView },
        { path: 'relacionados', name: 'related-products', component: RelatedProduct },

      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

  ],
})

export default router
