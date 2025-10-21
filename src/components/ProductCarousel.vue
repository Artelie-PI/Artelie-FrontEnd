<script setup>
import { computed } from 'vue'; // script setup / Composition API [web:18]
import { RouterLink } from 'vue-router'; // navegação para a página de produto [web:15]
import { useCartStore } from "@/stores/cart"; // <-- novo

const cartStore = useCartStore();

const props = defineProps({
  products: { type: Array, default: () => [] }, // lista de produtos [web:1]
  toName: { type: String, default: 'product' }, // nome da rota de detalhes [web:15]
});

const fallback = [
  {
    id: 1,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: '/img/produtos/wn-lapis-27.png',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
  {
    id: 2,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: '/img/produtos/wn-lapis-27.png',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
  {
    id: 3,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: '/img/produtos/wn-lapis-27.png',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
  {
    id: 4,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: '/img/produtos/wn-lapis-27.png',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
];

const list = computed(() => (props.products?.length ? props.products : fallback)); // props ou fallback [web:1]

const formatPrice = (v) =>
  typeof v === 'number' ? v.toFixed(2).replace('.', ',') : v; // formatação simples [web:1]
</script>

<template>
  <section class="pc-container">
    <div class="pc-grid">
      <article v-for="p in list" :key="p.id" class="pc-card">
        <RouterLink :to="{ name: toName, params: { id: p.id } }" class="pc-link" :aria-label="p.title">
          <div class="pc-image-wrap">
            <!-- sombra inferior sob a imagem -->
            <div aria-hidden="true" class="pc-image-shadow"></div>
            <div class="pc-image-box">
              <img :src="p.image" :alt="p.title" class="pc-image" />
            </div>
          </div>

          <h3 class="pc-title">
            {{ p.title }}
          </h3>


          <div class="pc-price-area">
            <div class="pc-price">R$ {{ formatPrice(p.price) }}</div>
            <div v-if="p.installmentText" class="pc-installments">
              {{ p.installmentText }}
            </div>
          </div>
        </RouterLink>
        <button class="pc-button" @click="cartStore.addToCart(currentProduct, productStore.quantity)">
          Adicionar a Sacola
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* Container geral do bloco */
.pc-container {
  max-width: 1120px;
  /* similar a max-w-7xl */
  margin: 0 auto;
}

/* Grid responsiva 1-2-4 colunas */
.pc-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .pc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .pc-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Card */
.pc-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* Link clicável que envolve imagem e título */
.pc-link {
  display: block;
  outline: none;
  text-decoration: none;
  color: inherit;
}

.pc-link:focus-visible {
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.7);
}

/* Wrapper da imagem e sombra inferior */
.pc-image-wrap {
  position: relative;
  background-color: #fff;
  border-radius: 2px;
}

.pc-image-shadow {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  height: 24px;
  background: rgba(0, 0, 0, 50%);
  filter: blur(4px);
  pointer-events: none;
}

.pc-image-box {
  position: relative;
  width: 100%;
  background: #fff;
  overflow: hidden;
}

.pc-image {left: 16px;
  right: 16px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.pc-link:hover .pc-image {
  transform: scale(1.03);
}

/* Título: 3 linhas, centralizado */
.pc-title {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 500;
  color: #000;
  /* neutral-900 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Área de preço e parcelamento */
.pc-price-area {
  margin-top: 12px;
  text-align: center;
}

.pc-price {
  color: #111827;
  font-size: 18px;
  font-weight: 600;
}

.pc-installments {
  margin-top: 4px;
  color: #6b7280;
  /* neutral-500 */
  font-size: 12px;
}

/* Botão cheio */
.pc-button {
  margin-top: 12px;
  height: 2rem;
  width: 100%;
  border-radius: 5px;
  background: #000;
  color: #fff;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.pc-button:hover {
  background: #202020;
  /* neutral-800 */
}

.pc-button:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.7);
  outline-offset: 2px;
}
</style>
