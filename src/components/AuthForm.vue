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

<template>
  <form class="form-inner" @submit.prevent="props.mode === 'login' ? onLogin() : onRegister()">
    <!-- Login -->
    <div v-if="props.mode === 'login'" class="form-block"> 
      <div class="input-group">
        <label for="loginEmail">Email</label>
        <div class="inputWrapper">
          <span><img class="userIcon" src="@/assets/images/userIcon.png" alt="user" /></span>
          <input
            id="loginEmail"
            v-model="props.form.loginEmail"
            type="email"
            placeholder="Digite seu Email"
            required
          />
        </div>
      </div>

      <div class="input-group">
        <label for="loginPassword">Senha</label>
        <div class="inputWrapper">
          <span><img class="userIcon" src="@/assets/images/passwordIcon.png" alt="lock" /></span>
          <input
            id="loginPassword"
            v-model="props.form.loginPassword"
            type="password"
            placeholder="Digite sua Senha"
            required
          />
        </div>
      </div>
      <button type="submit">Login</button>
      <p class="register">Não tem uma conta?<a href="#" @click.prevent="onRequestRegister">Cadastre-se</a></p>
    </div>

    <!-- Register -->
    <div v-if="props.mode === 'register'" class="form-block">
      <div class="input-group">
        <label for="username">Nome de Usuário</label>
        <div class="inputWrapper">
          <input
            id="username"
            v-model="props.form.username"
            placeholder="Seu nome de usuário"
            required
            minlength="3"
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
            placeholder="Seu email"
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
            placeholder="Seu nome completo"
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
            placeholder="Sua senha"
            required
            minlength="8"
          />
        </div>
      </div>

      <div class="input-group">
        <label for="confirmPassword">Confirme sua Senha</label>
        <div class="inputWrapper">
          <input
            id="confirmPassword"
            v-model="props.form.confirmPassword"
            type="password"
            placeholder="Repita sua senha"
            required
            minlength="8"
          />
        </div>
      </div>

      <button type="submit">Cadastrar</button>
      <p class="register">Já tem uma conta?<a href="#" @click.prevent="onRequestLogin">Faça login</a></p>
    </div>
  </form>
</template>

<style scoped>
.form-block { width:100%; display:flex; flex-direction:column; align-items:center; transition: opacity .4s ease; }
.input-group { margin-bottom:1rem; width:75%; }
.inputWrapper { display:flex; align-items:center; border-bottom:1px solid #ccc; padding-bottom:.5rem; }
.inputWrapper input { flex:1; height:5vh; padding:.5rem 1rem; border:none; background:transparent; }
.userIcon { height:2.2rem; margin-right:.5rem; }
.register { margin-top:1rem; font-size:1.2rem; }
button { margin-top:1vh; width:50%; padding:.75rem; background-color:#192EB1; color:#fff; border:none; border-radius:2rem; font-weight:600; cursor:pointer; transition: background-color 0.3s; }
button:hover { background:#3a8dde; }
</style>