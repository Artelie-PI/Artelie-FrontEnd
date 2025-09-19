<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productsStore = useProductsStore()

onMounted(() => {
  productsStore.loadByCategory(route.params.slug)
})

watch(
  () => route.params.slug,
  (newSlug) => {
    productsStore.loadByCategory(newSlug)
  }
)
</script>

<template>
  <main>
    <h1>Categoria: {{ route.params.slug }}</h1>

    <div v-if="productsStore.loading">Carregando...</div>
    <div v-else-if="productsStore.error">{{ productsStore.error }}</div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in productsStore.items"
        :key="product.id"
        :product="product"
      />
    </div>
  </main>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>
