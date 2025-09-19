<!-- src/components/ProductCard.vue -->
<script setup>
const props = defineProps({
  product: { type: Object, required: true }
})

const name = (p) => p.title || p.name || p.product_name || p.nome || 'Produto'
const price = (p) => p.price || p.preco || p.valor || null
const image = (p) => {
  return p.image || p.images?.[0] || p.thumbnail || p.picture || p.foto || null
}
</script>

<template>
  <article class="card">
    <div class="thumb">
      <img v-if="image(product)" :src="image(product)" alt="" />
      <div v-else class="no-image">sem imagem</div>
    </div>
    <div class="info">
      <h3 class="title">{{ name(product) }}</h3>
      <p v-if="price(product)" class="price">R$ {{ price(product) }}</p>
      <p v-else class="price">Preço indisponível</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.06);
  padding: .8rem;
  display:flex;
  flex-direction: column;
  gap: .6rem;
}
.thumb { width: 100%; height: 160px; display:flex; align-items:center; justify-content:center; overflow:hidden; border-radius:6px; background:#fafafa; }
.thumb img { width:100%; height:100%; object-fit:cover; }
.no-image { color:#999; font-size:.9rem; }
.info .title { font-size:1rem; margin:0 0 .4rem 0; }
.price { color:#192EB1; font-weight:600; }
</style>
