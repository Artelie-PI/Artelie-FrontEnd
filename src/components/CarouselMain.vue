<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'

// CSS do Swiper (obrigatório)
import 'swiper/css/bundle'

// IMPORTS ESTÁTICOS DAS IMAGENS LOCAIS (troque pelos seus arquivos)
import banner1 from '@/assets/images/FaberCastellBanner.jpg'
import banner2 from '@/assets/images/CaranBanner.jpg'
import banner3 from '@/assets/images/CansonBanner.jpg'
import banner4 from '@/assets/images/WinsorBanner.jpg'

// Props opcionais para tornar o componente reutilizável
const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      {
        id: 1,
        title: 'Faber-Castell',
        subtitle: 'Descrição do banner 1',
        image: banner1
      },
      {
        id: 2,
        title: 'CaranD\'Ache',
        subtitle: 'Descrição do banner 2',
        image: banner2
      },
      {
        id: 3,
        title: 'Canson',
        subtitle: 'Descrição do banner 3',
        image: banner3
      },
      {
        id: 4,
        title: 'Winsor & Newton',
        subtitle: 'Descrição do banner 4',
        image: banner4
      }
    ]
  },
  // Autoplay em ms (0 desliga)
  autoplay: { type: Number, default: 4500 }
})
</script>

<template>
  <section class="carousel-main">
    <Swiper
      :modules="[Autoplay, Navigation, Pagination, EffectCoverflow]"
      :loop="true"
      :centeredSlides="true"
      :slides-per-view="1.2"
      :space-between="0"
      :effect="'coverflow'"
      :coverflowEffect="{ rotate: 0, stretch: 0, depth: 180, modifier: 1, slideShadows: false }"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="autoplay ? { delay: autoplay, disableOnInteraction: false } : false"
      :breakpoints="{
        768: { slidesPerView: 1.4, spaceBetween: 20 },
        1024: { slidesPerView: 1.6, spaceBetween: 24 },
        1280: { slidesPerView: 2.0, spaceBetween: 28 }
      }"
      class="swiper-hero"
    >
      <SwiperSlide v-for="item in slides" :key="item.id">
        <article class="slide-card">
          <img :src="item.image" :alt="item.title" class="slide-img" />
          <div class="slide-mask"></div>
          <div class="slide-content">
            <h3 class="slide-title">{{ item.title }}</h3>
            <p class="slide-sub">{{ item.subtitle }}</p>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.carousel-main {
  max-width: 1280px;
  margin: 0 auto 18px auto;
  padding: 0 16px;
}

.swiper-hero {
  padding: 24px 10px 40px 10px;
}

.slide-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  height: clamp(200px, 38vw, 420px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, .25);
  background: #0f0f0f;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, .55) 2%, rgba(0, 0, 0, .15) 55%, rgba(0, 0, 0, 0) 75%);
}

.slide-content {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, .5);
}

.slide-title {
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 800;
  margin: 0 0 6px 0;
}

.slide-sub {
  font-size: clamp(12px, 1.4vw, 14px);
  opacity: .92;
  max-width: 70ch;
  margin: 0;
}

/* Navegação (setas) */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #fff;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, .25);
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 18px;
}

/* Paginação (bolinhas) */
:deep(.swiper-pagination-bullet) {
  background: #d1d5db;
  opacity: .7;
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
  opacity: 1;
}
</style>
