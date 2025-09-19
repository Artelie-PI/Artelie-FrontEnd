<!-- src/views/CategoryView.vue -->
<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productsStore = useProductsStore()

const slug = () => route.params.slug

async function load() {
  try {
    await productsStore.loadByCategory(slug())
  } catch (e) {
    console.error(e)
  }
}

onMounted(load)
watch(() => route.params.slug, () => load())
</script>

<template>
  <section class="category-page">
    <h2 class="category-title">{{ route.params.slug }}</h2>

    <div v-if="productsStore.loading" class="loading">Carregando produtos...</div>
    <div v-else-if="productsStore.error" class="error">{{ productsStore.error }}</div>
    <div v-else-if="!productsStore.hasItems" class="empty">Nenhum produto encontrado nesta categoria.</div>

    <div v-else class="grid">
      <ProductCard v-for="p in productsStore.items" :key="p.id || p.pk || p.slug || p.name" :product="p" />
    </div>
  </section>
</template>

<style scoped>
.category-page { padding: 2rem; }
.category-title { text-transform: capitalize; margin-bottom: 1rem; font-size: 2rem; }
.loading, .error, .empty { padding: 1rem; font-size: 1.1rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
