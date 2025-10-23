<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

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

    <!-- Botão de filtro à esquerda da barra de pesquisa -->
    <div class="search-filter-wrapper">
      <button class="filter-button">FILTRAR PRODUTOS <img class="imageFilter" src="@/assets/images/ConfigIcon.png" alt="" height="20px"></button>


      <div class="search-container">
        <img src="@/assets/images/Search.png" alt="Buscar" class="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar produto..."
          class="search-bar"
        />
      </div>
    </div>

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
.search-container {
  position: relative;
  max-width: 400px;
  width: 100%;
}
.search-bar {
  padding: 0.5rem 0.5rem 0.5rem 2.5rem; /* espaço para a lupa à esquerda */
  width: 100%;
  font-size: 1rem;
  border: 1px solid #000000;
  box-sizing: border-box;
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

.search-filter-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  margin-bottom: 1rem;
  padding: 0 1rem;
  flex-wrap: wrap;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 8px; /* espaço entre texto e ícone */
  padding: 0.5rem 1rem;
  font-size: 20px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;
  transition: background-color 0.2s ease;
  font-family: Poppins, sans-serif;
  font-weight: bold;
}
.filter-button:hover {
  background-color: #333;
}

.imageFilter {
  width: 15px;
  height: 15px;
}

@media (max-width: 600px) {
  .search-container {
    max-width: 70%;
    margin-left: 15px;
  }
  .search-bar {
    font-size: 0.95rem;
    padding: 0.5rem 0.5rem 0.5rem 2.2rem;
  }
  .search-icon {
    width: 18px;
    left: 0.5rem;
  }
    .search-filter-wrapper {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .filter-button {
    width: 100%;
  }
}
</style>
