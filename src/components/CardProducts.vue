<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useSidebarCart } from '@/stores/useSidebarCart'

const cartStore = useCartStore()
const { open } = useSidebarCart()

const props = defineProps({
  products: { type: Array, default: () => [] },
  toName: { type: String, default: 'product' },
})

const list = computed(() => props.products || [])

const formatPrice = (v) =>
  typeof v === 'number' ? v.toFixed(2).replace('.', ',') : v

function addProduct(product) {
  cartStore.addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image?.url || '',
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
              <img v-if="p.image" :src="p.image.url" :alt="p.title" class="pc-image" />
              <div v-else class="pc-no-image">Sem imagem</div>
            </div>
          </div>

          <h3 class="pc-title">{{ p.title }}</h3>

          <div class="pc-price-area">
            <div class="pc-price">R$ {{ formatPrice(p.price) }}</div>
            <div v-if="p.installmentText" class="pc-installments">{{ p.installmentText }}</div>
          </div>
        </RouterLink>

        <button class="pc-button" @click="addProduct(p)">ADICIONAR À SACOLA</button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.pc-container {
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2vw;
}

.empty-state {
  padding: 3rem 1rem;
  text-align: center;
  color: #666;
  font-size: 1.1rem;
}

.pc-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
}

.pc-card {
  flex: 1 1 100%;
  max-width: 100%;
}

@media (min-width: 40rem) {
  .pc-card {
    flex: 1 1 calc(50% - 1.5rem);
    max-width: calc(50% - 1.5rem);
  }
}

@media (min-width: 64rem) {
  .pc-card {
    flex: 1 1 calc(25% - 1.5rem);
    max-width: calc(25% - 1.5rem);
  }
}

@media (min-width: 40rem) {
  .pc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .pc-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.pc-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.pc-link {
  display: flex;
  flex-direction: column;
  flex: 1;
  outline: none;
  text-decoration: none;
  color: inherit;
}

.pc-link:focus-visible {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.7);
}

.pc-image-wrap {
  position: relative;
  background-color: #fff;
  border-radius: 0.125rem;
}

.pc-image-shadow {
  position: absolute;
  left: 1vw;
  right: 1vw;
  bottom: 0;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  filter: blur(0.25rem);
  pointer-events: none;
}

.pc-image-box {
  position: relative;
  width: 100%;
  background: #fff;
  overflow: hidden;
  min-height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-image {
  left: 1rem;
  right: 1rem;
  height: 35vh;
  max-height: 18rem;
  width: auto;
  max-width: 90vw;
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
  font-size: 0.9rem;
}

.pc-title {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 500;
  color: #000;
  min-height: 3.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pc-price-area {
  margin-top: 0.75rem;
  text-align: center;
  margin-bottom: auto;
}

.pc-price {
  color: #111827;
  font-size: 1.125rem;
  font-weight: 600;
}

.pc-installments {
  margin-top: 0.25rem;
  color: #6b7280;
  font-size: 0.8rem;
  min-height: 1.1rem;
}

.pc-button {
  margin-top: 0.75rem;
  height: 2.2rem;
  width: 100%;
  border-radius: 0.3rem;
  background: #000;
  color: #fff;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.pc-button:hover {
  background: #202020;
}

.pc-button:focus-visible {
  outline: 0.125rem solid rgba(0, 0, 0, 0.7);
  outline-offset: 0.125rem;
}
</style>
