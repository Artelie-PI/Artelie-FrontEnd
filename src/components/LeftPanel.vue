<script setup>
import { computed } from 'vue'
const props = defineProps({
  mode: { type: String, default: 'login' }
})
const cls = computed(() => ({
  container: true,
  'to-right': props.mode === 'register'
}))
</script>

<template>
  <div :class="cls">
    <p class="Title">{{ props.mode === 'login' ? 'Bem Vindo de Volta!' : 'Bem Vindo!' }}</p>
    <p class="instruction" v-if="props.mode === 'login'">Faça login para continuar</p>
    <p class="instruction" v-else>Faça seu Cadastro para comprar os produtos em nosso site.</p>

    <RouterLink to="/home" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="width:1rem;height:1rem;margin-right:0.1rem;vertical-align:middle;">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      Voltar para tela inicial
    </RouterLink>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 31.98vw;
  min-width: 280px;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  --tx: 0;
  transform: translateX(var(--tx));
  transition: transform 0.32s cubic-bezier(.2,.9,.3,1), opacity 0.32s;
  z-index: 3;

  background: linear-gradient(270deg, #192EB1, #214b9b, #192EB1);
  background-size: 400% 400%;
  color: #fff;
  animation: gradientBG 10s ease infinite;
  box-shadow: 0 0 40px rgba(0,0,0,0.06);
  will-change: transform, opacity;
  pointer-events: auto;
}

.container.to-right {
  --tx: calc(100vw - 32vw);
}

.Title {
  margin: 0 0 0.4rem 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}

.instruction {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.95;
}

/* Estilo do botão de voltar */
.back-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.6rem 1rem;
  border-radius: 3rem;
  background: transparent;

  color: #fff;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.12s;
}
.back-button:hover {
  background: rgba(255,255,255,0.16);
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
