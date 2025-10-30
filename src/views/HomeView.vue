<script setup>
import { ref, onMounted } from 'vue';
import CarouselMain from '@/components/CarouselMain.vue';
import CardProducts from '@/components/CardProducts.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { fetchFeaturedProducts } from '@/api/products';
import { formatProduct } from '@/utils/productHelper';

const featured = ref([]);
const loading = ref(true);
const error = ref(null);

async function loadProducts() {
  try {
    loading.value = true;
    error.value = null;
    const response = await fetchFeaturedProducts();
    const products = Array.isArray(response) ? response : (response?.results || []);
    featured.value = products.map(formatProduct);
  } catch (err) {
    console.error('Erro ao carregar produtos em destaque:', err);
    if (err.message?.includes('MaxClients') || err.response?.status === 500) {
      error.value = '⚠️ Servidor temporariamente indisponível. Tente novamente em alguns segundos.';
    } else {
      error.value = 'Erro ao carregar produtos. Verifique sua conexão.';
    }
  } finally {
    loading.value = false;
  }
}

onMounted(loadProducts);
</script>

<template>
  <main class="home-main">
    <h1 class="visually-hidden">Página Inicial</h1>

    <!-- Carrossel principal -->
    <LoadingSpinner v-if="loading" size="large" />
    <CarouselMain v-else></CarouselMain>

    <p class="home-subtitle">Bem-vindo ao Arteliê - A plataforma onde você encontra os melhores produtos para seus
      projetos.</p>

    <div class="section-header">
      <h2 class="section-title">Produtos em Destaque</h2>
      <div class="section-rule" aria-hidden="true"></div>
    </div>

    <LoadingSpinner v-if="loading" size="large" />
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="loadProducts" class="retry-button">🔄 Tentar Novamente</button>
    </div>
    <CardProducts v-else :products="featured.slice(0, 8)" />
  </main>
</template>

<style scoped>
.home-main {
  padding: 2rem 0 2rem;
  text-align: center;
}

.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.home-subtitle {
  margin: 8px 16px 8px;
  color: #4b5563;
  font-size: 0.95rem;
}

.section-header {
  max-width: 1120px;
  margin: 24px auto 20px;
  text-align: left;
  padding: 0 16px;
}

.section-title {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.3;
  padding-bottom: 3px;
}

.section-rule {
  height: 1px;
  background: #000;
  width: 100%;
}

.error-state {
  padding: 2rem;
  text-align: center;
  color: #dc2626;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-button:hover {
  background: #2980b9;
}
</style>
