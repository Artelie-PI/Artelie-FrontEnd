<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import LeftPanel from '@/components/LeftPanel.vue'
import AuthForm from '@/components/AuthForm.vue'
import { register } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const ANIM_MS = 320
const mode = ref('login')
const isAnimating = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  loginEmail: '',
  loginPassword: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  full_name: ''
})

async function animateToRegister() {
  if (mode.value === 'register' || isAnimating.value) return
  errorMsg.value = ''
  successMsg.value = ''
  mode.value = 'register'
  await nextTick()
  isAnimating.value = true
  setTimeout(() => { isAnimating.value = false }, ANIM_MS)
}

async function animateToLogin() {
  if (mode.value === 'login' || isAnimating.value) return
  errorMsg.value = ''
  successMsg.value = ''
  mode.value = 'login'
  await nextTick()
  isAnimating.value = true
  setTimeout(() => { isAnimating.value = false }, ANIM_MS)
}

async function handleLogin() {
  errorMsg.value = ''
  successMsg.value = ''

  if (!form.loginEmail || !form.loginPassword) {
    errorMsg.value = 'Preencha email e senha!'
    return
  }

  try {
    await userStore.login(form.loginEmail, form.loginPassword)
    successMsg.value = 'Login realizado com sucesso!'
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err) {
    console.error('Erro no login:', err)

    if (err?.response?.status === 401) {
      errorMsg.value = 'Email ou senha incorretos!'
    } else if (err?.response?.status === 400) {
      errorMsg.value = 'Dados inválidos. Verifique email e senha.'
    } else if (err?.response?.data?.detail) {
      errorMsg.value = err.response.data.detail
    } else {
      errorMsg.value = 'Erro ao fazer login. Tente novamente.'
    }
  }
}

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
    const resposta = await register({
      username: form.username,
      email: form.email,
      password: form.password,
      password_confirm: form.confirmPassword,
      full_name: form.full_name
    })

    successMsg.value = resposta?.message || 'Registro realizado! Verifique seu email antes de fazer login.'

    form.username = ''
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
    form.full_name = ''
  } catch (err) {
    console.error('Erro no registro:', err)

    if (err?.response?.data) {
      const errorData = err.response.data

      if (errorData.username) {
        errorMsg.value = Array.isArray(errorData.username)
          ? errorData.username[0]
          : 'Usuário já cadastrado'
      } else if (errorData.email) {
        errorMsg.value = Array.isArray(errorData.email)
          ? errorData.email[0]
          : 'Email já cadastrado'
      } else if (errorData.password) {
        errorMsg.value = Array.isArray(errorData.password)
          ? errorData.password[0]
          : 'Senha não atende aos requisitos'
      } else if (errorData.password_confirm) {
        errorMsg.value = Array.isArray(errorData.password_confirm)
          ? errorData.password_confirm[0]
          : 'As senhas não conferem'
      } else if (errorData.detail) {
        errorMsg.value = errorData.detail
      } else if (errorData.error) {
        errorMsg.value = errorData.error
      } else {
        errorMsg.value = 'Erro no registro! Verifique os dados.'
      }
    } else {
      errorMsg.value = 'Erro desconhecido ao registrar.'
    }
  }
}
</script>

<template>
  <main :class="{ 'register-mode': mode === 'register' }">
    <LeftPanel :mode="mode" :moving="isAnimating" />

    <div class="login-container">
      <p class="titleLogin">{{ mode === 'login' ? 'LOGIN' : 'CADASTRO' }}</p>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>

      <AuthForm
        :form="form"
        :mode="mode"
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
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background: #f5f5f7;
}

.login-container {
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  padding: 2.5rem 3rem;
  border-radius: 0;
  box-shadow: none;
  margin-left: 32vw;
  width: calc(100vw - 32vw);
  min-height: 100vh;
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
  margin-right: 32vw;
  width: calc(100vw - 32vw);
  transform: translateX(-2vw) scale(1.01);
}

.titleLogin {
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  text-align: center;
}

.error {
  color: #e11d48;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-align: center;
}

.success {
  color: #16a34a;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 1024px) {
  .login-container {
    margin-left: 30vw;
    width: calc(100vw - 30vw);
    padding: 2rem 2.4rem;
  }

  main.register-mode .login-container {
    margin-right: 30vw;
    width: calc(100vw - 30vw);
    transform: translateX(-1.2vw) scale(1.01);
  }

  .titleLogin {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  main {
    flex-direction: column;
  }

  .login-container {
    margin: 0;
    width: 100%;
    min-height: 10vh;
    padding: 1.8rem 1.5rem 2.5rem;
    box-shadow: 0 -6px 25px rgba(15, 23, 42, 0.18);
    transform: translateX(0) scale(1);
  }

  main.register-mode .login-container {
    margin: 0;
    width: 100%;
    transform: translateX(0) scale(1);
  }

  .titleLogin {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    justify-content: flex-start;
    padding: 5rem 1.2rem 2rem;
  }

  .titleLogin {
    font-size: 1.6rem;
  }
}
</style>
