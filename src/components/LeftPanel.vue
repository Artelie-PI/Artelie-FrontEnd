<script setup>
import { computed } from 'vue'
const props = defineProps({
  mode: { type: String, default: 'login' }
})

// Simplifica: o painel vai para a direita apenas quando mode === 'register'.
// Isso evita que um flag de "moving" mantenha o painel no lugar indevidamente.
const cls = computed(() => ({
  container: true,
  'to-right': props.mode === 'register'
}))
</script>

<template>
  <div :class="cls">
    <p class="Title">{{ props.mode === 'login' ? 'Welcome Back!' : 'Bem Vindo!' }}</p>
    <p class="instruction" v-if="props.mode === 'login'">Please login to continue</p>
    <p class="instruction" v-else>Faça seu Cadastro para comprar os produtos em nosso site.</p>
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

  /* usa custom property para transição suave */
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

/* move até a borda direita da viewport (sem deixar gap) */
.container.to-right {
  --tx: calc(100vw - 32vw);
}

/* título com mesma proporção do subtexto do login */
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

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
