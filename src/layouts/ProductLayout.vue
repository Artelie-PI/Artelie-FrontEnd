<script setup>
import HeaderVue from '@/components/HeaderVue.vue'
import FooterVue from '@/components/FooterVue.vue'
import RelatedProduct from '@/components/RelatedProduct.vue'
</script>

<template>
  <HeaderVue />

  <!-- Aqui aparece o conteúdo dinâmico do produto -->
  <router-view />

  <!-- Sempre mostra relacionados abaixo -->
  <RelatedProduct />

  <FooterVue />
</template>
