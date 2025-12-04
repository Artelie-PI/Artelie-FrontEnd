<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSidebarCart } from "/src/stores/useSidebarCart.js";
import MenuHeader from "@/components/MenuHeader.vue";
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'


const showHeader = ref(true);
const { open } = useSidebarCart();


const router = useRouter();
const route = useRoute();
const userStore = useUserStore()
const { isAuthenticated, displayName } = storeToRefs(userStore)


// controla se a barra de categorias aparece
const showCategories = ref(true);


// Scroll até a seção de marcas na home
function scrollToMarcas() {
 const el = document.getElementById("marcas");
 if (el) {
   el.scrollIntoView({ behavior: "smooth", block: "start" });
 }
}


function goToMarcas() {
 if (route.path === "/") {
   scrollToMarcas();
   return;
 }
 router.push({ path: "/", hash: "#marcas" }).then(() => {
   setTimeout(scrollToMarcas, 200);
 });
}

function doLogout() {
  userStore.logout()
  router.push('/')
}


// Esconde/mostra barra de categorias conforme o scroll
function handleScroll() {
 const y = window.scrollY || window.pageYOffset;
 // ajuste esse valor conforme o seu gosto (quanto de scroll antes de esconder)
 showCategories.value = y < 60;
}


onMounted(() => {
 window.addEventListener("scroll", handleScroll, { passive: true });
 handleScroll(); // estado inicial
});


onBeforeUnmount(() => {
 window.removeEventListener("scroll", handleScroll);
});
</script>


<template>
 <transition name="slide-down">
   <header v-if="showHeader" class="header-root">
     <!-- SECTION: Letreiro superior -->
     <section class="top-banner">
       <div class="top-banner-track">
         <div class="top-banner-row">
           <span>FRETE FIXO R$ 7,90</span>
           <span>•</span>
           <span>PARCELE EM ATÉ 5X SEM JUROS</span>
           <span>•</span>
           <span>DESCONTO EM COMPRAS ACIMA DE R$ 500</span>
           <span>•</span>
         </div>
         <!-- Duplicado para efeito contínuo -->
         <div class="top-banner-row">
           <span>FRETE FIXO R$ 7,90</span>
           <span>•</span>
           <span>PARCELE EM ATÉ 5X SEM JUROS</span>
           <span>•</span>
           <span>DESCONTO EM COMPRAS ACIMA DE R$ 500</span>
           <span>•</span>
         </div>
         <div class="top-banner-row">
           <span>FRETE FIXO R$ 7,90</span>
           <span>•</span>
           <span>PARCELE EM ATÉ 5X SEM JUROS</span>
           <span>•</span>
           <span>DESCONTO EM COMPRAS ACIMA DE R$ 500</span>
           <span>•</span>
         </div>
       </div>
     </section>


     <!-- Conteúdo principal do header -->
     <div class="header-main">
       <!-- Linha superior -->
       <div class="header-top">
         <!-- Menu mobile (componente hambúrguer + sidebar) -->
         <MenuHeader />


         <!-- Logo -->
         <div class="logo slide-item">
           <RouterLink to="/">
             <img class="logoImg" src="@/assets/images/logo3.png" alt="Artelie Logo" />
           </RouterLink>
         </div>


         <!-- Menu de páginas (desktop) -->
         <nav class="pages slide-item" style="transition-delay: 0.1s">
           <RouterLink to="/">HOME</RouterLink>
           <a href="#" @click.prevent="goToMarcas">MARCAS</a>
           <RouterLink to="/contact">CONTATO</RouterLink>
         </nav>


         <!-- Perfil / Login + Carrinho (desktop) -->
         <div class="perfilShop slide-item" style="transition-delay: 0.2s">
           <template v-if="isAuthenticated">
             <span class="user-name">Olá, {{ displayName }}!</span>
             <button class="logout-btn" @click="doLogout">Sair</button>
           </template>
           <template v-else>
             <RouterLink to="/login">
               <img src="@/assets/images/Login.png" alt="LoginIcon" />
             </RouterLink>
           </template>
           <img src="@/assets/images/Cart.png" @click="open" alt="SacolaIcon" />
         </div>
       </div>


       <!-- Barra de categorias (some ao rolar) -->
       <nav v-if="showCategories" class="category-icons">
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
           <span>LIVROS</span>
         </RouterLink>
       </nav>
     </div>
   </header>
 </transition>
</template>


<style scoped>
/* Animação de entrada */
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
.slide-item:nth-child(1) { animation-delay: 0.2s; }
.slide-item:nth-child(2) { animation-delay: 0.4s; }
.slide-item:nth-child(3) { animation-delay: 0.6s; }


@keyframes slideItemDown {
 to {
   opacity: 1;
   transform: translateY(0);
 }
}


/* Header fixo */
.header-root {
 position: sticky;
 top: 0;
 z-index: 50;
}


/* SECTION: letreiro estilo CienaLab */
.top-banner {
 width: 100%;
 background-color: #000787;
 color: #f0ff00;
 font-size: 1rem;
 font-weight: 500;
 text-transform: uppercase;
 overflow: hidden;
 white-space: nowrap;
 padding: 5px;
}
.top-banner-track {
 display: flex;
 width: max-content;
 animation: banner-marquee 100s linear infinite;
}
.top-banner-row {
 display: inline-flex;
 align-items: center;
 gap: 3rem;
 padding: 0 20px;
}
@keyframes banner-marquee {
 0%   { transform: translateX(0); }
 100% { transform: translateX(-50%); }
}


/* Container principal abaixo do letreiro */
.header-main {
 width: 100%;
 display: flex;
 flex-direction: column;
 background-color: white;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


/* Linha superior */
.header-top {
 height: 9vh;
 min-height: 60px;
 display: flex;
 justify-content: space-around;
 gap: 10rem;
 align-items: center;
 padding: 0 24px;
 position: relative;
}
.logoImg {
 height: 7vh;
 min-height: 45px;
 max-height: 60px;
}


/* Links principais (desktop) */
.pages {
 display: flex;
 gap: 8rem;
 justify-content: center;
}
.pages a {
 text-decoration: none;
 color: black;
 font-weight: 500;
 font-size: 0.9rem;
 border-bottom: 2px solid transparent;
}


/* Login + carrinho */
.perfilShop {
 display: flex;
 gap: 1rem;
}
.perfilShop img {
 width: 30px;
 height: 30px;
 cursor: pointer;
}
.user-name {
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 600;
  font-size: 0.9rem;
}
.logout-btn {
  border: 1px solid #d8d8d8;
  background: white;
  border-radius: 6px;
  font-size: 0.8rem;
  padding: 6px 10px;
  cursor: pointer;
}


/* Navbar inferior */
.category-icons {
 display: flex;
 justify-content: center;
 gap: 5rem;
 border-top: 1px solid #d8d8d8;
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
.category-icons a img {
 width: 1.3rem;
 height: 1.3rem;
 margin-bottom: 0.3rem;
 transition: transform 0.16s, opacity 0.16s;
}


/* Responsivo */
@media (max-width: 900px) {
 .header-top {
   gap: 2rem;
   padding: 0 16px;
 }
}


/* Mobile */
@media (max-width: 768px) {
 /* Esconde menu desktop e categorias desktop */
 .pages,
 .category-icons {
   display: none !important;
 }


  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 12px;
    height: 60px;
    min-height: 60px;
  }

 /* Centraliza logo, mantendo menu à esquerda e ícones à direita */
  .logo {
    display: flex;
    flex: 1 1 0;
    justify-content: center;
    align-items: center;
    /* Remova left, transform, margin-left, etc */
  }


  .logoImg {
    height: 40px;
    max-width: 120px;
    min-width: 80px;
    width: 100%;
    object-fit: contain;
    margin: 0;
  }

  .perfilShop {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1 1 0;
    margin-left: 0;
  }


 .top-banner-row {
   gap: 2rem;
   padding: 0 2rem;
 }
 .top-banner {
   font-size: 0.7rem;
 }
}


/* Mobile pequeno */
@media (max-width: 480px) {
 .header-top {
   padding: 0 12px;
 }
 .logoImg {
   height: 45px;
 }
 .perfilShop img {
   width: 26px;
   height: 26px;
 }
 .top-banner {
   font-size: 0.7rem;
 }
}
</style>
