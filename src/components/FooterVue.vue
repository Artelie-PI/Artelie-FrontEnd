<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
import instagram from "@/assets/images/Instagram.png";
import tiktok from "@/assets/images/TikTok.png";
import facebook from "@/assets/images/Facebook1.png";
import logo from "@/assets/images/Logo.png";
import { RouterLink } from "vue-router";

const whatsapp =
  "https://www.pikpng.com/pngl/b/49-494277_logo-whatsapp-png-branco-logo-whatsapp-branco-png.png";
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
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
      <div class="footer-column">
        <h4>CATEGORIAS</h4>
        <ul>
          <li><RouterLink to="/category/papeis">Papéis</RouterLink></li>
              <li><RouterLink to="/category/pintura">Pintura</RouterLink></li>
              <li><RouterLink to="/category/lapis-canetas">Lápis & Canetas</RouterLink></li>
              <li><RouterLink to="/category/livros-gibis">Livros & Gibis</RouterLink></li>
            </ul>
          </div>


      <!-- Coluna 3 -->
      <div class="footer-column">
        <h4>PRODUÇÃO DO SITE</h4>
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
        <h4>FORMAS DE PAGAMENTO</h4>
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
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeFOcf9LrQo11_tf9lMiV-_yRxlEcH0vgRQ&s"
            alt="Boleto"
          />
        </div>
      </div>
    </div>

    <!-- Rodapé Inferior -->
    <div class="bottom-footer">
      <span>© 2025 – ArteliêOnline. Todos os direitos reservados.</span>
      <button class="back-to-top" @click="scrollToTop">⬆ Retornar</button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000080; /* azul escuro */
  color: white;
  padding: 50px 80px;
  font-family: "Inter", sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px; /* espaçamento entre colunas */
}

.footer-column {
  min-width: 180px;
  font-size: 16px; /* ajustado para ficar mais próximo do Figma */
}

.footer-column h4 {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.2s;
}
.footer-column ul li a {
  color: white;
  text-decoration: none;
}
.footer-column ul li a:hover {
  text-decoration: underline;
}
.footer-column ul li:hover {
  color: #ffcc00; /* amarelo claro ao passar o mouse */
}
.footer-column ul li:last-child {
  margin-bottom: 0;
}
.footer-column ul li RouterLink {
  text-decoration: none;
  color: white;
}
.footer-column ul li RouterLink:hover {
  text-decoration: underline;
}

.logo img {
  max-width: 120px;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social-icons img {
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: transform 0.2s;
}

.social-icons img:hover {
  transform: scale(1.1);
}

.payment-methods {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.payment-methods img {
  height: 35px;
  width: auto;
}

.bottom-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 30px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.back-to-top {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s;
}
.back-to-top:hover {
  color: #ffcc00;
}
</style>
