<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/relatedProduct";

const productStore = useProductStore();
const router = useRouter();

const visibleItems = ref(4);
const isTransitioning = ref(false);
const currentIndex = ref(visibleItems.value);

const baseProducts = computed(() => productStore.relatedProducts || []);

const displayedProducts = computed(() => {
  const products = baseProducts.value;
  if (!products.length) return [];

  const repeated = [];
  const repeatCount = Math.ceil((visibleItems.value * 3) / products.length);
  for (let i = 0; i < repeatCount; i++) repeated.push(...products);

  return [
    ...repeated.slice(-visibleItems.value),
    ...repeated,
    ...repeated.slice(0, visibleItems.value),
  ];
});

const nextSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value++;
};

const prevSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value--;
};

const handleTransitionEnd = () => {
  isTransitioning.value = false;
  const total = displayedProducts.value.length;
  if (currentIndex.value >= total - visibleItems.value) {
    currentIndex.value = visibleItems.value;
  } else if (currentIndex.value <= 0) {
    currentIndex.value = total - visibleItems.value * 2;
  }
};

const goToProduct = () => {
  router.push("/produto");
};

const updateVisibleItems = () => {
  const width = window.innerWidth;
  if (width >= 1200) visibleItems.value = 4;
  else if (width >= 992) visibleItems.value = 3;
  else if (width >= 768) visibleItems.value = 2;
  else visibleItems.value = 1;

  currentIndex.value = visibleItems.value;
};

onMounted(() => {
  window.addEventListener("resize", updateVisibleItems);
  updateVisibleItems();
});
</script>

<template>
  <div class="carousel-container">
    <!-- Setas -->
    <button class="arrow left" @click="prevSlide">&#10094;</button>
    <button class="arrow right" @click="nextSlide">&#10095;</button>

    <div class="carousel-wrapper">
      <div class="carousel-track" :class="{ transitioning: isTransitioning }" @transitionend="handleTransitionEnd"
           :style="{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }">
        <div class="carousel-item" v-for="(product, i) in displayedProducts" :key="i">
          <img :src="product.image" :alt="product.name" />
          <p class="name">{{ product.name }}</p>
          <p class="price">{{ product.price }}</p>
          <p class="installment">Até 4x de R$ 58,24 sem juros</p>
          <button @click="goToProduct">Adicionar à Sacola</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 20px 0;
}

.carousel-wrapper {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 calc(25% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 16px;
  text-align: center;
  height: 460px;
  box-sizing: border-box;
  cursor: pointer;
}

.carousel-item img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 12px;
}

.name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.price {
  font-size: 14px;
  color: #444;
  margin-bottom: 2px;
}

.installment {
  font-size: 12px;
  color: #888;
  margin-bottom: 12px;
}

.carousel-item button {
  width: 100%;
  background-color: black;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

.carousel-item button:hover {
  background-color: #333;
}

/* Setas */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: black;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  z-index: 2;
  transition: background 0.3s;
}

.arrow:hover {
  background: #333;
}

.arrow.left {
  left: 0;
}

.arrow.right {
  right: 0;
}

/* Responsivo */
@media (max-width: 1199px) {
  .carousel-item { flex: 0 0 calc(33.333% - 20px); }
}
@media (max-width: 992px) {
  .carousel-item { flex: 0 0 calc(50% - 20px); }
}
@media (max-width: 768px) {
  .carousel-item { flex: 0 0 calc(50% - 20px); }
}
@media (max-width: 480px) {
  .carousel-item { flex: 0 0 90%; }
}
</style>
