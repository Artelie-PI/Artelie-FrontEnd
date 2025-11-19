<script setup>
import { RouterLink, useRoute } from "vue-router";
import { ref, watch } from 'vue';
import { useSidebarCart } from "/src/stores/useSidebarCart.js";

const showHeader = ref(true);
const { open } = useSidebarCart();

const menuOpen = ref(false)
function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false }
function openCart() { closeMenu(); open() }

const route = useRoute()
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <transition name="slide-down">
    <header v-if="showHeader">
      <div class="header-top">
        <button class="menu-btn" :class="{ open: menuOpen }" @click="toggleMenu" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="logo slide-item">
          <RouterLink to="/">
            <img class="logoImg" src="@/assets/images/ArtelieLogo.png" alt="Artelie Logo" />
          </RouterLink>
        </div>

        <nav class="pages slide-item" style="transition-delay: 0.1s">
          <RouterLink to="/">HOME</RouterLink>
          <RouterLink to="/contact">CONTATO</RouterLink>
          <RouterLink to="/brands">MARCAS</RouterLink>
        </nav>

        <div class="perfilShop slide-item" style="transition-delay: 0.2s">
          <RouterLink to="/login">
            <img src="@/assets/images/Login.png" alt="login" />
          </RouterLink>
          <img src="@/assets/images/Cart.png" @click="open" class="sacolaIcon" alt="Sacola" />
        </div>
      </div>

      <nav class="category-icons">
        <RouterLink :to="{ name: 'category', params: { slug: 'papeis' } }" title="Papéis">
          <img src="@/assets/images/Papel.svg" alt="Papéis" />
          <span>PAPÉIS</span>
        </RouterLink>
        <RouterLink :to="{ name: 'category', params: { slug: 'pintura' } }" title="Pintura">
          <img src="@/assets/images/Tinta.svg" alt="Pintura" />
          <span>PINTURA</span>
        </RouterLink>
        <RouterLink :to="{ name: 'category', params: { slug: 'lapis-e-canetas' } }" title="Lápis & Canetas">
          <img src="@/assets/images/Lápis.svg" alt="Lápis & Canetas" />
          <span>LÁPIS & CANETAS</span>
        </RouterLink>
        <RouterLink :to="{ name: 'category', params: { slug: 'livros-e-gibis' } }" title="Livros & Gibis">
          <img src="@/assets/images/Book.svg" alt="Livros & Gibis" />
          <span>LIVROS & GIBIS</span>
        </RouterLink>
      </nav>

      <!-- Backdrop + Menu móvel (lateral direita) -->
      <transition name="menu-fade">
        <div v-if="menuOpen" class="backdrop" @click="closeMenu" aria-hidden="true"></div>
      </transition>
      <transition name="menu-slide">
        <aside v-if="menuOpen" class="mobile-menu" aria-label="Menu principal">
          <div class="mm-header">
            <img class="mm-logo" src="@/assets/images/ArtelieLogo.png" alt="Artelie Logo" />
          </div>
          <nav class="mm-section">
            <RouterLink to="/" @click="closeMenu">Home</RouterLink>
            <RouterLink to="/contact" @click="closeMenu">Contato</RouterLink>
            <RouterLink to="/brands" @click="closeMenu">Marcas</RouterLink>
          </nav>
          <div class="mm-divider"></div>
          <nav class="mm-section mm-categories">
            <h4>Categorias</h4>
            <RouterLink :to="{ name: 'category', params: { slug: 'papeis' } }" @click="closeMenu">Papéis</RouterLink>
            <RouterLink :to="{ name: 'category', params: { slug: 'pintura' } }" @click="closeMenu">Pintura</RouterLink>
            <RouterLink :to="{ name: 'category', params: { slug: 'lapis-e-canetas' } }" @click="closeMenu">Lápis & Canetas</RouterLink>
            <RouterLink :to="{ name: 'category', params: { slug: 'livros-e-gibis' } }" @click="closeMenu">Livros & Gibis</RouterLink>
          </nav>
          <div class="mm-divider"></div>
          <div class="mm-actions">
            <RouterLink to="/login" class="mm-btn-enter" @click="closeMenu">Entrar</RouterLink>
            <button class="mm-btn-enter" @click="openCart">Abrir Sacola</button>
          </div>
        </aside>
      </transition>
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

.category-icons a:hover {
  transform: translateY(-3px) scale(1.05);
}

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
  height: 3px;
  width: 28px;
  background: #111;
  border-radius: 2px;
  transition: transform .2s ease, opacity .2s ease;
}
.menu-btn.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.menu-btn.open span:nth-child(2) { opacity: 0; }
.menu-btn.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* Backdrop do menu */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.32);
  z-index: 1000;
}

/* Menu móvel (lateral direita, não tela inteira) */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 85vw;
  max-width: 380px;
  background: #fff;
  z-index: 1001;
  padding: 16px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid #eee;
  box-shadow: -4px 0 16px rgba(0,0,0,.08);
}
.mm-header { display:flex; align-items:center; justify-content: space-between; }
.mm-logo { height: 10vh; }
.mm-section { display:flex; flex-direction: column; gap: 12px; }
.mm-section a { text-decoration: none; color: #111; font-weight: 600; font-size: 1.5rem; }
.mm-categories h4 { margin: 0 0 4px; font-size: .9rem; color: #666; font-weight: 600; }
.mm-divider { height:1px; background:#e5e5e5; margin: 4px 0; }
.mm-actions { display:flex; flex-direction: column; gap: 10px; }
.mm-btn { height: 44px; border-radius: 8px; border:1px solid #ddd; background:#fff; font-weight:700; }
.mm-btn-enter { height: 44px; border-radius: 8px; border:1px solid #000000; background:#000000; font-weight:700; color:#fff; text-decoration: none; text-decoration-line: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.mm-btn.primary { background:#000; color:#fff; border-color:#000; }

/* Animações */
.menu-fade-enter-from, .menu-fade-leave-to { opacity:0 }
.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity .2s ease }

.menu-slide-enter-from, .menu-slide-leave-to { transform: translateX(100%); opacity: 0 }
.menu-slide-enter-active, .menu-slide-leave-active { transition: transform .25s ease, opacity .2s ease }
.menu-slide-enter-to, .menu-slide-leave-from { transform: translateX(0); opacity: 1 }

/* Responsividade */
@media (max-width: 1024px) {
  .header-top { justify-content: space-between; gap: 1rem; padding: 0 16px; height: 72px; }
  .menu-btn { display: flex; margin-left: auto; order: 3; }
  .logo { height: 40px; }
  .pages, .perfilShop, .category-icons { display: none; }
  .logoImg { height: 5vh; }
}

@media (max-width: 640px) {
  .mm-logo { height: 6vh; }
  .mm-btn { height: 42px; }
}
</style>
