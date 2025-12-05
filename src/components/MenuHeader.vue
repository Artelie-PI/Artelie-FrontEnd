<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { ref } from "vue";


const router = useRouter();
const route = useRoute();


const isMenuOpen = ref(false);


function toggleMenu() {
 isMenuOpen.value = !isMenuOpen.value;
}


function closeMenu() {
 isMenuOpen.value = false;
}


function scrollToMarcas() {
 const el = document.getElementById("marcas");
 if (el) {
   el.scrollIntoView({ behavior: "smooth", block: "start" });
 }
}


function goToMarcas() {
 if (route.path === "/") {
   scrollToMarcas();
   closeMenu();
   return;
 }
 router.push({ path: "/", hash: "#marcas" }).then(() => {
   setTimeout(scrollToMarcas, 200);
 });
 closeMenu();
}
</script>


<template>
 <!-- Botão hambúrguer (visível só no mobile pelo CSS) -->
 <button class="menu-btn" @click="toggleMenu" aria-label="Menu">
   <span></span>
   <span></span>
   <span></span>
 </button>


 <!-- Menu lateral mobile -->
 <transition name="sidebar-menu">
   <div v-if="isMenuOpen" class="menu-overlay" @click.self="closeMenu">
     <aside class="menu-sidebar">
       <!-- Botão fechar -->
       <img
         src="@/assets/images/Cancel.png"
         class="menu-close-btn"
         @click="closeMenu"
         alt="Fechar"
       />


       <!-- Links principais -->
       <nav class="menu-links">
         <RouterLink to="/" @click="closeMenu" class="menu-link">Home</RouterLink>
         <RouterLink to="/contact" @click="closeMenu" class="menu-link">Contato</RouterLink>
         <a href="#" @click.prevent="goToMarcas" class="menu-link">Marcas</a>
       </nav>


       <!-- Categorias -->
       <div class="menu-categories">
         <h3 class="menu-categories-title">Categorias</h3>


         <RouterLink
           :to="{ name: 'category', params: { slug: 'papeis' } }"
           @click="closeMenu"
           class="menu-category-item"
         >
           <img src="@/assets/images/Papel.svg" alt="Papéis" />
           <span>Papéis</span>
         </RouterLink>


         <RouterLink
           :to="{ name: 'category', params: { slug: 'pintura' } }"
           @click="closeMenu"
           class="menu-category-item"
         >
           <img src="@/assets/images/Tinta.svg" alt="Pintura" />
           <span>Pintura</span>
         </RouterLink>


         <RouterLink
           :to="{ name: 'category', params: { slug: 'lapis-canetas' } }"
           @click="closeMenu"
           class="menu-category-item"
         >
           <img src="@/assets/images/Lápis.svg" alt="Lápis & Canetas" />
           <span>Lápis & Canetas</span>
         </RouterLink>


         <RouterLink
           :to="{ name: 'category', params: { slug: 'livros-gibis' } }"
           @click="closeMenu"
           class="menu-category-item"
         >
           <img src="@/assets/images/Book.svg" alt="Livros" />
           <span>Livros</span>
         </RouterLink>
       </div>
     </aside>
   </div>
 </transition>
</template>


<style scoped>
/* Botão hambúrguer */
.menu-btn {
 display: none;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 5px;
 width: 32px;
 height: 32px;
 background: transparent;
 border: none;
 cursor: pointer;
 padding: 0;
}
.menu-btn span {
 display: block;
 width: 22px;
 height: 2px;
 background: #000;
 border-radius: 2px;
 transition: 0.3s;
}


/* Transição do menu (igual à sacola, vindo da esquerda) */
.sidebar-menu-enter-active,
.sidebar-menu-leave-active {
 transition: opacity 0.3s ease;
}
.sidebar-menu-enter-from,
.sidebar-menu-leave-to {
 opacity: 0;
}
.sidebar-menu-enter-active .menu-sidebar,
.sidebar-menu-leave-active .menu-sidebar {
 transition: transform 0.4s ease;
}
.sidebar-menu-enter-from .menu-sidebar,
.sidebar-menu-leave-to .menu-sidebar {
 transform: translateX(-100%);
}


/* Overlay cobre apenas abaixo do header */
.menu-overlay {
 position: fixed;
 left: 0;
 right: 0;
 top: 0;               /* altura aproximada do header-top em mobile */
 bottom: 0;
 background: rgba(0, 0, 0, 0.4);
 z-index: 2000;
 display: flex;
 justify-content: flex-start;
}


/* Sidebar menu */
.menu-sidebar {
 width: 100%;
 max-width: 420px;
 height: 100%;
 background: #fff;
 position: relative;
 padding: 40px 24px 24px;
 overflow-y: auto;
}


/* Botão fechar */
.menu-close-btn {
 width: 20px;
 position: absolute;
 top: 16px;
 left: 24px;
 cursor: pointer;
 opacity: 0.8;
 transition: opacity 0.2s;
}
.menu-close-btn:hover {
 opacity: 1;
}


/* Links principais (menores que antes) */
.menu-links {
 display: flex;
 flex-direction: column;
 margin-bottom: 32px;
}
.menu-link {
 text-decoration: none;
 color: #000;
 font-size: 1.1rem;
 font-weight: 500;
 padding: 12px 0;
 border-bottom: 1px solid #f0f0f0;
 text-transform: uppercase;
 letter-spacing: 0.05em;
}


/* Categorias */
.menu-categories {
 margin-top: 24px;
}
.menu-categories-title {
 font-size: 0.95rem;
 font-weight: 600;
 color: #555;
 margin: 0 0 12px 0;
 text-transform: uppercase;
 letter-spacing: 0.08em;
}
.menu-category-item {
 display: flex;
 align-items: center;
 gap: 12px;
 padding: 10px 0;
 text-decoration: none;
 color: #333;
 font-size: 0.95rem;
 font-weight: 400;
 border-bottom: 1px solid #f5f5f5;
}
.menu-category-item img {
 width: 22px;
 height: 22px;
 opacity: 0.8;
}


/* Responsivo: só mostra o hambúrguer no mobile */
@media (max-width: 768px) {
 .menu-btn {
   display: flex;
 }
}


@media (max-width: 480px) {
 .menu-sidebar {
   max-width: 100%;
 }
 .menu-link {
   font-size: 1rem;
 }
}
</style>
