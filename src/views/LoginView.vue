<script setup>
import { ref, reactive, nextTick } from 'vue'
import LeftPanel from '@/components/LeftPanel.vue'
import AuthForm from '@/components/AuthForm.vue'

const ANIM_MS = 320 // duração da animação (ms) — reduzido para ficar mais rápido

const mode = ref('login') // 'login' | 'register'
const isAnimating = ref(false)

const form = reactive({
  // login
  loginEmail: '',
  loginPassword: '',
  // register
  name: '',
  surname: '',
  birthdate: '',
  cpf: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  state: '',
  city: '',
  cep: '',
  number: ''
})

async function animateToRegister() {
  if (mode.value === 'register' || isAnimating.value) return
  // troca o conteúdo imediatamente e dispara animação visual
  mode.value = 'register'
  await nextTick()
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, ANIM_MS)
}

async function animateToLogin() {
  if (mode.value === 'login' || isAnimating.value) return
  // resposta mais rápida: troca o modo e mantém animação curta
  mode.value = 'login'
  await nextTick()
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, ANIM_MS)
}
</script>

<template>
  <main :class="{ 'register-mode': mode === 'register' }">
    <LeftPanel :mode="mode" :moving="isAnimating" />

    <div class="login-container">
      <p class="titleLogin">{{ mode === 'login' ? 'LOGIN' : 'REGISTER' }}</p>

      <AuthForm
        :form="form"
        :mode="mode"
        @request-register="animateToRegister"
        @request-login="animateToLogin"
      />
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

main {
  position: relative;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

/* painel direito (login/register) */
/* reserva espaço para o LeftPanel (30vw) à esquerda por padrão */
.login-container {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);

  /* reserva o espaço do painel azul à esquerda (30vw) */
  margin-left: 30vw;
  margin-right: 0;
  width: calc(100vw - 30vw);

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition:
    margin 0.32s cubic-bezier(.2,.9,.3,1),
    width 0.32s cubic-bezier(.2,.9,.3,1),
    transform 0.32s cubic-bezier(.2,.9,.3,1),
    border-radius 0.32s,
    background-color 0.32s,
    box-shadow 0.32s;
}

/* quando estiver em modo registro, o painel azul vai para a direita
   e o formulário cria espaço à direita (não ocorre sobreposição) */
main.register-mode .login-container {
  margin-left: 0;
  margin-right: 30vw;
  width: calc(100vw - 30vw);
  border-radius: 0;
  transform: translateX(-2vw) scale(1.01);
}

/* pequeno ajuste visual */
.titleLogin {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: color 0.2s;
}

/* estilos de formulário (mantidos) */
.input-group { margin-bottom: 1rem; width: 75%; }
.input-group label { display: block; margin-bottom: 0.5rem; font-weight: 400; font-size: 1.1rem; }
.inputWrapper { display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem; transition: border-color 0.18s; }
.inputWrapper input { flex: 1; height: 5vh; padding: 0.5rem 1rem; border: none; font-size: 16px; background-color: transparent; }

/* botões/textos */
.userIcon { height: 2.2rem; margin-right: 0.5rem; }
button { margin-top: 1vh; width: 50%; padding: 0.75rem; background-color: #192EB1; color: #fff; border: none; border-radius: 2rem; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.18s; }
button:hover { background-color: #3a8dde; }
a { color: #2455da; text-decoration: underline; cursor: pointer; }
.register { margin-top: 1rem; font-size: 1.2rem; }

/* suaviza troca de formulários */
.form-inner > div { transition: opacity 0.22s ease; }
</style>
