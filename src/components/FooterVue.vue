<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
import instagram from "@/assets/images/instagram.png";
import tiktok from "@/assets/images/tik-tok.png";
import facebook from "@/assets/images/facebook.png";
import whatsapp from "@/assets/images/whatsapp.png";
import logo from "@/assets/images/Logo.png";
import { RouterLink } from "vue-router";

</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Coluna 1 -->
      <div class="footer-column">
        <div class="logo">
          <img :src="logo" alt="Logo Arteliê" />
        </div>
        <div class="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener">
            <img :src="instagram" alt="Instagram" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener">
            <img :src="tiktok" alt="TikTok" />
          </a>
          <a href="https://wa.me/seunumero" target="_blank" rel="noopener">
            <img :src="whatsapp" alt="WhatsApp" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener">
            <img :src="facebook" alt="Facebook" />
          </a>
        </div>
      </div>

      <!-- Coluna 2 -->
      <div class="footer-column">
        <p class="footer-title">CATEGORIAS</p>
        <ul>
          <li><RouterLink to="/category/papeis">Papéis</RouterLink></li>
          <li><RouterLink to="/category/pintura">Pintura</RouterLink></li>
          <li><RouterLink to="/category/lapis-canetas">Lápis & Canetas</RouterLink></li>
          <li><RouterLink to="/category/livros-gibis">Livros & Gibis</RouterLink></li>
        </ul>
      </div>

      <!-- Coluna 3 -->
      <div class="footer-column">
        <p class="footer-title">PRODUÇÃO DO SITE</p>
        <ul>
          <li>
            <a href="https://github.com/gabrielmartinsgomes" target="_blank">Gabriel Martins</a>
          </li>
          <li>
            <a href="https://github.com/GuilhermeSchreiber7" target="_blank">Guilherme Schreiber</a>
          </li>
          <li><a href="https://github.com/MuriloDaCruz" target="_blank">Murilo Souza</a></li>
          <li><a href="https://github.com/SPNicolas" target="_blank">Nicolas Steffens</a></li>
        </ul>
      </div>

      <!-- Coluna 4 -->
      <div class="footer-column">
        <p class="footer-title">FORMAS DE PAGAMENTO</p>
        <div class="payment-methods">
          <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" />
          <img
            src="https://images.seeklogo.com/logo-png/6/1/hipercard-logo-png_seeklogo-66999.png"
            alt="Hipercard"
          />
          <img
            src="https://artpoin.com/wp-content/uploads/2023/09/artpoin-logo-pix.png"
            alt="PIX"
          />
        </div>
      </div>
    </div>

    <!-- Rodapé Inferior -->
    <div class="bottom-footer">
      <span>© 2025 – ArteliêOnline. Todos os direitos reservados.</span>
      <button class="back-to-top" @click="scrollToTop">Retornar</button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000787;
  color: white;
  padding: 40px 0 5px;
}

/* Container central com largura máxima */
.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap; /* permite quebrar em telas menores */
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

/* Colunas com largura mínima, sem forçar altura */
.footer-column {
  min-width: 200px;
  flex: 1 1 220px; /* responsivo: cresce/se ajusta sem quebrar layout */
  font-size: 0.95rem;
}

.footer-column h4 {
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 8px;
  transition: color 0.2s;
}

.footer-column ul li a,
.footer-column ul li :deep(a) {
  color: white;
  text-decoration: none;
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
  transition: transform 0.2s;
}

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

/* Rodapé inferior compacto */
.bottom-footer {
  max-width: 1280px;
  margin: 16px auto;
  padding-top: 10px;
  border-top: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
}

.back-to-top {
  background: none;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 6px 12px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

/* Responsivo */
@media (max-width: 768px) {
  .footer-container {
    gap: 24px;
  }
  .footer-column {
    flex: 1 1 45%;
  }
  .bottom-footer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
}
@media (max-width: 420px) {
  .footer-column {
    flex: 1 1 100%;
  }
}
</style>
