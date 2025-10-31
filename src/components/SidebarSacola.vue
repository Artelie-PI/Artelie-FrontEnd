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
      <!-- Aplica classe condicional no container para alternar layout -->
      <aside class="sidebar-cart" :class="cartStore.items.length === 0 ? 'layout-vazio' : 'layout-itens'">
        <img src="/src/assets/images/Cancel.png" class="close-btn" @click="close" />

        <!-- Estado vazio: conteúdo centralizado, sem header de título -->
        <template v-if="cartStore.items.length === 0">
          <div class="empty-center">
            <h2 class="empty-title">A Sacola está vazia!</h2>
            <div class="empty-symbol" aria-hidden="true">
              <img src="/src/assets/images/Empty set.png" alt="sacola vazia" class="empty-icon" />
            </div>

            <button class="buttonReturn" @click="close">Voltar à Loja</button>

            <div class="empty-login">
              <p class="login-msg">Tem uma conta?</p>
              <p class="login-cta">
                Faça <RouterLink to="/login" class="login-link">LOGIN</RouterLink> para finalizar suas compras
              </p>
            </div>
          </div>
        </template>

        <!-- Com itens: header + lista (topo) + footer fixo -->
        <template v-else>
          <!-- Header -->
          <header class="sidebar-head">
            <h2 class="head-title">SUA SACOLA</h2>
            <img src="/src/assets/images/Shopping bag.png" alt="" class="head-bag" />
          </header>
          <div class="head-sep" aria-hidden="true"></div>

          <!-- Lista rolável iniciando no topo -->
          <div class="cart-scroll">
            <div class="cart-items-list">
              <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
                <img :src="item.image" :alt="item.title" class="cart-product-thumb" />
                <div class="cart-product-info">
                  <p class="cart-product-title">{{ item.title }}</p>
                  <div class="cart-product-actions">
                    <div class="qty-label">
                    <button @click="cartStore.addToCart(item, -1)" :disabled="item.quantity === 1"><p>-</p></button>
                    <span>{{ item.quantity }}</span>
                    <button @click="cartStore.addToCart(item, 1)"><p>+</p></button>
                    </div>
                    <img src="/src/assets/images/Cancel.png" @click="cartStore.removeFromCart(item.id)"
                      class="remove-btn" />
                    <span class="cart-product-price">
                      R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer fixo -->
          <div class="cart-footer">
            <div class="cart-sep" aria-hidden="true"></div>
            <div class="cart-subtotal">
              <span>Subtotal:</span>
              R$ {{
                cartStore.items
                  .reduce((t, it) => t + it.price * it.quantity, 0)
                  .toFixed(2)
                  .replace('.', ',')
              }}
            </div>

            <button class="buttonFinalizar" @click="goToCheckout">IR PARA À SACOLA</button>
            <button class="buttonKeepingBuy" @click="close">CONTINUAR COMPRANDO</button>
          </div>
        </template>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
/* Transições */
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

/* Overlay */
.sidebar-cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 90;
  display: flex;
  justify-content: flex-end;
}

/* Container base */
.sidebar-cart {
  width: 400px;
  max-width: 100vw;
  height: 100vh;
  background: #fff;
  position: relative;
  box-shadow: -6px 0 32px 0 rgba(23, 23, 23, 0.09);
}

/* Botão fechar */
.close-btn {
  width: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

/* Layouts */
.layout-vazio {
  display: grid;
  grid-template-rows: 100%;
  place-items: center;
  /* centraliza horizontal e vertical */
  padding: 24px;
  /* respiro interno */
}

.layout-itens {
  display: grid;
  grid-template-rows: auto 1px 1fr auto;
  /* header | separador | scroll | footer */
}

/* Estado vazio */
.empty-center {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.empty-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 12px 0;
}

.empty-symbol {
  margin: 12px 0 16px 0;
}

.empty-icon {
  width: 96px;
  height: auto;
}

.buttonReturn {
  background: #000787;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1.2rem;
  padding: 4px 30px;
  font-weight: 600;
  cursor: pointer;
  margin: 8px 0 12px 0;
}

.empty-login {
  margin-top: 4px;
}

.login-msg {
  color: #000;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 4px 0;
}

.login-cta {
  margin: 0;
}

.login-link {
  color: #000;
  font-weight: 500;
  text-decoration: underline;  height: 100px;

}

/* Header (apenas com itens) */
.sidebar-head {
  padding: 20px 24px 14px 24px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.head-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  margin: 45px 0 40px 70px;
}

.head-bag {
  width: 28px;
  height: 28px;
}

.head-sep {
  height: 1px;
  background: #000;
  opacity: 0.12;
  width: 100%;
}

/* Área rolável (lista) — começa no topo */
.cart-scroll {
  min-height: 0;
  overflow: auto;
  padding: 0 24px;
}

.cart-items-list {
  width: 100%;
  padding: 12px 0 8px 0;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
/* border-bottom: 1px solid #F1F1F1; */
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-product-thumb {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background: none;
}

.cart-product-info {
  height: 100px;
  flex: 1;
}

.cart-product-title {
  font-size: 0.92rem;
  font-weight: 400;
  color: #000;
  margin: 0 0 8px 0;
}

.cart-product-actions {
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-label {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #000;
  border-radius: 10px;
}

.cart-product-actions button {
  width: 40px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
}

.cart-product-actions span {
  min-width: 16px;
  text-align: center;
  color: #000;
  font-size: 0.9rem;
}

.remove-btn {
  width: 12px;
  height: 12px;
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
}

/* Footer fixo */
.cart-footer {
  padding: 12px 24px 24px 24px;
  background: #fff;
  position: sticky;
  bottom: 0;
  z-index: 1;
}

.cart-sep {
  height: 1px;
  background: #000;
  opacity: 0.12;
  margin: 0 0 12px 0;
  width: 100%;
}

.cart-subtotal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 12px 0;
}

/* Botões */
.buttonFinalizar,
.buttonKeepingBuy {
  width: 100%;
  min-height: 48px;
  height: 48px;
  border-radius: 8px;
}

.buttonFinalizar {
  margin: 8px 0;
  color: #fff;
  background: #000;
  border: none;
  font-size: 1.06rem;
  font-weight: 600;
  cursor: pointer;
}

.buttonKeepingBuy {
  background: #fff;
  color: #000787;
  border: 2px solid #000787;
  font-size: 1.06rem;
  font-weight: 600;
  cursor: pointer;
}

/* Responsivo */
@media (max-width: 420px) {
  .sidebar-cart {
    width: 100vw;
  }

  .head-title {
    font-size: 1.6rem;
  }
}
</style>
