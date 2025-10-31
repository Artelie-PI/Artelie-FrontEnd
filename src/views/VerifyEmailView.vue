<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '@/axios'

const route = useRoute()
const router = useRouter()
const message = ref('Verificando seu email...')
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  const { token } = route.params

  if (!token) {
    error.value = 'Token de verificação inválido.'
    loading.value = false
    return
  }

  try {
    const { data } = await apiClient.get(`/api/verify-email/${token}/`)
    message.value = data.message || 'Email verificado com sucesso! Redirecionando para o login...'
    loading.value = false

    // Redireciona para login após 3 segundos
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (err) {
    loading.value = false
    if (err?.response?.data?.error) {
      error.value = err.response.data.error
    } else if (err?.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Token inválido ou expirado. Solicite um novo email de verificação.'
    }
  }
})
</script>

<template>
  <div class="verify-container">
    <div class="verify-card">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>{{ message }}</p>
      </div>

      <div v-if="!loading && message && !error" class="success">
        <svg class="icon-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"/>
        </svg>
        <h2>Email Verificado!</h2>
        <p>{{ message }}</p>
      </div>

      <div v-if="error" class="error-box">
        <svg class="icon-error" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#f44336"/>
        </svg>
        <h2>Erro na Verificação</h2>
        <p>{{ error }}</p>
        <button @click="router.push('/login')">Voltar para o Login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.verify-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.verify-card {
  background: white;
  border-radius: 15px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success, .error-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.icon-success, .icon-error {
  width: 80px;
  height: 80px;
}

h2 {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

button {
  background-color: #192EB1;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #3a8dde;
}
</style>
