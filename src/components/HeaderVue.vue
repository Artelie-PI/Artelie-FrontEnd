<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const showHeader = ref(false)
const showDrawer = ref(false) // Estado do menu lateral

onMounted(() => {
  setTimeout(() => {
    showHeader.value = true
  }, 150)
})

const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
}
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

        <!-- Botão do menu lateral (mobile) -->
        <button class="menu-btn" @click="showDrawer = true">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Menu de páginas (desktop) -->
        <nav class="pages slide-item" style="transition-delay: 0.1s;">
          <RouterLink to="/">HOME</RouterLink>
          <RouterLink to="/contact">CONTATO</RouterLink>
          <RouterLink to="/brands">MARCAS</RouterLink>
        </nav>

        <!-- Perfil / Login + Carrinho (desktop) -->
        <div class="perfilShop slide-item" style="transition-delay: 0.2s;">
          <template v-if="userStore.isAuthenticated">
            <span class="hello">Olá, <strong>{{ userStore.displayName }}</strong></span>
            <button class="logoutBtn" @click="handleLogout">Sair</button>
          </template>
          <template v-else>
            <RouterLink to="/login">
              <img src="@/assets/images/Login.png" alt="login" />
            </RouterLink>
          </template>
          <RouterLink to="/shop">
            <img src="@/assets/images/Cart.png" alt="cart" />
          </RouterLink>
        </div>
      </div>

      <!-- Menu lateral (drawer) para mobile -->
      <transition name="drawer">
        <aside v-if="showDrawer" class="drawer">
          <button class="close-btn" @click="showDrawer = false">&times;</button>
          <nav class="drawer-pages">
            <RouterLink to="/" @click="showDrawer = false">Home</RouterLink>
            <RouterLink to="/contact" @click="showDrawer = false">Contato</RouterLink>
            <RouterLink to="/brands" @click="showDrawer = false">Marcas</RouterLink>
          </nav>
          <div class="drawer-perfilShop">
            <template v-if="userStore.isAuthenticated">
              <span class="hello">Olá, <strong>{{ userStore.displayName }}</strong></span>
              <button class="logoutBtn" @click="handleLogout">Sair</button>
            </template>
            <template v-else>
              <RouterLink to="/login" @click="showDrawer = false">
                <img src="@/assets/images/Login.png" alt="login" />
              </RouterLink>
            </template>
            <RouterLink to="/shop" @click="showDrawer = false">
              <img src="@/assets/images/Cart.png" alt="cart" />
            </RouterLink>
          </div>
        </aside>
      </transition>

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
        <RouterLink :to="{ name: 'category', params: { slug: 'lapis-canetas' } }" title="Lápis & Canetas">
          <img src="@/assets/images/Lápis.svg" alt="Lápis & Canetas" />
          <span>LÁPIS & CANETAS</span>
        </RouterLink>
        <RouterLink :to="{ name: 'category', params: { slug: 'livros-gibis' } }" title="Livros & Gibis">
          <img src="@/assets/images/Book.svg" alt="Livros & Gibis" />
          <span>LIVROS & GIBIS</span>
        </RouterLink>
      </nav>
    </header>
  </transition>
</template>

<style scoped>
.slide-down-enter-from { opacity: 0; transform: translateY(-60px); }
.slide-down-enter-active { transition: all 0.7s cubic-bezier(.68,-0.55,.27,1.55); }
.slide-down-enter-to { opacity: 1; transform: translateY(0); }
.slide-item { opacity: 0; transform: translateY(-40px); animation: slideItemDown 0.7s forwards; }
.slide-item:nth-child(1) { animation-delay: 0.2s; }
.slide-item:nth-child(2) { animation-delay: 0.4s; }
.slide-item:nth-child(3) { animation-delay: 0.6s; }
@keyframes slideItemDown { to { opacity: 1; transform: translateY(0); } }

/* Header geral */
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Linha superior */
.header-top {
  height: 14vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logoImg { height: 10vh; }

/* Links principais */
.pages {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
.pages a {
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  transition: border-bottom 0.3s, font-size 0.3s;
  border-bottom: 2px solid transparent;
}
.pages a:hover { font-size: 1.5rem; }

/* Login + carrinho */
.perfilShop {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  align-items: center;
}
.perfilShop img { width: 2.6rem; height: 2.6rem; transition: transform 0.3s; }
.perfilShop img:hover { transform: scale(1.2); }
.hello { font-family: 'Poppins', sans-serif; font-size: 1.4rem; color: #333; }
.logoutBtn {
  background: transparent; border: 1px solid #ddd;
  padding: .4rem .8rem; margin-left: .6rem; cursor:pointer;
  border-radius:6px; font-size:1.1rem;
  transition: background .18s, transform .12s;
}
.logoutBtn:hover { background: rgba(0,0,0,0.06); transform: translateY(-2px); }

/* Navbar inferior */
.category-icons {
  display: flex;
  justify-content: center;
  gap: 5rem;
  border-top: 1px solid #ddd;
  padding: 0.8rem 0;
}
.category-icons a {
  display: flex;
  gap: .6rem;
  align-items: center;
  font-size: .9rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: transform .16s, opacity .16s;
}
.category-icons a img {
  width: 2.4rem;
  height: 2.4rem;
  margin-bottom: .3rem;
  opacity: .9;
  transition: transform .16s, opacity .16s;
}
.category-icons a:hover img { transform: translateY(-3px) scale(1.05); opacity: 1; }

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

/* Drawer lateral */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 75vw;
  max-width: 320px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0,0,0,0.13);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  animation: drawerIn 0.3s;
}
@keyframes drawerIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.drawer-pages {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}
.drawer-pages a {
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
}
.drawer-perfilShop {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
}
.drawer-perfilShop img {
  width: 2.6rem;
  height: 2.6rem;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  background: transparent;
  border: none;
  font-size: 2.2rem;
  cursor: pointer;
  color: #333;
}

/* Animação do drawer */
.drawer-enter-active, .drawer-leave-active {
  transition: opacity 0.2s;
}
.drawer-enter-from, .drawer-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 728px) {
  .pages,
  .perfilShop,
  .slide-item {
    display: none !important;
  }
  .menu-btn {
    display: flex;
  }
  .drawer {
    display: flex;
  }
}
</style>
