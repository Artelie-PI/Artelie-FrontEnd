<script setup>
import { ref, onMounted } from 'vue';
import CardProcucts from '@/components/CardProducts.vue';
import { fetchFeaturedProducts } from '@/api/products';
import { formatProduct } from '@/utils/productHelper';

const featured = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetchFeaturedProducts();
    
    console.log('Resposta da API:', response);
    
    const products = Array.isArray(response) ? response : (response.results || []);
    
    if (products.length === 0) {
      console.warn('Nenhum produto encontrado, a API pode estar sem produtos cadastrados');
    }
    
    featured.value = products.map(formatProduct);
    
  } catch (err) {
    console.error('Erro ao carregar produtos em destaque:', err);
    console.error('Detalhes:', err.response?.data || err.message);
    error.value = 'Erro ao carregar produtos. A API pode estar offline.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main class="home-main">
    <h1 class="visually-hidden">Página Inicial</h1>
    <p class="home-subtitle">Bem-vindo ao Artelie, sua plataforma de gerenciamento de projetos.</p>

    <div class="section-header">
      <h2 class="section-title">Produtos em Destaque</h2>
      <div class="section-rule" aria-hidden="true"></div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Carregando produtos...</p>
      <p class="loading-hint">Se demorar muito, o servidor pode estar iniciando (±30s)</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <CardProcucts v-else :products="featured" />
  </main>
</template>

<style scoped>
.home-main {
  padding: 2rem;
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
  margin: 0 0 8px;
  color: #4b5563;
  font-size: 0.95rem;
}

.section-header {
  max-width: 1120px;
  margin: 24px auto 20px;
  text-align: left;
  padding: 0;
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

.loading-state, .error-state {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.error-state {
  color: #dc2626;
}
</style>