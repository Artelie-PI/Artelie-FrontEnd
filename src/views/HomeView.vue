<script setup>
import { ref, onMounted } from 'vue';
import CarouselMain from '@/components/CarouselMain.vue';
import CardProducts from '@/components/CardProducts.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import setaImg from '@/assets/images/Seta.png';
import { fetchFeaturedProducts } from '@/api/products';
import { formatProduct } from '@/utils/productHelper';

const featured = ref([]);
const loading = ref(true);
const error = ref(null);

const brands = ref([]);
const brandsError = ref(null);
const brandsLoading = ref(true);

// Carousel
const carouselRef = ref(null);

async function loadBrands() {
  try {
    brandsLoading.value = true;
    brandsError.value = null;
    const response = await fetch("https://artelie-backend.onrender.com/brands/");
    if (!response.ok) throw new Error('Erro ao buscar marcas');
    const data = await response.json();
    brands.value = Array.isArray(data.results)
      ? data.results.filter(b => b && typeof b === 'object' && b.image && b.image.url)
      : [];
  } catch (err) {
    brandsError.value = err.message || "Erro ao carregar marcas";
    brands.value = [];
  } finally {
    brandsLoading.value = false;
  }
}

async function loadProducts() {
  try {
    loading.value = true;
    error.value = null;
    const response = await fetchFeaturedProducts();
    const products = Array.isArray(response) ? response : (response?.results || []);
    featured.value = products.map(formatProduct);
  } catch (err) {
    if (err.message?.includes('MaxClients') || err.response?.status === 500) {
      error.value = '⚠️ Servidor temporariamente indisponível. Tente novamente em alguns segundos.';
    } else {
      error.value = 'Erro ao carregar produtos. Verifique sua conexão.';
    }
  } finally {
    loading.value = false;
  }
}

// Scrolling brand carousel logic
function scrollBrands(direction) {
  const carousel = carouselRef.value;
  if (!carousel) return;
  const elementWidth = carousel.offsetWidth;
  if (direction === 'right') {
    carousel.scrollBy({ left: elementWidth * 0.7, behavior: 'smooth' });
  } else {
    carousel.scrollBy({ left: -elementWidth * 0.7, behavior: 'smooth' });
  }
}

onMounted(() => {
  loadProducts();
  loadBrands();
});
</script>

<template>
  <main class="home-main">
    <h1 class="visually-hidden">Página Inicial</h1>

    <!-- Carrossel principal -->
    <LoadingSpinner v-if="loading" size="large" />
    <CarouselMain v-else />

    <p class="home-subtitle">
      Bem-vindo ao Arteliê - A plataforma onde você encontra os melhores produtos para seus projetos.
    </p>

    <div class="section-header center-title">
      <h2 class="section-title">Produtos em Destaque</h2>
    </div>
    <LoadingSpinner v-if="loading" size="large" />
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="loadProducts" class="retry-button">🔄 Tentar Novamente</button>
    </div>
    <CardProducts v-else :products="featured.slice(0, 8)" />

    <!-- CARROSSEL DE MARCAS -->
    <div class="section-header center-title brands-header">
      <h2 class="section-title">Navegue por Marcas</h2>

      <div class="brands-arrows">
        <button class="carousel-arrow header-arrow left" @click="scrollBrands('left')" aria-label="Voltar marcas">
          <img :src="setaImg" alt="Seta esquerda" />
        </button>
        <button class="carousel-arrow header-arrow right" @click="scrollBrands('right')" aria-label="Avançar marcas">
          <img :src="setaImg" alt="Seta direita" />
        </button>
      </div>
    </div>

    <LoadingSpinner v-if="brandsLoading" size="large" />
    <div v-else-if="brandsError" class="error-state">
      <p>{{ brandsError }}</p>
      <button @click="loadBrands" class="retry-button">🔄 Tentar Novamente</button>
    </div>
    <div v-else class="brands-carousel-wrap">
      <div class="brands-carousel" ref="carouselRef">
        <div class="brand-logo-block" v-for="brand in brands" :key="brand.id || brand.name">
          <img v-if="brand.image && brand.image.url" :src="brand.image.url" :alt="brand.name" class="brand-logo" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-main {
  padding: 2rem 0 2rem;
  text-align: center;
  max-width: 1320px;
  margin: 0 auto;
  padding-inline: 16px;
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
  margin: 60px 0;
  color: #4b5563;
  font-size: 0.95rem;
}

/* Títulos */
.section-header.center-title {
  max-width: 1320px;
  margin: 80px auto 40px auto;
  border: none;
  text-align: center;
  position: relative;
  padding-inline: 16px;
}

.section-header.center-title h2.section-title {
  margin: 0 auto;
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 3px;
}

@media (max-width: 600px) {
  .section-header.center-title h2.section-title {
    font-size: 1.17rem;
    padding-bottom: 1.5px;
    text-underline-offset: 3px;
    text-decoration-thickness: 1.5px;
  }
}

/* Header das marcas com setas à direita */
.brands-header {
  margin-bottom: 18px;
}

.brands-arrows {
  position: absolute;
  right: 12%;
  bottom: -2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.carousel-arrow {
  background: none;
  border: none;
  position: relative;
  z-index: 2;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.18s;
}

.header-arrow {
  width: 32px;
  height: 32px;
}

.carousel-arrow.left img,
.header-arrow.left img {
  transform: rotate(-90deg);
}

.carousel-arrow.right img,
.header-arrow.right img {
  transform: rotate(90deg);
}

.carousel-arrow:active,
.carousel-arrow:hover,
.header-arrow:active,
.header-arrow:hover {
  opacity: 1;
}

/* MARCAS: Carrossel horizontal */
.brands-carousel-wrap {
  max-width: 1320px;
  margin: 20px auto 68px auto;
  position: relative;
  display: flex;
  justify-content: center;
}

/* 6 por vez em desktop */
.brands-carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.brands-carousel::-webkit-scrollbar {
  display: none;
}

.brand-logo-block {
  flex: 0 0 calc(100% / 6);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
}

.brand-logo {
  max-height: 80px;
  max-width: 160px;
  object-fit: contain;
  transition: filter 0.18s;
  filter: grayscale(0.07);
  cursor: pointer;
}

.brand-logo:hover {
  filter: grayscale(0) brightness(1.08);
  opacity: 1;
}

/* Breakpoints desktop “normal” */
@media (max-width: 900px) {
  .brands-arrows {
    right: 6%;
  }

  .brand-logo-block {
    flex: 0 0 calc(100% / 4);
    min-height: 90px;
  }

  .brand-logo {
    max-height: 60px;
    max-width: 120px;
  }

  .carousel-arrow {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 600px) {
  .brands-arrows {
    right: 5%;
    bottom: -2px;
  }

  .brands-carousel-wrap {
    margin: 24px auto 44px auto;
  }

  .brand-logo-block {
    flex: 0 0 calc(100% / 2.5);
    min-height: 70px;
  }

  .brand-logo {
    max-height: 42px;
    max-width: 90px;
  }

  .carousel-arrow {
    width: 21px;
    height: 21px;
  }
}

/* DESKTOPS GRANDES (≥1440px): tudo um pouco menor e mais estreito */
@media (min-width: 1440px) {
  .home-subtitle {
    font-size: 0.9rem;
    margin: 40px 0;
  }

  .section-header.center-title h2.section-title {
    font-size: 1.6rem;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
  }

  .brands-carousel-wrap {
    max-width: 1180px;
  }

  .brand-logo-block {
    min-height: 90px;
  }

  .brand-logo {
    max-height: 65px;
    max-width: 130px;
  }
}

@media (min-width: 1700px) {
  .section-header.center-title h2.section-title {
    font-size: 1.5rem;
  }
}
</style>
