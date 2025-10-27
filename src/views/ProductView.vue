<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { fetchProductById } from "@/api/products";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const cartStore = useCartStore();
const rating = ref(0);
const quantity = ref(1);
const product = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedImage = ref(null);

function setRating(value) { rating.value = value; }
function increaseQuantity() { quantity.value++; }
function decreaseQuantity() { if (quantity.value > 1) quantity.value--; }

const productImages = computed(() => {
  if (!product.value) return [];
  const images = [];
  if (product.value.image) images.push(product.value.image);
  if (product.value.images) {
    product.value.images.forEach(img => { if (img.image) images.push(img.image); });
  }
  return images;
});

const currentProduct = computed(() => {
  if (!product.value) return null;
  return {
    id: product.value.id,
    title: product.value.name,
    price: Number(product.value.price),
    image: selectedImage.value || product.value.image || '',
  };
});

onMounted(async () => {
  try {
    loading.value = true;
    const productId = route.params.id;
    product.value = await fetchProductById(productId);
    selectedImage.value = productImages.value[0] ?? product.value.image ?? '';
  } catch (err) {
    console.error('Erro ao carregar produto:', err);
    error.value = 'Erro ao carregar produto';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="product-page">
    <LoadingSpinner v-if="loading" size="large" message="Carregando produto..." />

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="product" class="product-container">
      <div class="gallery">
        <img :src="selectedImage || '/placeholder.png'" :alt="product.name" class="main-image" />
        <div class="thumbnails" v-if="productImages.length > 1">
          <img v-for="(img, i) in productImages" :key="i" :src="img" @click="selectedImage = img" class="thumb"
            :class="{ active: selectedImage === img }" />
        </div>
      </div>

      <div class="details">
        <h1 class="title">{{ product.name }}</h1>
        <p class="brand">
          <span class="category">{{ product.category?.name || 'PRODUTOS' }}</span> ·
          <span class="brand-name">{{ product.brand || 'Artelie' }}</span>
        </p>

        <div class="rating">
          <span v-for="n in 5" :key="n" class="star" :class="{ full: n <= rating }" @click="setRating(n)">★</span>
          <span class="count">({{ rating }} de 5)</span>
        </div>

        <p class="price">R$ {{ Number(product.price).toFixed(2).replace('.', ',') }}</p>
        <p class="installments">Até 4x de R$ {{ (Number(product.price) / 4).toFixed(2).replace('.', ',') }} sem juros
        </p>

        <div class="quantity">
          <label class="quantity-label">Quantidade</label>
          <div class="quantity-box">
            <button class="quantity-btn" @click="decreaseQuantity">-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button class="quantity-btn" @click="increaseQuantity">+</button>
          </div>
        </div>

        <button class="add-btn" @click="cartStore.addToCart(currentProduct, quantity)">
          Adicionar a Sacola
        </button>
      </div>
    </div>

    <div v-if="product" class="info">
      <h2>Informações do Produto</h2>
      <p>{{ product.description || 'Descrição não disponível.' }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  font-family: "Inter", sans-serif;
  padding: 1.5rem;
  max-width: 1200px;
  margin: auto;
}

.error-state {
  padding: 3rem;
  text-align: center;
  color: #dc2626;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-image {
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.thumb {
  width: 70px;
  height: 70px;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  cursor: pointer;
  object-fit: cover;
}

.thumb.active {
  border: 2px solid black;
}

.details .title {
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.3;
}

.brand {
  margin: 0.3rem 0 0.8rem;
}

.category {
  color: #666;
  font-size: 0.9rem;
}

.brand-name {
  color: #2563eb;
  font-weight: 500;
}

.rating {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
}

.star {
  color: #ccc;
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s;
}

.star.full {
  color: #f5c518;
}

.star:hover {
  color: #f5c518;
}

.count {
  font-size: 0.85rem;
  color: #666;
  margin-left: 0.4rem;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1rem;
}

.installments {
  font-size: 0.85rem;
  color: #666;
}

.quantity {
  margin-top: 1.5rem;
}

.quantity-label {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.quantity-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  overflow: hidden;
  width: fit-content;
  background: #fff;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}

.quantity-btn:hover {
  background: #f3f3f3;
}

.quantity-value {
  width: 40px;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  user-select: none;
}

.add-btn {
  margin-top: 1.5rem;
  width: 100%;
  background: black;
  color: white;
  padding: 0.9rem;
  border-radius: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #333;
}

.info {
  background: #fff;
  margin-top: 2rem;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.info h2 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }
}
</style>
