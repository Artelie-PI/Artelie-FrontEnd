<script setup>
import { useProductStore } from "@/stores/relatedProduct";

const productStore = useProductStore();
</script>

<template>
  <div class="product-page">
    <div class="product-container">
      <!-- Galeria -->
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

      <!-- Detalhes -->
      <div class="details">
        <h1>Estojo Lápis de Cor Studio Collection Winsor & Newton 50 Peças</h1>
        <p class="brand">LÁPIS/CANETAS · Winsor & Newton</p>
        <div class="rating">
          <span v-for="n in 4" :key="n" class="star full">★</span>
          <span class="star">★</span>
          <span class="count">(35)</span>
        </div>
        <p class="price">R$ 598,00</p>
        <p class="installments">Até 4x de R$ 152,84 sem juros</p>

        <!-- Quantidade -->
        <div class="quantity">
          <label>Quantidade:</label>
          <button @click="productStore.decreaseQuantity">-</button>
          <span>{{ productStore.quantity }}</span>
          <button @click="productStore.increaseQuantity">+</button>
        </div>

        <button class="add-btn">Adicionar ao Sacolão</button>
      </div>
    </div>

    <!-- Informações -->
    <div class="info">
      <h2>Informações do Produto</h2>
      <p>
        Os lápis de cor da Studio Collection têm uma textura macia que se mistura facilmente...
      </p>
    </div>

    <!-- Relacionados -->

  </div>
</template>

<style scoped>
/* Layout geral */
.product-page {
  font-family: "Inter", sans-serif;
  padding: 1.5rem;
  max-width: 1200px;
  margin: auto;
}

/* Produto principal */
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.gallery {
  display: flex;
  flex-direction: column;
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
  border-radius: 0.5rem;
  cursor: pointer;
  object-fit: cover;
}

.thumb.active {
  border: 2px solid black;
}

/* Detalhes */
.details h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.brand {
  color: #666;
  margin-top: 0.25rem;
}

.rating {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.star {
  color: #ccc;
  font-size: 1.2rem;
}

.star.full {
  color: #2563eb; /* azul */
}

.count {
  font-size: 0.85rem;
  color: #666;
  margin-left: 0.5rem;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1rem;
}

.installments {
  font-size: 0.9rem;
  color: #666;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.quantity button {
  padding: 0.25rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  background: #f8f8f8;
  cursor: pointer;
}

.add-btn {
  margin-top: 1.5rem;
  background: black;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #333;
}

/* Info */
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



/* Responsividade */
@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }
}
</style>
