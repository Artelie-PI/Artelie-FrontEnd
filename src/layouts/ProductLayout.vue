<script setup>
import HeaderVue from '@/components/HeaderVue.vue'
import FooterVue from '@/components/FooterVue.vue'
import RelatedProduct from '@/components/RelatedProduct.vue'
</script>

<template>
  <HeaderVue />
  <RouterView />
  <RelatedProduct />
  <FooterVue />
</template>
