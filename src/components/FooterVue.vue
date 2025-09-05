<script setup>

const scrollToTop = () => {
  console.log("Botão clicado");
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-column">
        <div class="logo"><img src="/src/assets/images/ArtelieLogo.png" alt=""></div>
        <div class="social-icons">
          <i class="fab fa-instagram"><img src="/src/assets/images/Instagram.png" alt="" height="42px" width="42px"></i>
          <i class="fab fa-tiktok"><img src="/src/assets/images/Tiktok.png" alt="" height="42px" width="42px"></i>
          <i class="fab fa-whatsapp"><img src="/src/assets/images/Whatsapp.png" alt="" height="42px" width="42px"></i>
          <i class="fab fa-facebook"><img src="/src/assets/images/Facebook.png" alt="Facebook"></i>
        </div>
      </div>
      <div class="footer-column">
        <h4>CATEGORIAS</h4>
        <ul>
          <li>Lápis</li>
          <li>Tintas</li>
          <li>Papéis</li>
          <li>Canetas</li>
          <li>Artesanato</li>
          <li>Extras+</li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>PRODUÇÃO DO SITE</h4>
        <ul>
          <li>Gabriel Martins</li>
          <li>Guilherme Schreiber</li>
          <li>Murilo Souza</li>
          <li>Nicolas Steffens</li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>FORMAS DE PAGAMENTO</h4>
        <div class="payment-methods">
          <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" />
          <img src="https://images.seeklogo.com/logo-png/6/1/hipercard-logo-png_seeklogo-66999.png" alt="Hipercard" height="28" />
          <img src="https://cdn3.iconfinder.com/data/icons/circle-payment-methods-4/512/Diners_club-512.png" alt="Diners Club" height="28" />
          <img src="https://artpoin.com/wp-content/uploads/2023/09/artpoin-logo-pix.png" alt="PIX" height="28" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeFOcf9LrQo11_tf9lMiV-_yRxlEcH0vgRQ&s" alt="Boleto" height="28" />
        </div>
      </div>

    </div>
    <div class="bottom-footer">
      <span>© 2025 – ArteliêOnline. Todos os direitos reservados.</span>
      <div class="back-to-top" @click="scrollToTop">
        <i class="fas fa-arrow-up"></i> Retornar
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  background-color: #000080;
  color: white;
  padding: 40px 60px;
  font-family: Poppins, sans-serif;
  margin-top: 500px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-column {
  min-width: 200px;
  margin-bottom: 20px;
  font-size: 20px;
}

.footer-column h4 {
  margin-bottom: 15px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.social-icons i {
  font-size: 24px;
  cursor: pointer;
  color: black;
  padding: 3px;
  border-radius: 5px;
  height: 20px;
  width: 20px;
}

.payment-methods {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.payment-methods img {
  height: 40px;
}

.bottom-footer {
  border-top: 1px solid white;
  margin-top: 20px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.back-to-top {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.back-to-top i {
  margin-right: 5px;
}
</style>

