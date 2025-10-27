<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { fetchRelatedProducts } from "@/api/products";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const cartStore = useCartStore();
const relatedProducts = ref([]);
const loading = ref(true);
const error = ref(null);

function addToCart(product) {
  cartStore.addToCart({
    id: product.id,
    title: product.name,
    price: Number(product.price), // garantir number no store
    image: product.image,
  });
}

onMounted(async () => {
  try {
    loading.value = true;
    const productId = route.params.id;
    let products = await fetchRelatedProducts(productId);

    // fallback – por enquanto vazio (implementar por categoria depois)
    if (!Array.isArray(products) || products.length === 0) {
      products = [];
    }

    relatedProducts.value = products.map(product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || product.images?.[0]?.image,
    }));
  } catch (err) {
    console.error('Erro ao carregar produtos relacionados:', err);
    error.value = null; // não exibir erro, só não mostra cards
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="related-wrapper">
    <div class="related">
      <h2>Explorar outros itens semelhantes</h2>

      <LoadingSpinner v-if="loading" size="medium" message="Carregando produtos relacionados..." />

      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="relatedProducts.length === 0" class="empty-state">
        <p>Nenhum produto relacionado encontrado.</p>
      </div>

      <div v-else class="related-grid">
        <div v-for="related in relatedProducts" :key="related.id" class="related-card">
          <img :src="related.image || '/placeholder.png'" :alt="related.name" class="related-img" />
          <h3 class="related-name">{{ related.name }}</h3>
          <p class="related-price">R$ {{ related.price.toFixed(2).replace('.', ',') }}</p>
          <p class="related-installments">
            Até 4x de R$ {{ (related.price / 4).toFixed(2).replace('.', ',') }} sem juros
          </p>
          <button class="add-btn" @click="addToCart(related)">Adicionar à Sacola</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.related-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.related h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.4rem;
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

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.related-card {
  background: #fff;
  padding: 1rem;
  text-align: center;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border 0.2s ease, transform 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  border: 1px solid #999;
}

.related-img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: contain;
  background: #fff;
  margin-bottom: 0.8rem;
}

.related-name {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0.5rem 0;
  color: #111;
  line-height: 1.3;
  min-height: 45px;
}

.related-price {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.3rem 0 0.2rem;
}

.related-installments {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 1rem;
}

.add-btn {
  background: #000;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.7rem;
  border-radius: 0;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background: #333;
}
</style>
