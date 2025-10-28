<script setup>
import { useSidebarCart } from "@/stores/useSidebarCart.js";
import { useCartStore } from "@/stores/cart.js";
import { RouterLink, useRouter } from "vue-router";

const { isOpen, close } = useSidebarCart();
const cartStore = useCartStore();
const router = useRouter();
function goToCheckout() {
  close();
  router.push({ name: 'cart' });
}
</script>

<template>
  <transition name="sidebar-cart">
    <div v-if="isOpen" class="sidebar-cart-overlay" @click.self="close">
      <aside class="sidebar-cart">
        <img src="/src/assets/images/Cancel.png" class="close-btn" @click="close" />

        <!-- Estado vazio -->
        <template v-if="cartStore.items.length === 0">
          <h2 class="sidebar-title">A Sacola está vazia!</h2>
          <div class="empty-symbol" aria-hidden="true">
            <img src="/src/assets/images/Empty set.png" alt="sacola vazia" class="empty-icon" />
          </div>
          <button class="buttonReturn" @click="close">Voltar à Loja</button>
          <p class="login-msg">Tem uma conta?</p>
          <p>
            Faça <RouterLink to="/login" class="login-link"> LOGIN</RouterLink> para finalizar suas compras
          </p>
        </template>

        <!-- Com itens -->
        <template v-else>
          <header class="sidebar-head">
            <h2 class="head-title">SUA SACOLA</h2>
            <img src="/src/assets/images/Shopping bag.png" alt="" class="head-bag" />
          </header>

          <div class="head-sep" aria-hidden="true"></div>

          <div class="cart-items-list">
            <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
              <img :src="item.image" :alt="item.title" class="cart-product-thumb" />
              <div class="cart-product-info">
                <p class="cart-product-title">{{ item.title }}</p>
                <div class="cart-product-actions">
                  <button @click="cartStore.addToCart(item, -1)" :disabled="item.quantity === 1">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="cartStore.addToCart(item, 1)">+</button>
                  <img
                    src="/src/assets/images/Cancel.png"
                    @click="cartStore.removeFromCart(item.id)"
                    class="remove-btn"
                  />
                  <span class="cart-product-price">
                    R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="cart-sep" aria-hidden="true"></div>

          <div class="cart-subtotal">
            <span>Subtotal:</span>
            <b>R$ {{
              cartStore.items
                .reduce((t, it) => t + it.price * it.quantity, 0)
                .toFixed(2)
                .replace('.', ',')
            }}</b>
          </div>

          <button class="buttonFinalizar" style="width: 100%; margin-bottom: 10px;" @click="goToCheckout">
            FINALIZAR COMPRA
          </button>
          <button class="buttonKeepingBuy" style="width: 100%;" @click="close">CONTINUAR COMPRANDO</button>
        </template>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
/* Animações de transição do Vue */
.sidebar-cart-enter-active,
.sidebar-cart-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-cart-enter-from,
.sidebar-cart-leave-to {
  opacity: 0;
}

.sidebar-cart-enter-active .sidebar-cart,
.sidebar-cart-leave-active .sidebar-cart {
  transition: transform 0.4s ease;
}

.sidebar-cart-enter-from .sidebar-cart,
.sidebar-cart-leave-to .sidebar-cart {
  transform: translateX(100%);
}

.sidebar-cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
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
}

.close-btn {
  width: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

/* Estado vazio (mantido) */
.sidebar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #000000;
  margin: 36px 0 16px 0;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.empty-symbol .empty-icon {
  width: 90px;
  margin: 10px 0 27px 0;
}

.buttonReturn {
  background: #000787;
  color: #ffffff;
  border: none;
  border-radius: 15px;
  font-size: 1.2rem;
  width: 50%;
  height: 35px;
  padding: 0 20px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
}

.login-msg {
  color: #000000;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
}

.login-link {
  color: black;
  font-weight: 500;
}

/* Cabeçalho (Figma) */
.sidebar-head {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0 50px 0;
}

.head-title {
  font-size: 1.55rem;
  font-weight: 600;
  color: #000000;
  margin: 0 10px 0 70px;
}

.head-bag {
  margin-bottom: 8px;
  width: 30px;
  height: 30px;
}

/* Linha separadora abaixo do título (full-bleed) */
.head-sep {
  width: calc(100% + 64px);
  height: 1px;
  background: #000000;
  opacity: 0.2;
}

/* Lista e itens */
.cart-items-list {
  width: 100%;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #F1F1F1;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-product-thumb {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 6px;
  background: #F7F7F7;
  border: 1px solid #EEE;
}

.cart-product-info {
  flex: 1;
}

.cart-product-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: #000000;
  margin: 0 0 8px 0;
  line-height: 1.25;
}

.cart-product-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.styleAddProducts {
  font-size: 0.8rem;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 0px 15px;
}

.cart-product-actions button {
  width: 35px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: #ffff;
  font-size: 0.8rem;
  cursor: pointer;
}

.cart-product-actions span {
  min-width: 16px;
  text-align: center;
  color: #000000;
  font-size: 0.8rem;
  font-weight: 500;
}

.remove-btn {
  width: 10px;
  height: 10px;
  margin-left: 2px;
  cursor: pointer;
  filter: grayscale(100%);
  opacity: .75;
}

.remove-btn:hover {
  opacity: 1;
}

.cart-product-price {
  margin-left: auto;
  color: #000000;
  font-size: 0.9rem;
}

/* Linha separadora antes do subtotal */
.cart-sep {
  width: calc(100% + 64px);
  height: 1px;
  background: #000000;
  opacity: 0.2;
  margin: 15px;
}

/* Subtotal */
.cart-subtotal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 10px 0 10px 0;
}

.buttonFinalizar {
  margin: 10px;
  color: #ffffff;
  background: #000000;
  border: none;
  font-size: 1.1rem;
  height: 45px;
  font-weight: 600;
  cursor: pointer;
}

.buttonKeepingBuy {
  background: #ffffff;
  color: #000787;
  border-color: #000787;
  font-size: 1.1rem;
  height: 45px;
  padding: 0 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>
