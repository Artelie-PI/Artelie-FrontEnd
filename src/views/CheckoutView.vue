<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { fetchAddressByCep } from '@/utils/shipping';
import { formatCPF, formatDate, formatPhone, formatCEP, formatCardNumber, formatCardExpiry, formatCVV } from '@/utils/masks';

import FooterVue from '@/components/FooterVue.vue';
const router = useRouter();
const cartStore = useCartStore();

onMounted(() => {
  if (cartStore.items.length === 0) {
    router.push({ name: 'cart' });
  }
});

const currentStep = ref(1);

const customerData = ref({
  name: '',
  surname: '',
  birthdate: '',
  cpf: '',
  email: '',
  phone: ''
});

const savedAddresses = ref([
  {
    id: 1,
    name: 'Nome da Rua(Endereço), Número complemento(se tiver)',
    cep: '',
    neighborhood: 'Bairro - Cidade - Estado(UF)'
  }
]);

const selectedAddressId = ref(null);

const newAddress = ref({
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
});

const isAddingNewAddress = ref(false);
const isLoadingCep = ref(false);

const paymentMethod = ref('pix');

const cardData = ref({
  number: '',
  name: '',
  cvv: '',
  expiry: '',
  cpf: '',
  installments: 1
});

const pixData = ref({
  qrCode: '',
  pixKey: '',
  expiresIn: 600
});

const subtotal = computed(() => {
  return cartStore.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const shipping = computed(() => cartStore.shipping || { value: 0 });

const total = computed(() => {
  return subtotal.value + shipping.value.value;
});

const formatPrice = (value) => {
  return value.toFixed(2).replace('.', ',');
};

const installmentOptions = computed(() => {
  const options = [];
  const maxInstallments = total.value >= 140 ? 10 : 1;
  
  for (let i = 1; i <= maxInstallments; i++) {
    options.push({
      value: i,
      label: `${i}x R$ ${formatPrice(total.value / i)} ${i === 1 ? '' : 'sem juros'}`
    });
  }
  
  return options;
});

function handleCPFInput(event) {
  customerData.value.cpf = formatCPF(event.target.value);
}

function handleDateInput(event) {
  customerData.value.birthdate = formatDate(event.target.value);
}

function handlePhoneInput(event) {
  customerData.value.phone = formatPhone(event.target.value);
}

function handleCEPInput(event) {
  newAddress.value.cep = formatCEP(event.target.value);
}

function handleCardNumberInput(event) {
  cardData.value.number = formatCardNumber(event.target.value);
}

function handleCardExpiryInput(event) {
  cardData.value.expiry = formatCardExpiry(event.target.value);
}

function handleCardCVVInput(event) {
  cardData.value.cvv = formatCVV(event.target.value);
}

function handleCardCPFInput(event) {
  cardData.value.cpf = formatCPF(event.target.value);
}

function goToStep(step) {
  currentStep.value = step;
}

function handleContinueStep1() {
  if (!customerData.value.name || !customerData.value.email || !customerData.value.cpf) {
    alert('Preencha todos os campos obrigatórios');
    return;
  }
  
  goToStep(2);
}

async function handleSearchCep() {
  if (!newAddress.value.cep) return;
  
  isLoadingCep.value = true;
  
  try {
    const address = await fetchAddressByCep(newAddress.value.cep);
    
    newAddress.value.street = address.street;
    newAddress.value.neighborhood = address.neighborhood;
    newAddress.value.city = address.city;
    newAddress.value.state = address.state;
  } catch {
    alert('CEP não encontrado');
  } finally {
    isLoadingCep.value = false;
  }
}

function handleAddNewAddress() {
  isAddingNewAddress.value = true;
}

function handleSaveAddress() {
  if (!newAddress.value.cep || !newAddress.value.street || !newAddress.value.number) {
    alert('Preencha todos os campos do endereço');
    return;
  }
  
  const addressId = savedAddresses.value.length + 1;
  savedAddresses.value.push({
    id: addressId,
    name: `${newAddress.value.street}, ${newAddress.value.number}${newAddress.value.complement ? ' - ' + newAddress.value.complement : ''}`,
    cep: newAddress.value.cep,
    neighborhood: `${newAddress.value.neighborhood} - ${newAddress.value.city} - ${newAddress.value.state}`
  });
  
  selectedAddressId.value = addressId;
  isAddingNewAddress.value = false;
  
  newAddress.value = {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  };
}

function handleContinueStep2() {
  if (!selectedAddressId.value) {
    alert('Selecione um endereço de entrega');
    return;
  }
  
  goToStep(3);
}

function handleBackToCart() {
  router.push({ name: 'cart' });
}

async function handleFinalizeOrder() {
  if (paymentMethod.value === 'credit_card') {
    if (!cardData.value.number || !cardData.value.name || !cardData.value.cvv || !cardData.value.expiry) {
      alert('Preencha todos os dados do cartão');
      return;
    }
    
    alert('Processando pagamento...');
    
    setTimeout(() => {
      alert('Pedido realizado com sucesso! 🎉');
      cartStore.clearCart();
      router.push({ name: 'home' });
    }, 2000);
    
  } else if (paymentMethod.value === 'pix') {
    await generatePixPayment();
  }
}

async function generatePixPayment() {
  pixData.value = {
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    pixKey: `${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
    expiresIn: 600
  };
  
  alert('QR Code PIX gerado! Escaneie para pagar.');
  
  const countdown = setInterval(() => {
    pixData.value.expiresIn--;
    
    if (pixData.value.expiresIn <= 0) {
      clearInterval(countdown);
      alert('Tempo expirado! Gere um novo código.');
    }
  }, 1000);
}

function copyPixKey() {
  navigator.clipboard.writeText(pixData.value.pixKey);
  alert('Código copiado!');
}

const formatExpiryTime = computed(() => {
  const minutes = Math.floor(pixData.value.expiresIn / 60);
  const seconds = pixData.value.expiresIn % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<template>
  <main class="checkout-container">
    <div class="checkout-content">
      <div class="checkout-form">
        <div class="steps-header">
          <div 
            class="step" 
            :class="{ active: currentStep === 1, completed: currentStep > 1 }"
            @click="currentStep > 1 && goToStep(1)"
          >
            <span class="step-number">1</span>
            <span class="step-label">SEUS DADOS</span>
          </div>
          
          <div 
            class="step" 
            :class="{ active: currentStep === 2, completed: currentStep > 2 }"
            @click="currentStep > 2 && goToStep(2)"
          >
            <span class="step-number">2</span>
            <span class="step-label">ENTREGA</span>
          </div>
          
          <div 
            class="step" 
            :class="{ active: currentStep === 3 }"
          >
            <span class="step-number">3</span>
            <span class="step-label">PAGAMENTO</span>
          </div>
        </div>

        <div v-if="currentStep === 1" class="step-content">
          <div class="form-group">
            <label>Nome</label>
            <input type="text" v-model="customerData.name" placeholder="Seu Nome" />
          </div>

          <div class="form-group">
            <label>Sobrenome</label>
            <input type="text" v-model="customerData.surname" placeholder="Seu Sobrenome" />
          </div>

          <div class="form-group">
            <label>Data de Nascimento</label>
            <input 
              type="text" 
              :value="customerData.birthdate" 
              @input="handleDateInput"
              placeholder="dd/mm/aaaa" 
              maxlength="10"
            />
          </div>

          <div class="form-group">
            <label>CPF</label>
            <input 
              type="text" 
              :value="customerData.cpf" 
              @input="handleCPFInput"
              placeholder="000.000.000-00" 
              maxlength="14"
            />
          </div>

          <div class="form-group">
            <label>Telefone</label>
            <input 
              type="text" 
              :value="customerData.phone" 
              @input="handlePhoneInput"
              placeholder="(00) 00000-0000" 
              maxlength="15"
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="customerData.email" placeholder="exemplo@email.com" />
          </div>

          <button class="btn-continue" @click="handleContinueStep1">CONTINUAR</button>
        </div>

        <div v-if="currentStep === 2" class="step-content">
          <h3 class="section-title">SEUS ENDEREÇOS CADASTRADOS</h3>

          <div 
            v-for="addr in savedAddresses" 
            :key="addr.id" 
            class="address-card"
            :class="{ selected: selectedAddressId === addr.id }"
            @click="selectedAddressId = addr.id"
          >
            <input type="radio" :checked="selectedAddressId === addr.id" />
            <div class="address-info">
              <p class="address-name">{{ addr.name }}</p>
              <p class="address-details">{{ addr.cep }}</p>
              <p class="address-details">{{ addr.neighborhood }}</p>
            </div>
            <button class="btn-edit">Editar Endereço</button>
          </div>

          <button v-if="!isAddingNewAddress" class="btn-add-address" @click="handleAddNewAddress">
            Cadastrar novo Endereço
          </button>

          <div v-if="isAddingNewAddress" class="new-address-form">
            <h4>Novo Endereço</h4>

            <div class="form-row">
              <div class="form-group">
                <label>CEP</label>
                <div class="input-with-button">
                  <input 
                    type="text" 
                    :value="newAddress.cep" 
                    @input="handleCEPInput"
                    placeholder="00000-000" 
                    maxlength="9" 
                  />
                  <button @click="handleSearchCep" :disabled="isLoadingCep">
                    {{ isLoadingCep ? '...' : 'Buscar' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Endereço</label>
              <input type="text" v-model="newAddress.street" placeholder="Rua Exemplo" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Número</label>
                <input type="text" v-model="newAddress.number" placeholder="1300" />
              </div>

              <div class="form-group">
                <label>Complemento</label>
                <input type="text" v-model="newAddress.complement" placeholder="Apt 110, Bloco 5" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Estado</label>
                <input type="text" v-model="newAddress.state" placeholder="UF" maxlength="2" />
              </div>

              <div class="form-group">
                <label>Cidade</label>
                <input type="text" v-model="newAddress.city" placeholder="Cidade" />
              </div>
            </div>

            <button class="btn-save-address" @click="handleSaveAddress">Salvar Endereço</button>
          </div>

          <button class="btn-continue" @click="handleContinueStep2">CONTINUAR</button>
        </div>

        <div v-if="currentStep === 3" class="step-content">
          <div class="payment-methods">
            <div 
              class="payment-option" 
              :class="{ active: paymentMethod === 'pix' }"
              @click="paymentMethod = 'pix'"
            >
              <input type="radio" :checked="paymentMethod === 'pix'" />
              <span>PIX</span>
            </div>

            <div 
              class="payment-option" 
              :class="{ active: paymentMethod === 'credit_card' }"
              @click="paymentMethod = 'credit_card'"
            >
              <input type="radio" :checked="paymentMethod === 'credit_card'" />
              <span>Cartão de Crédito</span>
            </div>
          </div>

          <div v-if="paymentMethod === 'pix'" class="pix-payment">
            <div v-if="!pixData.qrCode" class="pix-info">
              <h4>Com o Pix seu pagamento é aprovado em poucos segundos</h4>
              <ol>
                <li>Clique em FINALIZAR COMPRA para receber o código QR code de pagamento</li>
                <li>Escolha Copiar código pix ou pagar com QR code na próxima tela.</li>
                <li>Pronto! Após efetuar o pagamento, seu pedido será preparado para envio.</li>
              </ol>
            </div>

            <div v-else class="pix-qrcode">
              <h3>PIX GERADO! Pague agora para confirmar seu pedido.</h3>
              <p class="pix-timer">Tempo restante para pagar: <strong>{{ formatExpiryTime }}</strong></p>
              
              <div class="qrcode-container">
                <div class="qrcode-placeholder">
                  <p>QR CODE</p>
                  <small>Aponte a câmera para o QR code para escanear</small>
                </div>
              </div>

              <div class="pix-key">
                <p>Código Copia e cola: <strong>{{ pixData.pixKey }}</strong></p>
                <button class="btn-copy-pix" @click="copyPixKey">Copiar Código Pix</button>
              </div>

              <div class="pix-instructions">
                <h4>Como Fazer o pagamento do pedido?</h4>
                <ol>
                  <li>Aponte a câmera do seu celular no QR Code acima e faça o pagamento.</li>
                  <li>Acesse seu <strong>Banco Digital</strong>. Acesse a área do <strong>PIX</strong>. Escolha a opção <strong>Pix Copia e Cola;</strong> Cole o código e efetue o pagamento.</li>
                </ol>
              </div>
            </div>
          </div>

          <div v-if="paymentMethod === 'credit_card'" class="card-payment">
            <div class="form-group">
              <label>Número do cartão</label>
              <input 
                type="text" 
                :value="cardData.number" 
                @input="handleCardNumberInput"
                placeholder="0000 0000 0000 0000" 
                maxlength="19" 
              />
            </div>

            <div class="form-group">
              <label>Nome como no cartão</label>
              <input type="text" v-model="cardData.name" placeholder="Nome Completo" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>CVV</label>
                <input 
                  type="text" 
                  :value="cardData.cvv" 
                  @input="handleCardCVVInput"
                  placeholder="000" 
                  maxlength="3" 
                />
              </div>

              <div class="form-group">
                <label>Validade</label>
                <input 
                  type="text" 
                  :value="cardData.expiry" 
                  @input="handleCardExpiryInput"
                  placeholder="MM/AA" 
                  maxlength="5" 
                />
              </div>
            </div>

            <div class="form-group">
              <label>CPF do titular do cartão</label>
              <input 
                type="text" 
                :value="cardData.cpf" 
                @input="handleCardCPFInput"
                placeholder="000.000.000-00" 
                maxlength="14" 
              />
            </div>

            <div class="form-group">
              <label>Pagar em quantas parcelas?</label>
              <select v-model="cardData.installments">
                <option v-for="opt in installmentOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>

          <button class="btn-finalize" @click="handleFinalizeOrder">
            FINALIZAR COMPRA
          </button>
        </div>
      </div>

      <aside class="order-summary">
        <h2 class="summary-title">RESUMO DA COMPRA</h2>

        <div class="summary-products">
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <img :src="item.image" :alt="item.title" />
            <div class="item-details">
              <p class="item-name">{{ item.title }}</p>
              <p class="item-price">R$ {{ formatPrice(item.price) }}</p>
            </div>
          </div>
        </div>

        <div class="summary-totals">
          <div class="total-line">
            <span>Subtotal - {{ cartStore.items.length }} itens</span>
            <span>R$ {{ formatPrice(subtotal) }}</span>
          </div>

          <div class="total-line final">
            <span>TOTAL</span>
            <span>R$ {{ formatPrice(total) }}</span>
          </div>
          <p v-if="total >= 140" class="installment-text">
            (ou 10x de {{ formatPrice(total / 10) }})
          </p>
        </div>

        <button class="btn-back-cart" @click="handleBackToCart">
          RETORNAR À SACOLA
        </button>
      </aside>
    </div>
  </main>
    <FooterVue />
</template>

<style scoped>
.checkout-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
}

/* Steps Header */
.steps-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 20px;
}

.step {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.step.active {
  background: #f8f8f8;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ddd;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.step.active .step-number {
  background: #000;
  color: #fff;
}

.step.completed .step-number {
  background: #27ae60;
  color: #fff;
}

.step-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #999;
}

.step.active .step-label {
  color: #000;
}

/* Form */
.checkout-form {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 30px;
}

.step-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0B1E9F;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-with-button {
  display: flex;
  gap: 8px;
}

.input-with-button input {
  flex: 1;
}

.input-with-button button {
  padding: 0 20px;
  background: #0B1E9F;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

/* Address Cards */
.section-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.address-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.address-card:hover {
  border-color: #0B1E9F;
}

.address-card.selected {
  border-color: #0B1E9F;
  background: #f8f9ff;
}

.address-info {
  flex: 1;
}

.address-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.address-details {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.btn-edit {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #0B1E9F;
  color: #0B1E9F;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-add-address {
  width: 100%;
  padding: 14px;
  background: #fff;
  border: 2px solid #0B1E9F;
  color: #0B1E9F;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 20px;
}

.new-address-form {
  padding: 20px;
  background: #f8f8f8;
  border-radius: 12px;
  margin-bottom: 20px;
}

.btn-save-address {
  width: 100%;
  padding: 12px;
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

/* Payment Methods */
.payment-methods {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

.payment-option {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-option:hover {
  border-color: #0B1E9F;
}

.payment-option.active {
  border-color: #0B1E9F;
  background: #f8f9ff;
}

.payment-option span {
  font-weight: 700;
  font-size: 1rem;
}

/* PIX Payment */
.pix-info h4 {
  margin-bottom: 16px;
  font-size: 1rem;
}

.pix-info ol {
  padding-left: 20px;
  line-height: 1.8;
}

.pix-qrcode {
  text-align: center;
}

.pix-timer {
  color: #e74c3c;
  font-weight: 700;
  margin: 10px 0 20px;
}

.qrcode-container {
  margin: 30px auto;
  width: 250px;
  height: 250px;
}

.qrcode-placeholder {
  width: 100%;
  height: 100%;
  border: 2px dashed #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #f8f8f8;
}

.pix-key {
  margin: 20px 0;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 8px;
}

.pix-key p {
  margin-bottom: 12px;
  word-break: break-all;
}

.btn-copy-pix {
  width: 100%;
  padding: 12px;
  background: #0B1E9F;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.pix-instructions {
  text-align: left;
  margin-top: 30px;
}

.pix-instructions ol {
  padding-left: 20px;
  line-height: 1.8;
}

/* Buttons */
.btn-continue,
.btn-finalize {
  width: 100%;
  padding: 16px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
}

.btn-continue:hover,
.btn-finalize:hover {
  background: #333;
}

/* Order Summary */
.order-summary {
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
  margin-bottom: 20px;
}

.summary-products {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.item-price {
  font-size: 0.9rem;
  color: #666;
}

.summary-totals {
  border-top: 1px solid #ddd;
  padding-top: 16px;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.total-line.final {
  font-size: 1.1rem;
  font-weight: 700;
  padding-top: 12px;
  border-top: 1px solid #ddd;
}

.installment-text {
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  margin-top: 6px;
}

.btn-back-cart {
  width: 100%;
  padding: 14px;
  background: #fff;
  color: #0B1E9F;
  border: 2px solid #0B1E9F;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;
}
</style>
