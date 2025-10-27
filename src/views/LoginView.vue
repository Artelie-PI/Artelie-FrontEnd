<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import LeftPanel from '@/components/LeftPanel.vue'
import AuthForm from '@/components/AuthForm.vue'
import { login, register } from '@/api/auth'

const ANIM_MS = 320
const mode = ref('login') // 'login' | 'register'
const isAnimating = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const router = useRouter()

// Estado do formulário (pai é o "dono" do estado)
const form = reactive({
  // login
  loginEmail: '',
  loginPassword: '',
  // register
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  full_name: ''
})

async function animateToRegister() {
  if (mode.value === 'register' || isAnimating.value) return
  mode.value = 'register'
  await nextTick()
  isAnimating.value = true
  setTimeout(() => { isAnimating.value = false }, ANIM_MS)
}

async function animateToLogin() {
  if (mode.value === 'login' || isAnimating.value) return
  mode.value = 'login'
  await nextTick()
  isAnimating.value = true
  setTimeout(() => { isAnimating.value = false }, ANIM_MS)
}

// Atualiza o form quando o filho emitir update:form
function onUpdateForm(v) {
  Object.assign(form, v)
}

// Login usando src/api/auth.js
async function handleLogin() {
  errorMsg.value = ''
  successMsg.value = ''
  if (!form.loginEmail || !form.loginPassword) {
    errorMsg.value = 'Informe email e senha.'
    return
  }
  try {
    await login({ email: form.loginEmail, password: form.loginPassword })
    successMsg.value = 'Login realizado com sucesso!'
    setTimeout(() => router.push('/'), 300)
  } catch (err) {
    errorMsg.value = err?.message || 'Email ou senha inválidos!'
  }
}

// Registro (exibe mensagem amigável se backend não tem endpoint)
async function handleRegister() {
  errorMsg.value = ''
  successMsg.value = ''

  if (!form.username || !form.email || !form.password || !form.confirmPassword || !form.full_name) {
    errorMsg.value = 'Preencha todos os campos!'
    return
  }
  if (form.password.length < 8) {
    errorMsg.value = 'A senha deve ter no mínimo 8 caracteres!'
    return
  }
  if (form.password !== form.confirmPassword) {
    errorMsg.value = 'As senhas não conferem!'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errorMsg.value = 'Email inválido!'
    return
  }

  try {
    const resp = await register({
      username: form.username,
      email: form.email,
      password: form.password
    })
    successMsg.value = resp?.message || 'Registro realizado! Verifique seu email antes de logar.'
    setTimeout(() => animateToLogin(), 1200)
  } catch (err) {
    // auth.js revisado retorna uma mensagem clara quando o backend não tem rota pública
    errorMsg.value = err?.message || 'Erro no registro! Verifique os dados.'
  }
}
</script>

<template>
  <main :class="{ 'register-mode': mode === 'register' }">
    <LeftPanel :mode="mode" :moving="isAnimating" />

    <div class="login-container">
      <p class="titleLogin">{{ mode === 'login' ? 'LOGIN' : 'REGISTER' }}</p>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>

      <AuthForm
        :form="form"
        :mode="mode"
        @update:form="onUpdateForm"
        @request-register="animateToRegister"
        @request-login="animateToLogin"
        @do-login="handleLogin"
        @do-register="handleRegister"
      />
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

main {
  position: relative;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.login-container {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  margin-left: 30vw;
  width: calc(100vw - 30vw);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition:
    margin 0.32s cubic-bezier(.2, .9, .3, 1),
    width 0.32s cubic-bezier(.2, .9, .3, 1),
    transform 0.32s cubic-bezier(.2, .9, .3, 1),
    border-radius 0.32s,
    background-color 0.32s,
    box-shadow 0.32s;
}

main.register-mode .login-container {
  margin-left: 0;
  margin-right: 30vw;
  width: calc(100vw - 30vw);
  border-radius: 0;
  transform: translateX(-2vw) scale(1.01);
}

.titleLogin {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.error {
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.success {
  color: green;
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
