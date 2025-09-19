// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProductLayout from '@/layouts/ProductLayout.vue'  // <-- aqui
import ProductView from '@/views/ProductView.vue'
import RelatedProduct from '@/components/RelatedProduct.vue'
import CategoryView from '@/views/CategoryView.vue' // import direto; você pode lazy-load se preferir
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: [
       { path: '', name: 'home', component: HomeView },
       { path: 'category/:slug', name: 'category', component: CategoryView, props: true },
      ],
    },
    {
      path: '/produto',
      name: 'product-layout',
      component: ProductLayout,  // <-- usa o layout, não o ProductView direto
      children: [
        {
          path: '/produto', // exemplo dinâmico: produto/123
          name: 'product',
          component: ProductView,
        },
        {
          path: 'relacionados',
          name: 'related-products',
          component: RelatedProduct,
        },
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
