<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const router = useRouter();
const cartStore = useCartStore();

function voltarLoja() {
  router.push("/");
}

function login() {
  router.push("/login");
}

function increase(item) {
  item.quantity++;
}
function decrease(item) {
  if (item.quantity > 1) item.quantity--;
}
</script>

<template>
  <div class="cart-page">
    <section v-if="cartStore.items.length === 0" class="empty-wrap">
      <h1 class="title">
        Bem-Vindo à Sacola
        <img src="/src/assets/images/Shopping bag.png" alt="" />
      </h1>

      <p class="subtitle">A Sacola está vazia!</p>
      <img src="/src/assets/images/Empty set.png" alt="" />

      <p class="lead">
        Que tal retornar à nossa página principal e procurar pelos melhores produtos?
      </p>
      <p class="lead">
        Já tem uma conta? <span @click="login" class="login-link">Entrar</span>
      </p>

      <button class="btn" @click="voltarLoja">Voltar à Loja</button>
    </section>

    
    <section v-else class="cart-content">
      <div class="cart-products">
        <h1>Bem-Vindo à Sacola 🛍️</h1>
        <table class="cart-table">
          <thead>
            <tr>
              <th>PRODUTO</th>
              <th>QUANTIDADE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.id">
              <td class="product-cell">
                <img :src="item.image" class="product-img" />
                <div>
                  <h3>{{ item.name }}</h3>
                  <p>R$ {{ item.price.toFixed(2) }}</p>
                </div>
              </td>
              <td class="quantity-cell">
                <button @click="decrease(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increase(item)">+</button>
                <button class="remove" @click="cartStore.removeFromCart(item.id)">×</button>
              </td>
              <td class="total-cell">R$ {{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

     
      <div class="cart-summary">
        <h2>RESUMO DA COMPRA</h2>

        <div class="summary-field">
          <label>Cupom de Desconto</label>
          <div class="input-group">
            <input type="text" placeholder="Digite o código de desconto" />
            <button class="apply">Aplicar</button>
          </div>
        </div>

        <div class="summary-field">
          <label>Frete</label>
          <div class="input-group">
            <input type="text" placeholder="Digite o seu CEP" />
            <button class="apply">Aplicar</button>
          </div>
        </div>

        <div class="summary-values">
          <p>
            Subtotal - {{ cartStore.items.length }} itens
            <span>R$ {{ cartStore.totalPrice.toFixed(2) }}</span>
          </p>
          <p>Desconto Cupom <span>R$ 0,00</span></p>
          <p>Desconto Frete <span>R$ 32,00</span></p>
          <h3>
            TOTAL
            <span>R$ {{ cartStore.totalPrice.toFixed(2) }}</span>
          </h3>
        </div>

        <button class="checkout">Finalizar Compra</button>
        <button class="continue" @click="voltarLoja">Continuar Comprando</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cart-page {
  font-family: "Inter", sans-serif;
  background: #fff;
  color: #111;
  min-height: 100vh;
  padding: 2rem;
}

.empty-wrap {
  text-align: center;
  max-width: 560px;
  margin: auto;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 26px;
  margin-bottom: 12px;
  color: #111;
}

.subtitle {
  font-weight: 500;
  font-size: 18px;
  margin: 10px 0 20px;
  color: #333;
}

.empty-wrap img {
  max-width: 500px;
  margin: 20px auto;
  display: block;
}

.lead {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin: 15px 0 25px;
}


.btn {
  padding: 14px 36px;
  border-radius: 12px;
  background: #001c80;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  width: 220px;
}
.btn:hover {
  background: #000f4d;
}


.login-link {
  font-weight: 700;
  color: #001c80;
  cursor: pointer;
}
.login-link:hover {
  text-decoration: underline;
}

.cart-content {
  display: flex;
  gap: 2rem;
}


.cart-products {
  flex: 2;
}

.cart-products h1 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th {
  text-align: left;
  font-weight: 700;
  border-bottom: 2px solid #ddd;
  padding: 0.8rem;
}

.cart-table td {
  border-bottom: 1px solid #eee;
  padding: 1rem;
  vertical-align: middle;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.quantity-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-cell button {
  border: 1px solid #aaa;
  background: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
}

.quantity-cell .remove {
  color: #d00;
  font-size: 18px;
  border: none;
  background: none;
}

.total-cell {
  font-weight: 700;
}

.cart-summary {
  flex: 1;
  padding: 1.5rem;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.cart-summary h2 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 1rem;
}

.summary-field {
  margin-bottom: 1rem;
}

.summary-field label {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.input-group {
  display: flex;
  gap: 8px;
}

.input-group input {
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #111;
  outline: none;
}

.input-group .apply {
  background: #001c80;
  color: #fff;
  border: none;
  padding: 0 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
}

.summary-values p,
.summary-values h3 {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}

.summary-values h3 {
  font-weight: 800;
  margin-top: 1rem;
}

.checkout {
  width: 100%;
  background: #000;
  color: #fff;
  padding: 14px;
  border: none;
  margin-top: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.continue {
  width: 100%;
  background: #fff;
  color: #001c80;
  border: 2px solid #001c80;
  padding: 14px;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
