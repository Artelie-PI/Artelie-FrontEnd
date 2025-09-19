<!-- src/components/HeaderVue.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user' // se tiver store de usuário

const showHeader = ref(false)
onMounted(() => {
  setTimeout(() => {
    showHeader.value = true
  }, 150)
})

const userStore = useUserStore ? useUserStore() : null

function handleLogout() {
  if (userStore) userStore.logout()
}
</script>

<template>
  <transition name="slide-down">
    <header v-if="showHeader">
      <div class="logo slide-item">
        <RouterLink to="/"> <img class="logoImg" src="@/assets/images/ArtelieLogo.png" alt="Artelie Logo"></RouterLink>
      </div>

      <nav class="category-icons slide-item" style="transition-delay: 0.1s;">
        <RouterLink :to="{ name: 'category', params: { slug: 'papeis' } }" title="Papeis">
          <img src="@/assets/images/icons/Papel.svg" alt="Papeis" />
        </RouterLink>

        <RouterLink :to="{ name: 'category', params: { slug: 'pintura' } }" title="Pintura">
          <img src="@/assets/images/icons/Tinta.svg" alt="Pintura" />
        </RouterLink>

        <RouterLink :to="{ name: 'category', params: { slug: 'lapis-canetas' } }" title="Lápis & Canetas">
          <img src="@/assets/images/icons/Lápis.svg" alt="Lápis" />
        </RouterLink>

        <RouterLink :to="{ name: 'category', params: { slug: 'livros-quadrinhos' } }" title="Livros & Quadrinhos">
          <img src="@/assets/images/icons/Book.svg" alt="Livros" />
        </RouterLink>
      </nav>

      <div class="perfilShop slide-item" style="transition-delay: 0.2s;">
        <template v-if="userStore && userStore.isAuthenticated">
          <span class="hello">Olá,&nbsp;<strong>{{ userStore.displayName }}</strong></span>
          <button class="logoutBtn" @click="handleLogout">Sair</button>
        </template>
        <template v-else>
          <RouterLink to="/login"><img src="@/assets/images/Login.png" alt="login"></RouterLink>
        </template>

        <RouterLink to="/shop"><img src="@/assets/images/Cart.png" alt="cart"></RouterLink>
      </div>
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

main{ width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; }
header{ width: 100%; height: 20vh; display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; background-color: #f8f8f8; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.logo{ width: 20vw; }
.logoImg{ height: 13vh; }

/* novo: icons nav */
.category-icons{
  display:flex;
  gap: 1.2rem;
  align-items:center;
  justify-content:center;
  width: 40vw;
}
.category-icons a img {
  width: 3.2rem;
  height: 3.2rem;
  object-fit: contain;
  transition: transform .16s, opacity .16s;
  opacity: .95;
}
.category-icons a img:hover { transform: translateY(-4px) scale(1.05); opacity: 1; }

.pages{ display: flex; gap: 2rem; justify-content: center; width: 20vw; }
.pages a{ text-decoration: none; font-family: 'Poppins', sans-serif; color: #333; font-size: 1.8rem; transition: border-bottom 0.3s, font-size 0.3s; border-bottom: 2px solid transparent; }
.pages a:hover { border-bottom: 2px solid #333; font-size: 2rem; }

.perfilShop{ display: flex; gap: 1.5rem; width: 20vw; justify-content: flex-end; align-items:center; }
.perfilShop img{ width: 3rem; height: 3rem; transition: transform 0.3s; }
.perfilShop img:hover{ transform: scale(1.2); }

.hello { font-family: 'Poppins', sans-serif; font-size: 1.6rem; color: #333; display:inline-flex; align-items:center; gap:.6rem; }
.logoutBtn { background: transparent; border: 1px solid transparent; padding: .4rem .6rem; margin-left: .6rem; cursor:pointer; border-radius:6px; font-size:1.1rem; transition: background .18s, transform .12s; }
.logoutBtn:hover { background: rgba(0,0,0,0.06); transform: translateY(-2px); }
</style>
