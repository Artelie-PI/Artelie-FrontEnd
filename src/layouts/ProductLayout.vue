<script setup>
import HeaderVue from '@/components/HeaderVue.vue'
import FooterVue from '@/components/FooterVue.vue'
import RelatedProduct from '@/components/RelatedProduct.vue'
import SidebarSacola from '@/components/SidebarSacola.vue'
</script>

<template>
  <HeaderVue />
  <SidebarSacola />
  <RouterView />
  <RelatedProduct />
  <FooterVue />
</template>
