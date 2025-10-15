<script setup>
import ProductCarousel from "@/components/ProductCarousel.vue";
</script>

<template>
  <main>
    <h1>Página Inicial</h1>
    <p>Bem-vindo ao Artelie, sua plataforma de gerenciamento de projetos.</p>
     <h2 class="section-title">Produtos em Destaque</h2>
    <ProductCarousel />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
  background-color: #f8f9fa;
  text-align: center;
}
.section-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.6rem;
}
</style>
