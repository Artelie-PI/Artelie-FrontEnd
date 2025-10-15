<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const router = useRouter();
const cartStore = useCartStore();

const couponCode = ref("");
const cep = ref("");
const discount = ref(0);
const shipping = ref(0);

const address = ref({
  logradouro: "",
  bairro: "",
  localidade: "",
  uf: "",
});
const addressFetched = ref(false);

// Navegação
function voltarLoja() {
  router.push("/");
}

// Controle de quantidade
function increase(item) {
  item.quantity++;
}
function decrease(item) {
  if (item.quantity > 1) item.quantity--;
}

// Cupom
function applyCoupon() {
  if (couponCode.value.trim().toUpperCase() === "GBI15") {
    discount.value = cartStore.totalPrice * 0.15;
    alert("Cupom aplicado com sucesso! Desconto de 15%.");
  }
  else if (couponCode.value.trim().toUpperCase() === "CAGE777") {
    discount.value = cartStore.totalPrice * 0.90;
    alert("Cupom aplicado com sucesso! Desconto de 90%.");
  }
  else if (couponCode.value.trim().toUpperCase() === "MURILO10") {
    discount.value = cartStore.totalPrice * 0.10;
    alert("Cupom aplicado com sucesso! Desconto de 10%.");
  }
  else if (couponCode.value.trim().toUpperCase() === "FRETEGRATIS"  ) {
    discount.value = shipping.value;
    alert("Cupom aplicado com sucesso! Frete grátis.");
  }
  else if (couponCode.value.trim() === "") {
    discount.value = 0;
    alert("Por favor, insira um código de cupom.");
  }
   else {
    discount.value = 0;
    alert("Cupom inválido.");
  }
}

// Frete e endereço
async function calculateShipping() {
  const cepNumber = cep.value.replace(/\D/g, "");
  if (cepNumber.length !== 8) {
    alert("CEP inválido.");
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepNumber}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      shipping.value = 0;
      addressFetched.value = false;
      return;
    }

    address.value = {
      logradouro: data.logradouro || "",
      bairro: data.bairro || "",
      localidade: data.localidade || "",
      uf: data.uf || "",
    };
    addressFetched.value = true;

    // Verifica se há campos faltando
    const missingFields = [];
    if (!address.value.logradouro) missingFields.push("Rua");
    if (!address.value.bairro) missingFields.push("Bairro");
    if (!address.value.localidade) missingFields.push("Cidade");
    if (!address.value.uf) missingFields.push("Estado");

    if (missingFields.length > 0) {
      alert(
        `O CEP não retornou todas as informações. Por favor, preencha manualmente: ${missingFields.join(
          ", "
        )}.`
      );
    }

    // Frete
    shipping.value = data.uf === "SC" ? 0 : 32;
  } catch {
    alert("Erro ao buscar informações do CEP.");
  }
}

const totalWithDiscountAndShipping = computed(() => {
  return cartStore.totalPrice - discount.value + shipping.value;
});
</script>

<template>
  <div class="cart-page">
    <!-- Estado: sacola vazia -->
    <section v-if="cartStore.items.length === 0" class="empty-wrap">
      <h1 class="title">
        BEM-VINDO À SACOLA <img src="/src/assets/images/Shopping bag.png" alt="sacola" />
      </h1>

      <p class="subtitle">A Sacola está vazia!</p>

      <img src="/src/assets/images/Empty set.png" alt="sacola vazia" class="empty-icon" />

      <p class="lead">
        Que tal retornar à nossa página principal e procurar pelos melhores produtos?
      </p>

      <button class="btn voltar" @click="voltarLoja">VOLTAR À LOJA</button>

      <p class="login-text">
        Tem uma conta? <span class="login-link">LOGIN</span> para finalizar suas compras
      </p>
    </section>

    <!-- Estado: com produtos -->
    <div v-else class="cart-container">
      <h1 class="title">
        BEM-VINDO À SACOLA <img src="@/assets/images/Shopping bag.png" alt="" />
      </h1>

      <div class="cart-content">
        <!-- Lista de produtos -->
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
              <td class="product-info">
                <img :src="item.image" alt="Produto" />
                <div>
                  <p class="product-name">{{ item.name }}</p>
                  <p class="product-price">R$ {{ item.price.toFixed(2) }}</p>
                </div>
              </td>
              <td class="quantity-control">
                <button @click="decrease(item)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="increase(item)">+</button>
              </td>
              <td class="product-total">R$ {{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Resumo -->
        <aside class="summary">
          <h2>RESUMO DA COMPRA</h2>

          <!-- Cupom -->
          <div class="summary-section">
            <label>Cupom de Desconto</label>
            <div class="input-row">
              <input v-model="couponCode" type="text" placeholder="Digite o código de desconto" />
              <button @click="applyCoupon">APLICAR</button>
            </div>
          </div>

          <!-- Frete -->
          <div class="summary-section">
            <label>Frete</label>
            <div class="input-row">
              <input v-model="cep" type="text" placeholder="Digite o seu CEP" />
              <button @click="calculateShipping">APLICAR</button>
            </div>

            <!-- Dados do endereço -->
            <div v-if="addressFetched" class="address-info">
              <p>
                <strong>Rua:</strong>
                <span v-if="address.logradouro">{{ address.logradouro }}</span>
                <input v-else v-model="address.logradouro" placeholder="Informe sua rua" />
              </p>
              <p>
                <strong>Bairro:</strong>
                <span v-if="address.bairro">{{ address.bairro }}</span>
                <input v-else v-model="address.bairro" placeholder="Informe seu bairro" />
              </p>
              <p>
                <strong>Cidade:</strong>
                <span v-if="address.localidade">{{ address.localidade }}</span>
                <input v-else v-model="address.localidade" placeholder="Informe sua cidade" />
              </p>
              <p>
                <strong>Estado:</strong>
                <span v-if="address.uf">{{ address.uf }}</span>
                <input v-else v-model="address.uf" placeholder="Informe seu estado" />
              </p>
            </div>
          </div>

          <!-- Totais -->
          <div class="summary-totals">
            <p>
              Subtotal - {{ cartStore.items.length }} itens
              <span>R$ {{ cartStore.totalPrice.toFixed(2) }}</span>
            </p>
            <p>
              Desconto Cupom <span>- R$ {{ discount.toFixed(2) }}</span>
            </p>
            <p>
              Frete <span>R$ {{ shipping.toFixed(2) }}</span>
            </p>
            <hr />
            <p class="total">
              TOTAL <span>R$ {{ totalWithDiscountAndShipping.toFixed(2) }}</span>
            </p>
          </div>

          <button class="btn-finalizar">FINALIZAR COMPRA</button>
          <button class="btn-continuar" @click="voltarLoja">CONTINUAR COMPRANDO</button>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== SACOLA VAZIA ===== */
.empty-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 3rem 1rem;
  font-family: "Inter", sans-serif;
}
.empty-wrap .title {
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.empty-wrap .subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.empty-wrap .empty-icon {
  width: 150px;
  margin-bottom: 2rem;
}
.empty-wrap .lead {
  font-size: 1rem;
  color: #333;
  max-width: 480px;
  margin-bottom: 1.5rem;
}
.empty-wrap .btn.voltar {
  background-color: #0a0a9f;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease;
}
.empty-wrap .btn.voltar:hover {
  background-color: #05056d;
}
.empty-wrap .login-text {
  margin-top: 2rem;
  font-size: 0.95rem;
}
.empty-wrap .login-link {
  font-weight: bold;
  color: #000;
  text-decoration: underline;
  cursor: pointer;
}

/* ===== SACOLA COM ITENS ===== */
.cart-container {
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
  align-items: center;
  margin: 2rem;
}
.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left;
  width: 100%;
}
.title > img {
  width: 40px;
  height: 40px;
  margin-left: 0.5rem;
}
.cart-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
}
.cart-table {
  width: 70%;
  border-collapse: collapse;
}
.cart-table th {
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #000;
  padding: 0.8rem 0;
}
.cart-table td {
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}
.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.product-info img {
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.quantity-control button {
  border: 1px solid #ccc;
  background: none;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-weight: bold;
}
.summary {
  width: 30%;
  border: 1px solid #e5e5e5;
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input-row {
  display: flex;
  margin-top: 0.4rem;
}
.input-row input {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 0.9rem;
}
.input-row button {
  background: #0a0a0a;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.4rem;
}
.address-info {
  margin-top: 1rem;
  background: #f8f8f8;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
}
.address-info p {
  margin: 0.3rem 0;
}
.address-info input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #aaa;
  background: transparent;
  font-size: 0.9rem;
}
.summary-totals {
  font-size: 0.9rem;
  color: #333;
}
.summary-totals p {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
}
.summary-totals .total {
  font-weight: bold;
  margin-top: 0.6rem;
}
.btn-finalizar {
  background: #000;
  color: white;
  padding: 0.8rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
.btn-continuar {
  background: white;
  color: #000;
  padding: 0.7rem;
  border: 1px solid #000;
  cursor: pointer;
  font-weight: bold;
}
</style>
