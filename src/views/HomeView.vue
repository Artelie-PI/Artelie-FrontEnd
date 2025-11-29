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


function scrollBrands(direction) {
 const carousel = carouselRef.value;
 if (!carousel) return;
 const scrollAmount = direction === 'right' ? carousel.offsetWidth * 0.7 : -carousel.offsetWidth * 0.7;
 carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}


onMounted(() => {
 loadProducts();
 loadBrands();
});
</script>


<template>
 <main class="home-main">
   <h1 class="visually-hidden">Página Inicial</h1>


   <LoadingSpinner v-if="loading" size="large" />
   <CarouselMain v-else />


   <p class="home-subtitle">
     Bem-vindo ao Arteliê - A plataforma onde você encontra os melhores produtos para seus projetos.
   </p>


   <!-- PRODUTOS EM DESTAQUE -->
   <div class="section-header">
     <h2 class="section-title">Produtos em Destaque</h2>
   </div>
   <LoadingSpinner v-if="loading" size="large" />
   <div v-else-if="error" class="error-state">
     <p>{{ error }}</p>
     <button @click="loadProducts" class="retry-button">🔄 Tentar Novamente</button>
   </div>
   <CardProducts v-else :products="featured.slice(0, 8)" />


   <!-- NAVEGUE POR MARCAS -->
   <div class="section-header brands-header" id="marcas">
     <h2 class="section-title">Navegue por Marcas</h2>
     <div class="brands-arrows">
       <button class="arrow-btn left" @click="scrollBrands('left')" aria-label="Voltar Marcas">
         <img :src="setaImg" alt="Seta Esquerda" />
       </button>
       <button class="arrow-btn right" @click="scrollBrands('right')" aria-label="Avançar Marcas">
         <img :src="setaImg" alt="Seta Direita" />
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
       <div class="brand-item" v-for="brand in brands" :key="brand.id || brand.name">
         <img :src="brand.image.url" :alt="brand.name" class="brand-logo" />
       </div>
     </div>
   </div>
 </main>
</template>


<style scoped>
.home-main {
 max-width: 1320px;
 margin: 0 auto;
 padding: 2rem 16px;
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
 margin: 60px 0;
 color: #4b5563;
 font-size: 0.95rem;
}


/* Títulos das seções */
.section-header {
 margin: 80px 0 40px;
 text-align: center;
}


.section-title {
 display: inline-block;
 font-size: 2rem;
 font-weight: 600;
 color: #000;
 text-decoration: underline;
 text-underline-offset: 4px;
 text-decoration-thickness: 3px;
}


/* Header de marcas: título centralizado + setas no canto direito */
.brands-header {
 position: relative;
 margin-bottom: 18px;
}


.brands-arrows {
 position: absolute;
 right: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 gap: 8px;
}


.arrow-btn {
 background: none;
 border: none;
 width: 32px;
 height: 32px;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 opacity: 0.9;
 transition: opacity 0.18s;
}


.arrow-btn:hover {
 opacity: 1;
}


.arrow-btn.left img {
 transform: rotate(-90deg);
}


.arrow-btn.right img {
 transform: rotate(90deg);
}


/* Carrossel de marcas */
.brands-carousel-wrap {
 max-width: 1320px;
 margin: 20px auto 68px;
}


.brands-carousel {
 display: flex;
 overflow-x: auto;
 scroll-behavior: smooth;
 scrollbar-width: none;
 -ms-overflow-style: none;
}


.brands-carousel::-webkit-scrollbar {
 display: none;
}


.brand-item {
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


/* Responsivo: Tablet */
@media (max-width: 900px) {
 .brand-item {
   flex: 0 0 calc(100% / 4);
   min-height: 90px;
 }


 .brand-logo {
   max-height: 60px;
   max-width: 120px;
 }


 .arrow-btn {
   width: 28px;
   height: 28px;
 }
}


/* Responsivo: Mobile */
@media (max-width: 600px) {
 .section-title {
   font-size: 1.17rem;
   text-underline-offset: 3px;
   text-decoration-thickness: 1.5px;
 }


 .brands-header {
   padding-bottom: 40px;
 }


 .brands-arrows {
   position: static;
   transform: none;
   justify-content: center;
   margin-top: 12px;
 }


 .brands-carousel-wrap {
   margin: 24px auto 44px;
 }


 .brand-item {
   flex: 0 0 calc(100% / 2.5);
   min-height: 70px;
 }


 .brand-logo {
   max-height: 42px;
   max-width: 90px;
 }


 .arrow-btn {
   width: 24px;
   height: 24px;
 }
}


/* Desktops grandes */
@media (min-width: 1440px) {
 .home-subtitle {
   font-size: 0.9rem;
   margin: 40px 0;
 }


 .section-title {
   font-size: 1.6rem;
   text-underline-offset: 3px;
   text-decoration-thickness: 2px;
 }


 .brands-carousel-wrap {
   max-width: 1180px;
 }


 .brand-item {
   min-height: 90px;
 }


 .brand-logo {
   max-height: 65px;
   max-width: 130px;
 }
}


@media (min-width: 1700px) {
 .section-title {
   font-size: 1.5rem;
 }
}
</style>
