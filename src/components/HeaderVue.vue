<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const showHeader = ref(false)
onMounted(() => {
  setTimeout(() => {
    showHeader.value = true
  }, 150)
})
</script>
<template>
    <transition name="slide-down">
      <header v-if="showHeader">
        <div class="logo slide-item">
          <RouterLink to="/"> <img class="logoImg" src="@/assets/images/ArtelieLogo.png" alt="Artelie Logo"></RouterLink>
        </div>
        <div class="pages slide-item" style="transition-delay: 0.1s;">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/brands">Brands</RouterLink>
        </div>
        <div class="perfilShop slide-item" style="transition-delay: 0.2s;">
          <RouterLink to="/login"><img src="@/assets/images/Login.png" alt=""></RouterLink>
          <RouterLink to="/shop"><img src="@/assets/images/Cart.png" alt=""></RouterLink>
        </div>
      </header>
    </transition>
</template>
<style scoped>
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.slide-down-enter-active {/* ...restante do seu CSS... */
  transition: all 0.7s cubic-bezier(.68,-0.55,.27,1.55);
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
main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header{
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.logo{
  width: 20vw;
}
.logoImg{
  height: 13vh;
}
.pages{
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 20vw;
}
.pages a{
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  color: #333;
  font-size: 1.8rem;
  transition: border-bottom 0.3s, font-size 0.3s;
  border-bottom: 2px solid transparent;
}
.pages a:hover {
  border-bottom: 2px solid #333;
  font-size: 2rem;
}
.perfilShop{
  display: flex;
  gap: 1.5rem;
  width: 20vw;
  justify-content: flex-end;  
}
.perfilShop img{
  width: 3rem;
  height: 3rem;
  transition: transform 0.3s;
}
.perfilShop img:hover{
  transform: scale(1.2);
}
</style>