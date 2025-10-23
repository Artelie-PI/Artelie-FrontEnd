<script setup>
import { useSidebarCart } from "@/stores/useSidebarCart.js";
const { isOpen, close } = useSidebarCart();
</script>

<template>
  <transition name="sidebar-cart">
    <div v-if="isOpen" class="sidebar-cart-overlay" @click.self="close">
      <aside class="sidebar-cart">
        <img src="/src/assets/images/Cancel.png" class="close-btn" @click="close" > </img>
        <h2 class="sidebar-title">A Sacola está vazia!</h2>
        <div class="empty-symbol" aria-hidden="true">
          <img src="/src/assets/images/Empty set.png" alt="sacola vazia" class="empty-icon" />
        </div>
        <button class="primary-btn" @click="close">Voltar à Loja</button>
        <p class="login-msg">
          Tem uma conta? 
        </p>
        <p>
          Faça <a href="#" class="login-link">LOGIN</a> para finalizar suas compras
        </p>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
.sidebar-cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15); /* low-light effect */
  z-index: 90;
  display: flex;
  justify-content: flex-end;
}

.sidebar-cart {
  width: 400px;
  max-width: 100vw;
  height: 100vh;
  background: #fff;
  position: relative;
  box-shadow: -6px 0 32px 0 rgba(23, 23, 23, 0.09);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 32px 32px;
  animation: slidein 0.4s;
}

@keyframes slidein {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.close-btn {
  width: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #191919;
  margin: 36px 0 16px 0;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.empty-symbol .empty-icon {
  width: 100px;
  margin: 16px 0 27px 0;
}

.primary-btn {
  background: #000787;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  height: 40px;
  padding: 0 34px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
}
.login-msg {
  color: black;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
}
.login-link {
  color: black;
  font-weight: 500;
}
</style>
