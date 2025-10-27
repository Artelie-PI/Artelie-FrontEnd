<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: { type: String, default: 'medium' }, // 'small' | 'medium' | 'large'
  message: { type: String, default: '' }
});

const sizeMap = {
  small: '32px',
  medium: '48px',
  large: '64px',
};

const pixelSize = computed(() => sizeMap[props.size] || sizeMap.medium);
</script>

<template>
  <div class="loading-container" role="status" aria-live="polite">
    <div class="spinner" :style="{ width: pixelSize, height: pixelSize }"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  min-height: 300px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.loading-message {
  margin-top: 1.5rem;
  color: #666;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
}
</style>
