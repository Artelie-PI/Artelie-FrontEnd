<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from "@/stores/cart";
import { useSidebarCart } from "@/stores/useSidebarCart"

const cartStore = useCartStore();
const { open } = useSidebarCart();

const props = defineProps({
  products: { type: Array, default: () => [] },
  toName: { type: String, default: 'product' },
});

const list = computed(() => props.products || []);

const formatPrice = (v) =>
  typeof v === 'number' ? v.toFixed(2).replace('.', ',') : v;

function addProduct(product) {
  cartStore.addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  })
  open()
}
</script>

<template>
  <section class="pc-container">
    <div v-if="list.length === 0" class="empty-state">
      <p>Nenhum produto disponível no momento.</p>
    </div>

    <div v-else class="pc-grid">
      <article v-for="p in list" :key="p.id" class="pc-card">
        <RouterLink :to="{ name: toName, params: { id: p.id } }" class="pc-link" :aria-label="p.title">
          <div class="pc-image-wrap">
            <div aria-hidden="true" class="pc-image-shadow"></div>
            <div class="pc-image-box">
              <img v-if="p.image" :src="p.image" :alt="p.title" class="pc-image" />
              <div v-else class="pc-no-image">Sem imagem</div>
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
        <button class="pc-button" @click="addProduct(p)">
          ADICIONAR À SACOLA
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.pc-container {
  max-width: 1120px;
  margin: 0 auto;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #666;
}

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

.pc-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%; /* ✅ Ocupa toda altura disponível */
}

.pc-link {
  display: flex; /* ✅ Adicionado flex */
  flex-direction: column; /* ✅ Adicionado flex-direction */
  flex: 1; /* ✅ Cresce para empurrar o botão */
  outline: none;
  text-decoration: none;
  color: inherit;
}

.pc-link:focus-visible {
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.7);
}

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
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-image {
  left: 16px;
  right: 16px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.pc-link:hover .pc-image {
  transform: scale(1.03);
}

.pc-no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #999;
  font-size: 14px;
}

.pc-title {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 500;
  color: #000;
  min-height: 58px; /* ✅ Altura mínima fixa para 3 linhas (14px * 1.35 * 3 ≈ 57px) */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pc-price-area {
  margin-top: 12px;
  text-align: center;
  margin-bottom: auto; /* ✅ Empurra o conteúdo seguinte (botão) para baixo */
}

.pc-price {
  color: #111827;
  font-size: 18px;
  font-weight: 600;
}

.pc-installments {
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
  min-height: 18px; /* ✅ Garante espaço mesmo quando não tem parcela */
}

.pc-button {
  margin-top: 12px;
  height: 2rem;
  width: 100%;
  border-radius: 5px;
  background: #000;
  color: #fff;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  flex-shrink: 0; /* ✅ Impede que o botão encolha */
}

.pc-button:hover {
  background: #202020;
}

.pc-button:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.7);
  outline-offset: 2px;
}
</style>
