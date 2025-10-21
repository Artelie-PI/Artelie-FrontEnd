<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productsStore = useProductsStore()
const showFilterMenu = ref(false)

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

    <div class="search-filter-wrapper">
      <!-- Botão de filtro -->
      <button class="filter-button" @click="openFilterMenu">
        FILTRAR PRODUTOS
        <img class="imageFilter" src="@/assets/images/ConfigIcon.png" alt="" height="20px">
      </button>

      <!-- Painel lateral de filtros -->
      <transition name="slide-fade">
        <div v-if="showFilterMenu" class="filter-menu-overlay" @click.self="closeFilterMenu">
          <aside class="filter-menu">
            <button class="close-btn" @click="closeFilterMenu">×</button>
            <h2 class="filter-title">FILTRAR</h2>

            <div class="filter-section">
              <label>Ordenar</label>
              <select>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Novidades</option>
                <option>Maior Preço</option>
                <option>Menor Preço</option>
              </select>
            </div>

            <div class="filter-section">
              <label>Linha do Material</label>
              <select>
                <option>Nome 1</option>
                <option>Nome 2</option>
                <option>Nome 3</option>
              </select>
            </div>

            <div class="filter-section">
              <label>Preço</label>
              <div class="price-inputs">
                <input type="number" placeholder="De: R$" />
                <span class="price-separator">para</span>
                <input type="number" placeholder="R$" />
              </div>
            </div>

            <div class="filter-section">
              <label>Marca</label>
              <div class="checkbox-group">
                <label><input type="checkbox" /> Nome 1</label>
                <label><input type="checkbox" /> Nome 2</label>
                <label><input type="checkbox" /> Nome 3</label>
                <label><input type="checkbox" /> Nome 4</label>
              </div>
            </div>

            <div class="filter-buttons">
              <button class="clear-btn">LIMPAR</button>
              <button class="apply-btn">APLICAR</button>
            </div>
          </aside>
        </div>
      </transition>

      <!-- Campo de pesquisa -->
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
  gap: 8px;
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

/* === Painel lateral === */
.filter-menu-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.filter-menu {
  background: #fff;
  width: 360px;
  height: 100vh;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  padding: 2rem 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.filter-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.filter-section select,
.filter-section input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-separator {
  font-size: 0.9rem;
  color: #555;
}

.checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem 1rem;
}

.checkbox-group label {
  font-size: 0.95rem;
}

.filter-buttons {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
}

.clear-btn,
.apply-btn {
  flex: 1;
  padding: 0.7rem 0;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.clear-btn {
  background: #f3f3f3;
  border: 1px solid #000787;
  color: #000787;
}

.clear-btn:hover {
  background: #e0e0e0;
}

.apply-btn {
  background: #000787;
  color: #fff;
}

.apply-btn:hover {
  background: #333;
}

/* === Animação === */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 600px) {
  .filter-menu {
    width: 90%;
  }

  .search-container {
    max-width: 70%;
    margin-left: 15px;
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
