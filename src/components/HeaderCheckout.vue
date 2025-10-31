<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToHome() {
  router.push({ name: 'home' });
}
</script>

<template>
  <header class="checkout-header">
    <div class="header-container">
      <img 
        src="@/assets/images/ArtelieLogo.png" 
        alt="Artelié Online" 
        class="logo"
        @click="goToHome"
      />
      
      <div class="secure-badge">
        <span class="lock-icon">🔒</span>
        <span class="secure-text">Compra Segura</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.checkout-header {
  background: #fff;
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 45px;
  cursor: pointer;
  transition: transform 0.2s;
}

.logo:hover {
  transform: scale(1.05);
}

.secure-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.lock-icon {
  font-size: 1.1rem;
  color: #27ae60;
}

.secure-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}

@media (max-width: 768px) {
  .header-container {
    padding: 12px 16px;
  }
  
  .logo {
    height: 38px;
  }
  
  .secure-text {
    display: none;
  }
}
</style>
