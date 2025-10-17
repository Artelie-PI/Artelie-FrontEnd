<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productsStore = useProductsStore()
const searchTerm = ref('')

onMounted(() => {
  productsStore.loadByCategory(route.params.slug)
})

watch(
  () => route.params.slug,
  (newSlug) => {
    productsStore.loadByCategory(newSlug)
    searchTerm.value = ''
  }
)

const filteredProducts = computed(() => {
  if (!searchTerm.value) return productsStore.items
  return productsStore.items.filter(product =>
    product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>

<template>
  <main>
    <h1>Categoria: {{ route.params.slug }}</h1>
    <div class="search-container">
      <img src="@/assets/images/Search.png" alt="Buscar" class="search-icon" />
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Pesquisar produto..."
        class="search-bar"
      />
    </div>
    <div v-if="productsStore.loading">Carregando...</div>
    <div v-else-if="productsStore.error">{{ productsStore.error }}</div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
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
.search-container {
  position: relative;
  max-width: 400px;
  width: 100%;
  margin-bottom: 1rem;
}
.search-bar {
  padding: 0.5rem 0.5rem 0.5rem 2.5rem; /* padding maior à esquerda */
  width: 100%;
  font-size: 1rem;
  border: 1px solid #000000;
  box-sizing: border-box;
  transition: font-size 0.2s;
}
.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
}

/* Responsividade */
@media (min-width: 600px) {
  .search-bar {
    font-size: 0.95rem;
    padding: 0.5rem 0.5rem 0.5rem 2.2rem;
  }
  .products-grid {
    grid-template-columns: 1fr;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .search-icon {
    width: 18px;
    left: 0.5rem;
  }
}
</style>