<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productsStore = useProductsStore()
const showFilterMenu = ref(false)

const activeFilters = ref([])

const filterOptions = [
  'A-Z',
  'Z-A',
  'Novidades',
  'Maior preço',
  'Menor preço'
]

function toggleFilter(option) {
  const index = activeFilters.value.indexOf(option)
  if (index >= 0) {
    activeFilters.value.splice(index, 1) // desmarca
  } else {
    activeFilters.value.push(option) // marca
  }

  // Aqui você pode aplicar os filtros no store se quiser
  // productsStore.applyFilters(activeFilters.value)
}

onMounted(() => {
  productsStore.loadByCategory(route.params.slug)
})

watch(
  () => route.params.slug,
  (newSlug) => {
    productsStore.loadByCategory(newSlug)
  }
)

function openFilterMenu() {
  showFilterMenu.value = true
}
function closeFilterMenu() {
  showFilterMenu.value = false
}
</script>


<template>
  <main>
    <h1>Categoria: {{ route.params.slug }}</h1>

    <!-- Botão de filtro à esquerda da barra de pesquisa -->
    <div class="search-filter-wrapper">
      <button class="filter-button" @click="openFilterMenu">
        FILTRAR PRODUTOS
        <img class="imageFilter" src="@/assets/images/ConfigIcon.png" alt="" height="20px">
      </button>

      <!-- ...existing code... -->
      <div v-if="showFilterMenu" class="filter-menu-overlay" @click.self="closeFilterMenu">
        <aside class="filter-menu">
          <button class="close-btn" @click="closeFilterMenu">×</button>
          <h3>Ordenar por</h3>
          <div class="filters">
          <ul>
  <li v-for="option in filterOptions" :key="option">
    <button
      :class="{ 'active-filter': activeFilters.includes(option) }"
      @click="toggleFilter(option)"
    >
      {{ option }}
    </button>
  </li>
</ul>

          </div>
        </aside>
      </div>
      <!-- ...existing code... -->


      <div class="search-container">
        <img src="@/assets/images/Search.png" alt="Buscar" class="search-icon" />
        <input type="text" placeholder="Pesquisar produto..." class="search-bar" />
      </div>
    </div>

    <div v-if="productsStore.loading">Carregando...</div>
    <div v-else-if="productsStore.error">{{ productsStore.error }}</div>

    <div v-else class="products-grid">
      <ProductCard v-for="product in productsStore.items" :key="product.id" :product="product" />
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
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  /* espaço para a lupa à esquerda */
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

.active-filter {
  background-color: #000 !important;
  color: white;
  font-weight: bold;
  border: 1px solid #000;
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
  gap: 8px;
  /* espaço entre texto e ícone */
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

.filter-menu-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
  display: flex;
}

.filter-menu {
  background: #fff;
  width: 280px;
  max-width: 80vw;
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0,0,0,0.15);
  padding: 2rem 1rem 1rem 1rem;
  position: relative;
  animation: slideIn 0.3s;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.filter-menu h3 {
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.filter-menu ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.filter-menu li {
  margin-bottom: 1rem;
}

.filter-menu button {
  padding: 0.5rem;
  font-size: 1rem;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.filter-menu button:hover {
  background: #e0e0e0;
}

.filters li {
  margin-top: 1rem;
  width: 100%;
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
