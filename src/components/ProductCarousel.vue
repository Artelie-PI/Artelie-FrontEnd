<template>
  <div class="carousel-container">
    <div class="carousel-header">
      <div class="header-left">
        <h2 class="carousel-title">{{ title }}</h2>
      </div>
    </div>

    <div class="carousel-wrapper">
      <button 
        @click="prev" 
        class="carousel-nav prev" 
        :disabled="currentIndex === 0"
        aria-label="Anterior"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div class="carousel-track-container" ref="trackContainer">
        <div 
          class="carousel-track" 
          :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
        >
          <div 
            v-for="product in products" 
            :key="product.id"
            class="carousel-slide"
            :style="{ width: `${slideWidth}px` }"
          >
            <div class="product-wrapper">
              <div class="product-card">
                <router-link :to="`/produto`" class="product-link">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.title" />
                  </div>

                  <div class="product-info">
                    <p class="product-category">{{ product.category || 'PAPERBLANKS' }}</p>
                    <h3 class="product-title">{{ product.title }}</h3>
                    
                    <div class="product-pricing">
                      <span class="product-price">R$ {{ formatPrice(product.price) }}</span>
                      <span class="product-installment">{{ product.installmentText }}</span>
                    </div>
                  </div>
                </router-link>
              </div>

              <button 
                @click="addToCart(product)" 
                class="btn-add-cart"
                :disabled="loading[product.id]"
              >
                {{ loading[product.id] ? 'Adicionando...' : 'Adicionar a Sacola' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        @click="next" 
        class="carousel-nav next" 
        :disabled="currentIndex >= maxIndex"
        aria-label="Próximo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: 'Novidades'
  },
  showViewAll: {
    type: Boolean,
    default: true
  }
});

defineEmits(['view-all']);
const cartStore = useCartStore();

const currentIndex = ref(0);
const trackContainer = ref(null);
const slideWidth = ref(280);
const slidesPerView = ref(4);
const loading = ref({});

const maxIndex = computed(() => {
  return Math.max(0, props.products.length - slidesPerView.value);
});

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2).replace('.', ',');
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const next = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  }
};

const addToCart = async (product) => {
  loading.value[product.id] = true;
  try {
    await cartStore.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image
    });
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
  } finally {
    loading.value[product.id] = false;
  }
};

const calculateLayout = () => {
  if (!trackContainer.value) return;
  
  const containerWidth = trackContainer.value.offsetWidth;
  const gap = 20;
  
  if (window.innerWidth < 768) {
    slidesPerView.value = 2;
    slideWidth.value = (containerWidth - gap) / 2;
  } else if (window.innerWidth < 1024) {
    slidesPerView.value = 3;
    slideWidth.value = (containerWidth - gap * 2) / 3;
  } else {
    slidesPerView.value = 4;
    slideWidth.value = (containerWidth - gap * 3) / 4;
  }
};

onMounted(() => {
  calculateLayout();
  window.addEventListener('resize', calculateLayout);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateLayout);
});
</script>

<style scoped>
.carousel-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
}

.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.carousel-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.75rem;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-nav {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
}

.carousel-nav:hover:not(:disabled) {
  background: #4338ca;
  border-color: #4338ca;
  color: white;
}

.carousel-nav:hover:not(:disabled) svg {
  stroke: white;
}

.carousel-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-track-container {
  flex: 1;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;
}

.carousel-slide {
  flex-shrink: 0;
}

.product-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.product-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-category {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.product-title {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
  color: #1f2937;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
}

.product-pricing {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: auto;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.product-installment {
  font-size: 0.75rem;
  color: #6b7280;
}

.btn-add-cart {
  width: 100%;
  height: 2.30rem;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-add-cart:hover:not(:disabled) {
  background: #1f2937;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn-add-cart:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .carousel-title {
    font-size: 1.5rem;
  }

  .carousel-nav {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    padding: 0 0.5rem;
  }

  .carousel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .btn-view-all {
    width: 100%;
  }

  .carousel-nav {
    display: none;
  }

  .product-title {
    font-size: 0.85rem;
  }

  .product-price {
    font-size: 1.1rem;
  }

  .btn-add-cart {
    font-size: 12px;
    height: 2.5rem;
  }
}
</style>