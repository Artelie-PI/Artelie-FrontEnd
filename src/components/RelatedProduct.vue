<template>
  <div class="related-wrapper">
    <div class="related">
      <h2>Explorar outros itens semelhantes</h2>
      <div class="related-grid">
        <div
          v-for="(related, i) in productStore.relatedProducts"
          :key="i"
          class="related-card"
        >
          <img :src="related.image" class="related-img" />

          <h3 class="related-name">{{ related.name }}</h3>

          <p class="related-price">{{ related.price }}</p>
          <p class="related-installments">Até 4x de R$ 152,84 sem juros</p>

          <button class="add-btn">Adicionar à Sacola</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/relatedProduct";
const productStore = useProductStore();
</script>

<style scoped>
.related-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.related h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.4rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.related-card {
  background: #fff;
  padding: 1rem;
  text-align: center;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border 0.2s ease, transform 0.2s ease;
}
.related-card:hover {
  transform: translateY(-3px);
  border: 1px solid #999;
}

.related-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 0.8rem;
}

.related-name {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0.5rem 0;
  color: #111;
  line-height: 1.3;
  min-height: 45px;
}

.related-price {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.3rem 0 0.2rem;
}

.related-installments {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 1rem;
}

.add-btn {
  background: black;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.7rem;
  border-radius: 0;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s ease;
}
.add-btn:hover {
  background: #333;
}
</style>
