<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProductsByCategory } from '@/api/products'
import CardProducts from '@/components/CardProducts.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const products = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')

async function loadProducts() {
  loading.value = true
  error.value = null
  try {
    const data = await fetchProductsByCategory(route.params.slug)
    products.value = (data || []).map(product => ({
      id: product.id,
      title: product.name,
      image: product.image || product.images?.[0]?.image,
      price: Number(product.price),
      installmentText: `Até 4x de R$ ${(Number(product.price) / 4).toFixed(2).replace('.', ',')} sem juros`,
    }))
  } catch (err) {
    console.error('Erro ao carregar produtos:', err)
    error.value = 'Erro ao carregar produtos'
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)
watch(() => route.params.slug, loadProducts)
</script>

<template>
  <main>
    <h1>Categoria: {{ route.params.slug }}</h1>

    <div class="search-filter-wrapper">
      <button class="filter-button">
        FILTRAR PRODUTOS
        <img class="imageFilter" src="@/assets/images/ConfigIcon.png" alt="" height="20px">
      </button>

      <div class="search-container">
        <img src="@/assets/images/Search.png" alt="Buscar" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Pesquisar produto..." class="search-bar" />
      </div>
    </div>

    <LoadingSpinner v-if="loading" size="large" />
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else-if="products.length === 0" class="empty-state">Nenhum produto encontrado nesta categoria.</div>

    <CardProducts v-else :products="products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))" />
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.error-state,
.empty-state {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.error-state {
  color: #dc2626;
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
