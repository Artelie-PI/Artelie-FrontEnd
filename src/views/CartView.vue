<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function voltarLoja() {
  router.push("/"); // rota principal
}

function login() {
  router.push("/login"); // rota de login
}
</script>
<template>
  <div class="sacola-page">
    <main>
      <section class="empty-wrap">
        <h1 class="title">
          Bem-Vindo à Sacola
          <img src="/src/assets/images/Shopping bag.png" alt="">
        </h1>

        <p class="subtitle">A Sacola está vazia!</p>

        <div class="empty-illustration"></div>

        <p class="lead">
          Que tal retornar a nossa página principal e procurar pelos melhores produtos
        </p>

        <button class="btn" @click="voltarLoja">Voltar à Loja</button>

        <div class="small">
          <div>Tem uma conta?</div>
          <div>
            Faça <a href="#" @click.prevent="login">LOGIN</a> para finalizar suas compras
          </div>
        </div>
      </section>
    </main>
  </div>
</template>



<style scoped>

.sacola-page {
  font-family: "Montserrat", sans-serif;
  background: var(--bg);
  color: #111;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  border-top: 6px solid var(--accent);
}

.site-header {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo {
  font-weight: 700;
  color: #111;
}

.nav-items {
  display: flex;
  gap: 20px;
  font-size: 13px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
}

.empty-wrap {
  text-align: center;
  max-width: 680px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 28px;
  margin-bottom: 12px;
}

.subtitle {
  font-weight: 500;
  color: var(--muted);
  margin-bottom: 22px;
}

.empty-illustration {
  font-size: 64px;
  margin: 20px 0;
  opacity: 0.7;
}

.lead {
  font-size: 15px;
  margin-bottom: 22px;
}

.btn {
  padding: 12px 36px;
  border-radius: 20px;
  background: var(--button);
  color: #fff;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

.small {
  margin-top: 20px;
  font-size: 13px;
  color: var(--muted);
}
.small a {
  color: #111;
  font-weight: 700;
  text-decoration: none;
}
</style>
