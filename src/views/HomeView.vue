<script setup>
import ProductCarousel from '@/components/ProductCarousel.vue'; // componente de produtos [web:1]

const featured = [
  {
    id: 1,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: 'https://frutodearte.com.br/cdn/shop/files/884955085226-wn_sc_colour_pencils_wallet_27pc_884955085226_front.jpg?v=1728500414&width=600',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
  {
    id: 2,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: 'https://frutodearte.com.br/cdn/shop/files/884955085226-wn_sc_colour_pencils_wallet_27pc_884955085226_front.jpg?v=1728500414&width=600',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
  {
    id: 3,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: 'https://frutodearte.com.br/cdn/shop/files/884955085226-wn_sc_colour_pencils_wallet_27pc_884955085226_front.jpg?v=1728500414&width=600',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
  {
    id: 4,
    title: 'Estojo Lápis de Cor Studio Collection Winsor & Newton 27 Peças',
    image: 'https://frutodearte.com.br/cdn/shop/files/884955085226-wn_sc_colour_pencils_wallet_27pc_884955085226_front.jpg?v=1728500414&width=600',
    price: 598,
    installmentText: 'Até 4x de R$ 58,24 sem juros',
  },
];
// Mudar esse código do Button para adicionar o produto ao carrinho
// const handleAdd = (item) => {
//  console.log('Adicionar ao carrinho', item); // substitua por sua lógica
// };

</script>

<template>
  <main class="home-main">
    <h1 class="visually-hidden">Página Inicial</h1>
    <p class="home-subtitle">Bem-vindo ao Artelie, sua plataforma de gerenciamento de projetos.</p>

    <!-- Section title igual ao Figma -->
    <div class="section-header">
      <h2 class="section-title">Produtos em Destaque</h2>
      <div class="section-rule" aria-hidden="true"></div>
    </div>

    <ProductCarousel :products="featured" />
  </main>
</template>

<style scoped>

.home-main {
  padding: 2rem;
  text-align: center; /* o conteúdo dos cards pode ficar centralizado, o título é controlado pelo header */
}

/*Style para esconder o título visualmente mas mantém para acessibilidade */
.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}

.home-subtitle {
  margin: 0 0 8px;
  color: #4b5563;
  font-size: 0.95rem;
}

/* Header da seção no estilo do Figma */
.section-header {
  max-width: 1120px;
  margin: 24px auto 20px;
  text-align: left;
  padding: 0 ;
}
.section-title {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.3;
  padding-bottom: 3px;
}
.section-rule {
  height: 1px;
  background: #000;
  width: 100%;
}
</style>
