<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { fetchProductById } from "@/api/products";
import { findBrandById } from "@/api/brands";
import { findCategoryById, fetchProductsByCategory } from "@/api/category";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const rating = ref(0);
const quantity = ref(1);
const product = ref(null);
const brand = ref(null);
const category = ref(null);
const relatedProducts = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedImageIndex = ref(0);

function setRating(value) { rating.value = value; }
function increaseQuantity() { quantity.value++; }
function decreaseQuantity() { if (quantity.value > 1) quantity.value--; }

const productImages = computed(() => {
  if (!product.value) return [];
  const images = [];
  if (product.value.image) images.push(product.value.image);
  if (product.value.Images && Array.isArray(product.value.Images)) {
    product.value.Images.forEach(img => { 
      if (img.image) images.push(img.image); 
    });
  }
  return images;
});

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || product.value?.image || '';
});

const hasMultipleImages = computed(() => productImages.value.length > 1);

const brandName = computed(() => brand.value?.name || 'Artelie');
const categoryName = computed(() => category.value?.name?.toUpperCase() || 'PRODUTOS');

const currentProduct = computed(() => {
  if (!product.value) return null;
  return {
    id: product.value.id,
    title: product.value.name,
    price: Number(product.value.price),
    image: selectedImage.value,
  };
});

const similarProducts = computed(() => {
  return relatedProducts.value
    .filter(p => p.id !== product.value?.id)
    .slice(0, 4);
});

function prevImage() {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--;
  }
}

function nextImage() {
  if (selectedImageIndex.value < productImages.value.length - 1) {
    selectedImageIndex.value++;
  }
}

function goToProduct(productId) {
  router.push({ name: 'product', params: { id: productId } });
  nextTick(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  });
}

function addSimilarToCart(similarProduct) {
  cartStore.addToCart({
    id: similarProduct.id,
    title: similarProduct.name,
    price: Number(similarProduct.price),
    image: similarProduct.image
  }, 1);
}

async function loadProduct() {
  try {
    loading.value = true;
    error.value = null;
    const productId = route.params.id;
    
    product.value = await fetchProductById(productId);
    
    if (product.value.brand) {
      brand.value = await findBrandById(product.value.brand);
    }
    
    if (product.value.category) {
      category.value = await findCategoryById(product.value.category);
      relatedProducts.value = await fetchProductsByCategory(product.value.category);
    }
    
    selectedImageIndex.value = 0;
    rating.value = 0;
    quantity.value = 1;
    
    // Scroll após carregar tudo
    await nextTick();
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  } catch (err) {
    console.error('Erro ao carregar produto:', err);
    error.value = 'Erro ao carregar produto';
  } finally {
    loading.value = false;
  }
}

watch(() => route.params.id, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    window.scrollTo(0, 0); // Scroll imediato
    await loadProduct();
  }
});


onMounted(() => {
  loadProduct();
});
</script>

<template>
  <div class="product-page" :key="route.params.id">
    <LoadingSpinner v-if="loading" size="large" message="Carregando produto..." />

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="product" class="product-container">
      <div class="product-gallery">
        <div class="thumbnail-nav" v-if="hasMultipleImages">
          <button class="nav-arrow" @click="prevImage" :disabled="selectedImageIndex === 0">
            <span>&#8249;</span>
          </button>
          
          <div class="thumbnails">
            <img 
              v-for="(img, idx) in productImages" 
              :key="idx" 
              :src="img" 
              :alt="`Imagem ${idx + 1}`"
              class="thumb"
              :class="{ active: idx === selectedImageIndex }"
              @click="selectedImageIndex = idx"
            />
          </div>
          
          <button class="nav-arrow" @click="nextImage" :disabled="selectedImageIndex === productImages.length - 1">
            <span>&#8250;</span>
          </button>
        </div>
        
        <div class="main-image-container">
          <img :src="selectedImage" :alt="product.name" class="main-image" />
        </div>
      </div>

      <div class="product-details">
        <h1 class="product-name">{{ product.name }}</h1>
        
        <p class="product-category">
          {{ categoryName }}<br>
          <span class="product-brand">{{ brandName }}</span>
        </p>

        <div class="product-rating">
          <div class="stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= rating }" @click="setRating(n)">★</span>
          </div>
        </div>

        <div class="color-options" v-if="false">
          <p class="options-label">Outras Cores</p>
          <div class="color-swatches">
            <span class="color-swatch" style="background: #1e40af;"></span>
            <span class="color-swatch" style="background: #3b82f6;"></span>
            <span class="color-swatch" style="background: #60a5fa;"></span>
            <span class="color-swatch" style="background: #93c5fd;"></span>
          </div>
        </div>

        <p class="product-price">R$ {{ Number(product.price).toFixed(2).replace('.', ',') }}</p>
        <p class="product-installments">Até 4x de R$ {{ (Number(product.price) / 4).toFixed(2).replace('.', ',') }} sem juros</p>

        <div class="quantity-selector">
          <label class="quantity-label">Quantidade</label>
          <div class="quantity-controls">
            <button @click="decreaseQuantity" class="qty-btn">-</button>
            <span class="qty-display">{{ quantity }}</span>
            <button @click="increaseQuantity" class="qty-btn">+</button>
          </div>
        </div>

        <button class="btn-add-to-cart" @click="cartStore.addToCart(currentProduct, quantity)">
          ADICIONAR À SACOLA
        </button>
      </div>
    </div>

    <section v-if="product" class="product-info-section">
      <div class="info-header">
        <img src="/src/assets/images/Contract.png" alt="" class="info-icon">
        <h2>Informações do Produto</h2>
      </div>
      <div class="info-content">
        <p>{{ product.description || 'Descrição não disponível.' }}</p>
      </div>
    </section>

    <section class="similar-products" v-if="similarProducts.length > 0">
      <h2 class="section-title">Explorar outros itens semelhantes</h2>
      <div class="products-grid">
        <div 
          class="product-card" 
          v-for="item in similarProducts" 
          :key="item.id"
        >
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="card-image"
            @click="goToProduct(item.id)"
          />
          <h3 class="card-title" @click="goToProduct(item.id)">{{ item.name }}</h3>
          <p class="card-price">R$ {{ Number(item.price).toFixed(2).replace('.', ',') }}</p>
          <p class="card-installments">Até 4x de R$ {{ (Number(item.price) / 4).toFixed(2).replace('.', ',') }} sem juros</p>
          <button class="btn-add-small" @click="addSimilarToCart(item)">Adicionar a Sacola</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
}

.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #e74c3c;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.product-gallery {
  display: flex;
  gap: 20px;
}

.thumbnail-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.nav-arrow {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s;
}

.nav-arrow:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #999;
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.thumb {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.thumb:hover {
  border-color: #999;
}

.thumb.active {
  border-color: #000;
  box-shadow: 0 0 0 2px #000;
}

.main-image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 12px;
  padding: 40px;
  min-height: 450px;
}

.main-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-name {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: #000;
}

.product-category {
  font-size: 0.95rem;
  color: #00117E;
  margin: 0;
  line-height: 1.6;
}

.product-brand {
  color: #00117E;
  font-weight: 600;
}

.product-rating {
  margin: 8px 0;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  font-size: 22px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: #fbbf24;
}

.star:hover {
  color: #fbbf24;
}

.color-options {
  margin: 12px 0;
}

.options-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.color-swatches {
  display: flex;
  gap: 10px;
}

.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-swatch:hover {
  transform: scale(1.1);
  border-color: #000;
}

.product-price {
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  margin: 16px 0 0 0;
}

.product-installments {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 16px 0;
}

.quantity-selector {
  margin: 20px 0;
}

.quantity-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.quantity-controls {
  display: inline-flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.qty-btn:hover {
  background: #f5f5f5;
}

.qty-display {
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.btn-add-to-cart {
  width: 100%;
  padding: 16px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: auto;
}

.btn-add-to-cart:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.product-info-section {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 60px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.info-icon {
  font-size: 28px;
}

.info-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.info-content {
  line-height: 1.8;
  color: #333;
  font-size: 0.95rem;
}

.similar-products {
  margin-top: 60px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.4rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.product-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 16px;
  cursor: pointer;
  flex-shrink: 0;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #000;
  cursor: pointer;
  transition: color 0.2s;
  min-height: 2.4em;
  max-height: 2.4em;
  line-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-title:hover {
  color: #2563eb;
}

.card-price {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.card-installments {
  font-size: 0.8rem;
  color: #666;
  margin: 0 0 16px 0;
}

.btn-add-small {
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: auto;
}

.btn-add-small:hover {
  background: #333;
}


@media (max-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .product-gallery {
    flex-direction: column;
  }
  
  .thumbnail-nav {
    flex-direction: row;
  }
  
  .thumbnails {
    flex-direction: row;
    max-height: none;
    overflow-x: auto;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
