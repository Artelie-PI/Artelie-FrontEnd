<script setup>
import { RouterLink } from "vue-router";

import { ref } from 'vue';
const showHeader = ref(true);

import { useSidebarCart } from "/src/stores/useSidebarCart.js";
const { open } = useSidebarCart();
</script>

<template>
  <transition name="slide-down">
    <header v-if="showHeader">
      <!-- Topo do header -->
      <div class="header-top">
        <!-- Logo -->
        <div class="logo slide-item">
          <RouterLink to="/">
            <img class="logoImg" src="@/assets/images/ArtelieLogo.png" alt="Artelie Logo" />
          </RouterLink>
        </div>

        <!-- Menu de páginas (desktop) -->
        <nav class="pages slide-item" style="transition-delay: 0.1s">
          <RouterLink to="/">HOME</RouterLink>
          <RouterLink to="/contact">CONTATO</RouterLink>
          <RouterLink to="/brands">MARCAS</RouterLink>
        </nav>

        <!-- Perfil / Login + Carrinho (desktop) -->
        <div class="perfilShop slide-item" style="transition-delay: 0.2s">
            <RouterLink to="/login">
              <img src="@/assets/images/Login.png" alt="login" />
            </RouterLink>
            <img src="@/assets/images/Cart.png" @click="open" class="sacolaIcon" alt="Sacola" />
        </div>
      </div>

      <!-- Barra de categorias -->
      <nav class="category-icons">
        <RouterLink :to="{ name: 'category', params: { slug: 'papeis' } }" title="Papéis">
          <img src="@/assets/images/Papel.svg" alt="Papéis" />
          <span>PAPÉIS</span>
        </RouterLink>
        <RouterLink :to="{ name: 'category', params: { slug: 'pintura' } }" title="Pintura">
          <img src="@/assets/images/Tinta.svg" alt="Pintura" />
          <span>PINTURA</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'category', params: { slug: 'lapis-canetas' } }"
          title="Lápis & Canetas"
        >
          <img src="@/assets/images/Lápis.svg" alt="Lápis & Canetas" />
          <span>LÁPIS & CANETAS</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'category', params: { slug: 'livros-gibis' } }"
          title="Livros & Gibis"
        >
          <img src="@/assets/images/Book.svg" alt="Livros & Gibis" />
          <span>LIVROS & GIBIS</span>
        </RouterLink>
      </nav>
    </header>
  </transition>
</template>

<style scoped>
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.slide-down-enter-active {
  transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-item {
  opacity: 0;
  transform: translateY(-40px);
  animation: slideItemDown 0.7s forwards;
}
.slide-item:nth-child(1) {
  animation-delay: 0.2s;
}
.slide-item:nth-child(2) {
  animation-delay: 0.4s;
}
.slide-item:nth-child(3) {
  animation-delay: 0.6s;
}
@keyframes slideItemDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header geral */
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Linha superior */
.header-top {
  height: 12vh;
  display: flex;
  justify-content: space-around;
  gap: 10rem;
  align-items: center;
}

.logoImg {
  height: 8vh;
}

/* Links principais */
.pages {
  display: flex;
  gap: 8rem;
  justify-content: center;
}
.pages a {
  text-align: center;
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  transition: border-bottom 0.3s, font-size 0.3s;
  border-bottom: 2px solid transparent;
}

/* Login + carrinho */
.perfilShop {
  display: flex;
  gap: 1rem;
}

.perfilShop img {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

/* Navbar inferior */
.category-icons {
  display: flex;
  justify-content: center;
  gap: 5rem;
  border-top: 1px solid #2c2c2c;
  padding: 1rem 0;
}
.category-icons a {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: black;
  text-decoration: none;
}

.category-icons a:hover { transform: translateY(-3px) scale(1.05); }

.category-icons a img {
  width: 1.3rem;
  height: 1.3rem;
  margin-bottom: 0.3rem;
  transition: transform 0.16s, opacity 0.16s;
}

/* Botão do menu lateral (hambúrguer) */
.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1002;
}
.menu-btn span {
  display: block;
  height: 4px;
  width: 100%;
  background: #333;
  border-radius: 2px;
  transition: 0.3s;
}

</style>
