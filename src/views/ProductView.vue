<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/relatedProduct";

const productStore = useProductStore();

const rating = ref(0);

function setRating(value) {
  rating.value = value;
}
</script>

<template>
  <div class="product-page">
    <div class="product-container">
      <div class="gallery">
        <img :src="productStore.selectedImage" alt="Produto" class="main-image" />
        <div class="thumbnails">
          <img
            v-for="(img, i) in productStore.images"
            :key="i"
            :src="img"
            @click="productStore.selectedImage = img"
            class="thumb"
            :class="{ active: productStore.selectedImage === img }"
          />
        </div>
      </div>

      <div class="details">
        <h1 class="title">Estojo Lápis de Cor Studio Collection Winsor & Newton 50 Peças</h1>
        <p class="brand">
          <span class="category">LÁPIS/CANETAS</span> ·
          <span class="brand-name">Winsor & Newton</span>
        </p>

        <div class="rating">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="{ full: n <= rating }"
            @click="setRating(n)"
          >
            ★
          </span>
          <span class="count">({{ rating }} de 5)</span>
        </div>

        <div class="colors">
          <div class="color-circle"></div>
          <div class="color-circle"></div>
          <div class="color-circle"></div>
        </div>

        <p class="price">R$ 598,00</p>
        <p class="installments">Até 4x de R$ 152,84 sem juros</p>

        <div class="quantity">
          <label class="quantity-label">Quantidade</label>
          <div class="quantity-box">
            <button class="quantity-btn" @click="productStore.decreaseQuantity">-</button>
            <span class="quantity-value">{{ productStore.quantity }}</span>
            <button class="quantity-btn" @click="productStore.increaseQuantity">+</button>
          </div>
        </div>

        <button class="add-btn">Adicionar a Sacola</button>
      </div>
    </div>

    <div class="info">
      <h2>Informações do Produto</h2>
      <p>
        Os lápis de cor da Studio Collection têm uma textura macia que se mistura facilmente. Os
        núcleos de alta qualidade significam que eles são extremamente lisos e responsivos ao uso...
      </p>
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

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

/* Galeria */
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

.title {
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
  color: #f5c518; /* amarelo */
}
.star:hover {
  color: #f5c518;
}
.count {
  font-size: 0.85rem;
  color: #666;
  margin-left: 0.4rem;
}

/* Cores */
.colors {
  display: flex;
  gap: 0.5rem;
  margin: 0.8rem 0;
}
.color-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
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
