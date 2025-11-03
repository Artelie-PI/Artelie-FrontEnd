<script setup>
import { useCartStore } from "@/stores/cart.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { fetchAddressByCep, calculateShipping } from "@/utils/shipping";
import { formatCEP } from "@/utils/masks";

const cartStore = useCartStore();
const router = useRouter();

const cepInput = ref('');
const shipping = ref(null);
const shippingError = ref('');
const isCalculatingShipping = ref(false);

const couponInput = ref('');
const discount = ref(0);

function goToHome() { router.push({ name: 'home' }); }

function goToCheckout() {
  if (!shipping.value) {
    alert('Por favor, calcule o frete antes de finalizar a compra');
    return;
  }
  cartStore.setShipping(shipping.value);
  router.push({ name: 'checkout' });
}

const formatPrice = (v) => v.toFixed(2).replace('.', ',');

const subtotal = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const total = computed(() =>
  subtotal.value - discount.value + (shipping.value?.value || 0)
);

function handleCEPInput(e) { cepInput.value = formatCEP(e.target.value); }

async function handleCalculateShipping() {
  shippingError.value = '';
  if (!cepInput.value) {
    shippingError.value = 'Digite um CEP';
    return;
  }
  isCalculatingShipping.value = true;
  try {
    const address = await fetchAddressByCep(cepInput.value);
    const shippingData = calculateShipping(cepInput.value, subtotal.value);
    shipping.value = { ...shippingData, cep: address.cep, city: address.city, state: address.state };
  } catch (err) {
    shippingError.value = err.message || 'Erro ao calcular frete';
    shipping.value = null;
  } finally {
    isCalculatingShipping.value = false;
  }
}

function handleApplyCoupon() {
  const valid = { DESCONTO10: 0.1, PRIMEIRACOMPRA: 0.15, ARTELIE20: 0.2 };
  const code = couponInput.value.toUpperCase().trim();
  if (valid[code]) {
    discount.value = subtotal.value * valid[code];
    alert(`Cupom aplicado! Desconto de ${(valid[code] * 100).toFixed(0)}%`);
  } else {
    alert('Cupom inválido');
    discount.value = 0;
  }
}
</script>

<template>
  <main class="cart-container">
    <template v-if="cartStore.items.length === 0">
      <div class="empty-cart">
        <div class="empty-header">
          <h1 class="page-title">BEM-VINDO À SACOLA</h1>
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
    </template>

    <template v-else>
      <div class="cart-layout">
        <section class="cart-left">
          <header class="cart-left-header">
            <h1 class="page-title">BEM-VINDO À SACOLA</h1>
            <img src="/src/assets/images/Shopping bag.png" alt="iconSacola" class="title-bag" />
          </header>

          <div class="cart-table">
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

              <div class="item-total">R$ {{ formatPrice(item.price * item.quantity) }}</div>
            </div>
          </div>
        </section>

        <aside class="cart-summary">
          <h2 class="summary-title">RESUMO DA COMPRA</h2>

          <!-- Labels acima, sem overflow no aside -->
          <div class="summary-field">
            <label for="coupon">Cupom de Desconto</label>
            <div class="field-group">
              <input id="coupon" type="text" placeholder="Digite o código de desconto" v-model="couponInput"
                @keyup.enter="handleApplyCoupon" />
              <button class="btn-apply" @click="handleApplyCoupon">APLICAR</button>
            </div>
          </div>

          <div class="summary-field">
            <label for="cep">Frete</label>
            <div class="field-group">
              <input id="cep" type="text" placeholder="Digite o seu CEP" :value="cepInput" @input="handleCEPInput"
                @keyup.enter="handleCalculateShipping" maxlength="9" />
              <button class="btn-apply" @click="handleCalculateShipping" :disabled="isCalculatingShipping">
                {{ isCalculatingShipping ? '...' : 'APLICAR' }}
              </button>
            </div>
            <p v-if="shippingError" class="error-text">{{ shippingError }}</p>
            <p v-if="shipping" class="shipping-info">
              {{ shipping.city }}/{{ shipping.state }} -
              <span v-if="shipping.isFree" class="free-shipping">FRETE GRÁTIS!</span>
              <span v-else>{{ shipping.estimatedDays }} dias úteis</span>
            </p>
          </div>

          <div class="summary-totals">
            <div class="total-line">
              <span>Subtotal - {{ cartStore.items.length }} itens</span>
              <span>R$ {{ formatPrice(subtotal) }}</span>
            </div>
            <div class="total-line" v-if="discount > 0">
              <span>Desconto Cupom</span>
              <span class="discount-value">R$ {{ formatPrice(discount) }}</span>
            </div>
            <div class="total-line">
              <span>Frete</span>
              <span v-if="shipping">
                <span v-if="shipping.isFree" class="free-shipping">GRÁTIS</span>
                <span v-else>R$ {{ formatPrice(shipping.value) }}</span>
              </span>
              <span v-else class="shipping-pending">Calcular</span>
            </div>
            <div class="total-line total-final">
              <span>TOTAL</span>
              <span>R$ {{ formatPrice(total) }}</span>
            </div>
            <p v-if="total >= 140" class="installment-info">
              ou 10x de R$ {{ formatPrice(total / 10) }} sem juros
            </p>
          </div>

          <button class="btn-checkout" @click="goToCheckout" :disabled="!shipping">
            FINALIZAR COMPRA
          </button>
          <button class="btn-continue" @click="goToHome">CONTINUAR COMPRANDO</button>
        </aside>
      </div>
    </template>
  </main>
</template>

<style scoped>
/* Container geral */
.cart-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Layout: duas colunas, aside não rola, apenas gruda (sticky) */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 30px;
  align-items: start;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

/* ===== ESTADO: SACOLA VAZIA ===== */
.empty-cart {
  text-align: center;
  padding: 40px 20px;
  max-width: 680px;
  margin: 0 auto;
}

.empty-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.page-title {
  /* mantém o mesmo título já usado quando há produtos */
  font-size: 1.8rem;
  text-shadow: 0 3px 2px rgba(0, 0, 0, .3);
  font-weight: 600;
  color: #000;
  margin: 0;
}

.title-bag {
  width: 32px;
  height: 32px;
}

.empty-message {
  font-size: 1.05rem;
  font-weight: 600;
  color: #000;
  margin: 14px 0 18px;
}

.empty-icon {
  margin: 18px 0 10px;
}

.empty-icon img {
  width: 120px;
  opacity: 0.6;
}

.empty-subtitle {
  font-size: 1rem;
  color: #333;
  margin: 18px 0 22px;
  line-height: 1.6;
}

.btn-primary {
  background: #000787;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin: 6px 0 18px;
  transition: background .2s;
}

.btn-primary:hover {
  background: #000565;
}

.login-text {
  font-size: 0.95rem;
  color: #333;
  margin-top: 12px;
  line-height: 1.6;
}

.login-link {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}

/* seção de “produtos interessantes” já existente abaixo do estado vazio */
.suggestions-section {
  max-width: 1120px;
  margin: 36px auto 0;
  padding: 0 16px;
}

.suggestions-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #000;
  text-align: left;
}


/* Coluna esquerda */
.cart-left-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.page-title {
  font-size: 1.8rem;
  text-shadow: 0 3px 2px rgba(0, 0, 0, .3);
  font-weight: 600;
  color: #000;
  margin: 0;
}

.title-bag {
  width: 32px;
  height: 32px;
}

.cart-table {
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
  font-size: 1rem;
  font-weight: 600;
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
  font-size: .9rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.item-price {
  font-size: .85rem;
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

.quantity-controls button:disabled {
  opacity: .4;
  cursor: not-allowed;
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

/* Aside: sem overflow/scroll, sticky simples */
.cart-summary {
  position: sticky;
  top: 24px;
  /* gruda na viewport ao rolar */
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  /* altura será natural do conteúdo */
}

.summary-title {
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: #000;
  margin: 0 0 20px 0;
}

/* Labels acima, botões sempre visíveis */
.summary-field {
  margin-bottom: 16px;
}

.summary-field label {
  display: block;
  font-size: .9rem;
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
  min-width: 0;
  /* evita quebra e “estouro” horizontal */
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: .85rem;
  color: #333;
}

.field-group input::placeholder {
  color: #999;
}

.btn-apply {
  background: #000787;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: .85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-apply:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.error-text {
  color: #e74c3c;
  font-size: .75rem;
  margin-top: 4px;
}

.shipping-info {
  font-size: .8rem;
  color: #555;
  margin-top: 6px;
}

.free-shipping {
  color: #27ae60;
  font-weight: 700;
}

.shipping-pending {
  color: #999;
  font-size: .85rem;
}

/* Totais e ações */
.summary-totals {
  margin: 20px 0;
  padding: 16px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: .9rem;
  color: #333;
}

.total-final {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  padding-top: 12px;
  border-top: 1px solid #333;
  margin-top: 12px;
}

.discount-value {
  color: #27ae60;
  font-weight: 600;
}

.installment-info {
  font-size: .8rem;
  color: #666;
  text-align: center;
  margin-top: 8px;
}

.btn-checkout,
.btn-continue {
  width: 100%;
  border-radius: 6px;
  padding: 14px;
  font-size: 1rem;
}

.btn-checkout {
  background: #000;
  color: #fff;
  border: none;
  font-weight: 700;
  margin-bottom: 12px;
}

.btn-checkout:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.btn-continue {
  background: #fff;
  color: #000787;
  border: 2px solid #000787;
  font-weight: 600;
}

/* Responsivo */
@media (max-width: 1024px) {
  .cart-summary {
    position: static;
  }
}
</style>
