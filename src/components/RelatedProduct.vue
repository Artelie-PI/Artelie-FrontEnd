<template>
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
</template>

<script setup>
import { useProductStore } from "@/stores/relatedProduct";
const productStore = useProductStore();
</script>

<style scoped>
/* Container */
.related {
  margin-top: 2rem;
}

.related h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

/* Grid responsivo */
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* Card */
.related-card {
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
}
.related-card:hover {
  transform: translateY(-4px);
}

/* Imagem */
.related-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-bottom: 0.8rem;
}

/* Nome */
.related-name {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0.5rem 0;
  color: #222;
  min-height: 40px; /* mantém altura fixa caso o nome quebre linha */
}

/* Preço */
.related-price {
  font-size: 1rem;
  font-weight: bold;
  margin: 0.3rem 0 0.2rem;
}

/* Parcelamento */
.related-installments {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

/* Botão */
.add-btn {
  background: black;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.6rem;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}
.add-btn:hover {
  background: #333;
}
</style>
