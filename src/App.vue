<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import HeaderCheckout from '@/components/HeaderCheckout.vue';

const route = useRoute();

const isCheckoutPage = computed(() => {
  return route.name === 'checkout';
});
</script>

<template>
  <div id="app">
    <HeaderCheckout v-if="isCheckoutPage" />
    
    <RouterView />
    
  </div>
</template>

