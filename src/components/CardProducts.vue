<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from "@/stores/cart";
import { useSidebarCart } from "@/stores/useSidebarCart";
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const { open } = useSidebarCart();

const props = defineProps({
  products: { type: Array, default: () => [] },
  toName: { type: String, default: 'product' },
});

const list = computed(() => {
  return (props.products || []).map(p => {
    // Tenta múltiplas possibilidades de campo de imagem
    const image = p.image ||
                  p.Image ||
                  p.image_url ||
                  p.imageUrl ||
                  p.imageURL ||
                  p.thumbnail ||
                  p.photo ||
                  p.url_image ||
                  null;

    // Se tem imagem mas é objeto, pega a URL
    const imageUrl = typeof image === 'object' ?
                     (image.url || image.src || image.href || null) :
                     image;

    return {
      ...p,
      image: imageUrl
    };
  });
});

const formatPrice = (v) =>
  typeof v === 'number' ? v.toFixed(2).replace('.', ',') : v;
const router = useRouter();

function addProduct(product) {
  cartStore.addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  });

  if (router.currentRoute.value.name !== 'cart') {
    open();
  }
}
</script>

<template>
  <section class="pc-container">
    <div v-if="list.length === 0" class="empty-state">
      <p>Nenhum produto disponível no momento.</p>
    </div>

    <div v-else class="pc-grid">
      <article v-for="p in list" :key="p.id" class="pc-card">
        <RouterLink
          :to="{ name: toName, params: { id: p.id } }"
          class="pc-link"
          :aria-label="p.title"
        >
          <div class="pc-image-wrap">
            <div class="pc-image-box">
              <img
                v-if="p.image && p.image.startsWith('http')"
                :src="p.image"
                :alt="p.title"
                class="pc-image"
                loading="lazy"
                @error="handleImageError"
              />
              <div v-else class="pc-no-image">
                <span v-if="!p.image">Sem imagem</span>
                <span v-else>URL inválida</span>
              </div>
            </div>
          </div>

          <h3 class="pc-title">{{ p.title }}</h3>

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
  max-width: 1320px;
  margin: 0 auto;
  padding-inline: 16px;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #666;
}

/* Grid responsivo: 2 colunas no mobile, 3 no tablet, 4 no desktop */
.pc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .pc-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .pc-grid {
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: 24px;
  }

  .pc-card {
    max-width: 280px;
    margin: 0 auto;
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
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.7);
}

/* Área da imagem */
.pc-image-wrap {
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.pc-image-box {
  position: relative;
  width: 100%;
  background: #fff;
  overflow: hidden;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-image {
  width: 80%;
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
  font-size: 12px;
}

/* Texto e preço */
.pc-title {
  margin-top: 12px;
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  font-weight: 500;
  color: #000;
  min-height: 47px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pc-price-area {
  margin-top: 8px;
  text-align: center;
  margin-bottom: auto;
}

.pc-price {
  color: #111827;
  font-size: 15px;
  font-weight: 600;
}

.pc-installments {
  margin-top: 3px;
  color: #6b7280;
  font-size: 10px;
  min-height: 15px;
}

/* Botão */
.pc-button {
  margin-top: 10px;
  height: 1.8rem;
  width: 100%;
  border-radius: 4px;
  background: #000;
  color: #fff;
  padding: 0 12px;
  font-size: 11px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.pc-button:hover {
  background: #202020;
}

.pc-button:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.7);
  outline-offset: 2px;
}

/* Tablet */
@media (min-width: 640px) {
  .pc-image-box {
    min-height: 220px;
  }

  .pc-title {
    font-size: 13px;
    margin-top: 14px;
    min-height: 52px;
  }

  .pc-price {
    font-size: 16px;
  }

  .pc-installments {
    font-size: 11px;
  }

  .pc-button {
    height: 2rem;
    font-size: 12px;
    margin-top: 12px;
  }

  .pc-no-image {
    font-size: 13px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .pc-image-box {
    min-height: 250px;
  }

  .pc-title {
    font-size: 14px;
    margin-top: 16px;
    min-height: 58px;
  }

  .pc-price {
    font-size: 18px;
  }

  .pc-price-area {
    margin-top: 12px;
  }

  .pc-installments {
    font-size: 12px;
    margin-top: 4px;
    min-height: 18px;
  }

  .pc-button {
    height: 2rem;
    font-size: 14px;
    padding: 0 16px;
    border-radius: 5px;
  }

  .pc-no-image {
    font-size: 14px;
  }
}

/* DESKTOPS GRANDES (≥1440px) */
@media (min-width: 1440px) {
  .pc-container {
    max-width: 1180px;
  }

  .pc-grid {
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: 20px;
  }

  .pc-card {
    max-width: 250px;
  }

  .pc-image-box {
    min-height: 220px;
  }

  .pc-title {
    font-size: 13px;
  }

  .pc-price {
    font-size: 16px;
  }

  .pc-button {
    font-size: 12px;
    height: 1.9rem;
  }
}
</style>
