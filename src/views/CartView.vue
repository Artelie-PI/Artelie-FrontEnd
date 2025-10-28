<script setup>
import { useCartStore } from "@/stores/cart.js";
import { useRouter } from "vue-router";
import { computed } from "vue";
const cartStore = useCartStore();
const router = useRouter();

function goToHome() {
  router.push({ name: 'home' });
}

const formatPrice = (value) => {
  return value.toFixed(2).replace('.', ',');
};

const subtotal = computed(() => {
  return cartStore.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});
</script>

<template>
  <main class="cart-container">
    <!-- Estado vazio -->
    <template v-if="cartStore.items.length === 0">
      <div class="empty-cart">
        <div class="empty-header">
          <h1 class="empty-title">BEM-VINDO À SACOLA</h1>
          <img src="/src/assets/images/Shopping bag.png" alt="" class="title-bag" />
        </div>
        
        <p class="empty-message">A Sacola está vazia!</p>
        
        <div class="empty-icon">
          <img src="/src/assets/images/Empty set.png" alt="Sacola vazia" />
        </div>
        
        <p class="empty-subtitle">
          Que tal retornar à nossa página principal e<br>procurar pelos melhores produtos
        </p>
        
        <button class="btn-primary" @click="goToHome">VOLTAR À LOJA</button>
        
        <p class="login-text">
          Tem uma conta?<br>
          Faça <RouterLink to="/login" class="login-link">LOGIN</RouterLink> para finalizar suas compras
        </p>
      </div>

      <!-- Produtos interessantes -->
      <section class="suggestions">
        <h2 class="suggestions-title">Conheça alguns produtos interessantes</h2>
        <div class="suggestions-line"></div>
        <!-- Aqui você pode adicionar um componente de produtos relacionados -->>
      </section>
    </template>

    <!-- Com itens -->
    <template v-else>
      <div class="cart-header">
        <h1 class="cart-title">BEM-VINDO À SACOLA</h1>
        <img src="/src/assets/images/Shopping bag.png" alt="" class="title-bag" />
      </div>

      <div class="cart-content">
        <!-- Lista de produtos -->
        <div class="cart-items">
          <div class="table-header">
            <span>PRODUTO</span>
            <span>QUANTIDADE</span>
            <span>TOTAL</span>
          </div>

          <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
            <div class="item-product">
              <img :src="item.image" :alt="item.title" class="item-image" />
              <div class="item-info">
                <p class="item-title">{{ item.title }}</p>
                <p class="item-price">R$ {{ formatPrice(item.price) }}</p>
              </div>
            </div>

            <div class="item-quantity">
              <div class="quantity-controls">
                <button @click="cartStore.addToCart(item, -1)" :disabled="item.quantity === 1">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.addToCart(item, 1)">+</button>
              </div>
              <button class="remove-btn" @click="cartStore.removeFromCart(item.id)">×</button>
            </div>

            <div class="item-total">
              R$ {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <!-- Resumo -->
        <aside class="cart-summary">
          <h2 class="summary-title">RESUMO DA COMPRA</h2>

          <div class="summary-field">
            <label>Cupom de Desconto</label>
            <div class="field-group">
              <input type="text" placeholder="Digite o código de desconto" />
              <button class="btn-apply">APLICAR</button>
            </div>
          </div>

          <div class="summary-field">
            <label>Frete</label>
            <div class="field-group">
              <input type="text" placeholder="Digite o seu CEP" />
              <button class="btn-apply">APLICAR</button>
            </div>
          </div>

          <div class="summary-totals">
            <div class="total-line">
              <span>Subtotal - {{ cartStore.items.length }} itens</span>
              <span>R$ {{ formatPrice(subtotal) }}</span>
            </div>
            <div class="total-line">
              <span>Desconto Cupom</span>
              <span>R$ 0,00</span>
            </div>
            <div class="total-line">
              <span>Frete</span>
              <span>R$ 32,00</span>
            </div>
            <div class="total-line total-final">
              <span>TOTAL</span>
              <span>R$ {{ formatPrice(subtotal + 32) }}</span>
            </div>
          </div>

          <button class="btn-checkout">FINALIZAR COMPRA</button>
          <button class="btn-continue" @click="goToHome">CONTINUAR COMPRANDO</button>
        </aside>
      </div>

      <!-- Produtos interessantes -->
      <section class="suggestions">
        <h2 class="suggestions-title">Conheça alguns produtos interessantes</h2>
        <div class="suggestions-line"></div>
        <!-- Aqui você pode adicionar um componente de produtos relacionados -->
      </section>
    </template>
  </main>
</template>

<style scoped>
.cart-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Estado vazio */
.empty-cart {
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.empty-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.empty-title, .cart-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
  letter-spacing: 0.02em;
  margin: 0;
}

.title-bag {
  width: 32px;
  height: 32px;
}

.empty-message {
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin: 20px 0;
}

.empty-icon {
  margin: 30px 0;
}

.empty-icon img {
  width: 120px;
  opacity: 0.6;
}

.empty-subtitle {
  font-size: 1rem;
  color: #333;
  margin: 20px 0 30px;
  line-height: 1.6;
}

.btn-primary {
  background: #0B1E9F;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 20px;
}

.login-text {
  font-size: 0.95rem;
  color: #333;
  margin-top: 20px;
  line-height: 1.6;
}

.login-link {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}

/* Com itens */
.cart-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  margin-bottom: 50px;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

/* Lista de produtos */
.cart-items {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 200px 140px;
  gap: 20px;
  padding: 16px 20px;
  background: #f8f8f8;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.85rem;
  font-weight: 700;
  color: #000;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr 200px 140px;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-product {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.item-price {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 4px 8px;
}

.quantity-controls button {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  color: #000;
}

.quantity-controls span {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
}

.remove-btn:hover {
  color: #f00;
}

.item-total {
  text-align: right;
  font-weight: 700;
  color: #000;
  font-size: 1rem;
}

/* Resumo */
.cart-summary {
  background: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  align-self: flex-start;
  position: sticky;
  top: 20px;
}

.summary-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 20px 0;
}

.summary-field {
  margin-bottom: 16px;
}

.summary-field label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
}

.field-group {
  display: flex;
  gap: 8px;
}

.field-group input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
}

.btn-apply {
  background: #0B1E9F;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.summary-totals {
  margin: 20px 0;
  padding-top: 16px;
  border-top: 1px solid #ddd;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #333;
}

.total-final {
  font-size: 1.05rem;
  font-weight: 700;
  color: #000;
  padding-top: 12px;
  border-top: 1px solid #ddd;
  margin-top: 12px;
}

.btn-checkout {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 12px;
}

.btn-continue {
  width: 100%;
  background: #fff;
  color: #0B1E9F;
  border: 2px solid #0B1E9F;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

/* Sugestões */
.suggestions {
  margin-top: 60px;
}

.suggestions-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
}

.suggestions-line {
  height: 1px;
  background: #000;
  opacity: 0.2;
  margin-bottom: 30px;
}
</style>
