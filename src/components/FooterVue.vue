<script setup>
const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: "smooth" });
};
import instagram from "@/assets/images/instagram.png";
import tiktok from "@/assets/images/tik-tok.png";
import facebook from "@/assets/images/facebook.png";
import whatsapp from "@/assets/images/whatsapp.png";
import logo from "@/assets/images/Logo1.png";
import { RouterLink } from "vue-router";
</script>


<template>
 <footer class="footer">
   <div class="footer-container">
     <!-- Coluna 1: Logo e Redes Sociais -->
     <div class="footer-column logo-column">
       <div class="logo">
         <img :src="logo" alt="Logo Arteliê" />
       </div>
       <div class="social-icons">
         <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
           <img :src="instagram" alt="Instagram" />
         </a>
         <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">
           <img :src="tiktok" alt="TikTok" />
         </a>
         <a href="https://wa.me/seunumero" target="_blank" rel="noopener" aria-label="WhatsApp">
           <img :src="whatsapp" alt="WhatsApp" />
         </a>
         <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
           <img :src="facebook" alt="Facebook" />
         </a>
       </div>
     </div>


     <!-- Coluna 2: Categorias -->
     <div class="footer-column">
       <p class="footer-title">CATEGORIAS</p>
       <ul>
         <li>
           <RouterLink to="/category/papeis">Papéis</RouterLink>
         </li>
         <li>
           <RouterLink to="/category/pintura">Pintura</RouterLink>
         </li>
         <li>
           <RouterLink to="/category/lapis-canetas">Lápis & Canetas</RouterLink>
         </li>
         <li>
           <RouterLink to="/category/livros-gibis">Livros & Gibis</RouterLink>
         </li>
       </ul>
     </div>


     <!-- Coluna 3: Produção do Site -->
     <div class="footer-column">
       <p class="footer-title">PRODUÇÃO DO SITE</p>
       <ul>
         <li>
           <a href="https://github.com/gabrielmartinsgomes" target="_blank" rel="noopener">Gabriel Martins</a>
         </li>
         <li>
           <a href="https://github.com/GuilhermeSchreiber7" target="_blank" rel="noopener">Guilherme Schreiber</a>
         </li>
         <li>
           <a href="https://github.com/MuriloDaCruz" target="_blank" rel="noopener">Murilo Souza</a>
         </li>
         <li>
           <a href="https://github.com/SPNicolas" target="_blank" rel="noopener">Nicolas Steffens</a>
         </li>
       </ul>
     </div>


     <!-- Coluna 4: Formas de Pagamento -->
     <div class="footer-column">
       <p class="footer-title">FORMAS DE PAGAMENTO</p>
       <div class="payment-methods">
         <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" />
         <img src="https://images.seeklogo.com/logo-png/6/1/hipercard-logo-png_seeklogo-66999.png" alt="Hipercard" />
         <img src="https://artpoin.com/wp-content/uploads/2023/09/artpoin-logo-pix.png" alt="PIX" />
       </div>
     </div>
   </div>


   <!-- Rodapé Inferior -->
   <div class="bottom-footer">
     <span>© 2025 – ArteliêOnline. Todos os direitos reservados.</span>
     <button class="back-to-top" @click="scrollToTop" aria-label="Voltar ao topo">Retornar</button>
   </div>
 </footer>
</template>


<style scoped>
.footer {
 background-color: #000787;
 color: white;
 padding: 40px 20px 5px;
 margin-top: 40px;
}


/* Container central */
.footer-container {
 max-width: 1280px;
 margin: 0 auto;
 display: flex;
 justify-content: space-between;
 align-items: flex-start;
 gap: 32px;
 flex-wrap: wrap;
}


.footer-title {
 font-size: 1rem;
 font-weight: 600;
 margin: 0 0 12px 0;
 letter-spacing: 0.3px;
}


/* Colunas */
.footer-column {
 min-width: 180px;
 flex: 1 1 220px;
 font-size: 0.9rem;
}


.footer-column ul {
 list-style: none;
 padding: 0;
 margin: 0;
}


.footer-column ul li {
 margin-bottom: 8px;
}


.footer-column ul li a,
.footer-column ul li :deep(a) {
 color: white;
 text-decoration: none;
 transition: opacity 0.2s;
}




/* Logo e Redes Sociais */
.logo-column {
 display: flex;
 flex-direction: column;
 align-items: flex-start;
}


.logo img {
 max-width: 120px;
 height: auto;
 margin-bottom: 16px;
}


.social-icons {
 display: flex;
 gap: 12px;
 margin-top: 8px;
}


.social-icons img {
 width: 26px;
 height: 26px;
 cursor: pointer;
 transition: transform 0.2s, opacity 0.2s;
}


/* Formas de Pagamento */
.payment-methods {
 display: flex;
 gap: 10px;
 align-items: center;
 flex-wrap: wrap;
 margin-top: 6px;
}


.payment-methods img {
 height: 28px;
 width: auto;
}


/* Rodapé Inferior */
.bottom-footer {
 max-width: 1280px;
 margin: 20px auto 0;
 padding: 16px 20px 10px;
 border-top: 1px solid rgba(255, 255, 255, 0.3);
 display: flex;
 justify-content: space-between;
 align-items: center;
 gap: 12px;
 font-size: 0.9rem;
}


.back-to-top {
 background: none;
 border: none;
 color: white;
 cursor: pointer;
 font-size: 0.9rem;
 font-weight: 500;
 padding: 6px 12px;
 transition: opacity 0.2s;
}


/* ========================================
  RESPONSIVO: TABLET (768px e abaixo)
======================================== */
@media (max-width: 768px) {
 .footer {
   padding: 32px 16px 5px;
 }


 .footer-container {
   gap: 24px;
 }


 .footer-column {
   flex: 1 1 calc(50% - 12px); /* 2 colunas no tablet */
   min-width: 160px;
 }


 .footer-title {
   font-size: 0.95rem;
   margin-bottom: 10px;
 }


 .footer-column {
   font-size: 0.85rem;
 }


 .logo img {
   max-width: 100px;
 }


 .social-icons img {
   width: 24px;
   height: 24px;
 }


 .payment-methods img {
   height: 24px;
 }


 .bottom-footer {
   flex-direction: column;
   text-align: center;
   gap: 10px;
   font-size: 0.85rem;
   padding: 14px 16px 10px;
 }


 .back-to-top {
   font-size: 0.85rem;
 }
}


/* ========================================
  RESPONSIVO: MOBILE (480px e abaixo)
======================================== */
@media (max-width: 480px) {
 .footer {
   padding: 24px 12px 5px;
   margin-top: 24px;
 }


 .footer-container {
   gap: 20px;
 }


 .footer-column {
   flex: 1 1 100%; /* 1 coluna no mobile */
   text-align: center;
 }


 .logo-column {
   align-items: center;
 }


 .footer-title {
   font-size: 0.9rem;
   margin-bottom: 8px;
 }


 .footer-column {
   font-size: 0.8rem;
 }


 .footer-column ul li {
   margin-bottom: 6px;
 }


 .logo img {
   max-width: 90px;
   margin-bottom: 12px;
 }


 .social-icons {
   gap: 10px;
   justify-content: center;
 }


 .social-icons img {
   width: 22px;
   height: 22px;
 }


 .payment-methods {
   justify-content: center;
   gap: 8px;
 }


 .payment-methods img {
   height: 22px;
 }


 .bottom-footer {
   font-size: 0.75rem;
   padding: 12px 12px 8px;
   margin-top: 16px;
 }


 .back-to-top {
   font-size: 0.8rem;
   padding: 5px 10px;
 }
}
</style>