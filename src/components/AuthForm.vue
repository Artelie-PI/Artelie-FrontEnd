<template>
  <form class="form-inner" @submit.prevent="props.mode === 'login' ? onLogin() : onRegister()">
    <!-- Login -->
    <div v-if="props.mode === 'login'" class="form-block">  <!-- ✅ v-if ao invés de v-show -->
      <div class="input-group">
        <label for="loginEmail">Email</label>
        <div class="inputWrapper">
          <input
            id="loginEmail"
            v-model="props.form.loginEmail"
            type="email"
            placeholder="Enter your Email"
            required
          />
        </div>
      </div>
      <div class="input-group">
        <label for="loginPassword">Senha</label>
        <div class="inputWrapper">
          <input
            id="loginPassword"
            v-model="props.form.loginPassword"
            type="password"
            placeholder="Senha"
            required
          />
        </div>
      </div>
      <button type="submit">Login</button>
      <p class="register">Não tem conta? <a href="#" @click.prevent="onRequestRegister">Registrar</a></p>
    </div>

    <!-- Register -->
    <div v-if="props.mode === 'register'" class="form-block">  <!-- ✅ v-if ao invés de v-show -->
      <div class="input-group">
        <label for="username">Username</label>
        <div class="inputWrapper">
          <input
            id="username"
            v-model="props.form.username"
            placeholder="Seu Username"
            required
          />
        </div>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <div class="inputWrapper">
          <input
            id="email"
            v-model="props.form.email"
            type="email"
            placeholder="Seu Email"
            required
          />
        </div>
      </div>
      <div class="input-group">
        <label for="full_name">Nome Completo</label>
        <div class="inputWrapper">
          <input
            id="full_name"
            v-model="props.form.full_name"
            placeholder="Nome Completo"
            required
          />
        </div>
      </div>
      <div class="input-group">
        <label for="password">Senha (min. 8 caracteres)</label>
        <div class="inputWrapper">
          <input
            id="password"
            v-model="props.form.password"
            type="password"
            placeholder="Senha"
            required
            minlength="8"
          />
        </div>
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirmar Senha</label>
        <div class="inputWrapper">
          <input
            id="confirmPassword"
            v-model="props.form.confirmPassword"
            type="password"
            placeholder="Confirme a Senha"
            required
            minlength="8"
          />
        </div>
      </div>
      <button type="submit">Registrar</button>
      <p class="register">Já tem conta? <a href="#" @click.prevent="onRequestLogin">Login</a></p>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  form: { type: Object, required: true },
  mode: { type: String, required: true }
})
const emit = defineEmits(['request-register', 'request-login', 'do-login', 'do-register'])
function onRequestRegister() { emit('request-register') }
function onRequestLogin() { emit('request-login') }
function onLogin() { emit('do-login') }
function onRegister() { emit('do-register') }
</script>

<style scoped>
.form-block { width:100%; display:flex; flex-direction:column; align-items:center; transition: opacity .4s ease; }
.input-group { margin-bottom:1rem; width:75%; }
.inputWrapper { display:flex; align-items:center; border-bottom:1px solid #ccc; padding-bottom:.5rem; }
.inputWrapper input { flex:1; height:5vh; padding:.5rem 1rem; border:none; background:transparent; }
.userIcon { height:2.2rem; margin-right:.5rem; }
.register { margin-top:1rem; font-size:1.2rem; }
button { margin-top:1vh; width:50%; padding:.75rem; background-color:#192EB1; color:#fff; border:none; border-radius:2rem; font-weight:600; cursor:pointer; }
button:hover { background:#3a8dde; }
</style>
