<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css/bundle'

import banner1 from '@/assets/images/FaberCastellBanner.jpg'
import banner2 from '@/assets/images/CaranBanner.jpg'
import banner3 from '@/assets/images/CansonBanner.jpg'
import banner4 from '@/assets/images/WinsorBanner.jpg'

const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      { id: 1, title: 'Faber-Castell', subtitle: 'Descrição do banner 1', image: banner1 },
      { id: 2, title: 'CaranD\'Ache', subtitle: 'Descrição do banner 2', image: banner2 },
      { id: 3, title: 'Canson', subtitle: 'Descrição do banner 3', image: banner3 },
      { id: 4, title: 'Winsor & Newton', subtitle: 'Descrição do banner 4', image: banner4 }
    ]
  },
  autoplay: { type: Number, default: 4500 }
})
const duplicatedSlides = computed(() => {
  return [...props.slides, ...props.slides]
})
</script>

<template>
  <section class="carousel-main">
    <div class="carousel-wrapper">
      <Swiper
        :modules="[Autoplay, Navigation, Pagination]"
        :loop="true"
        :centeredSlides="true"
        :loopedSlides="4"
        :slides-per-view="1.3"
        :space-between="12"
        :navigation="true"
        :pagination="{ clickable: true }"
        :autoplay="autoplay ? { delay: autoplay, disableOnInteraction: false, pauseOnMouseEnter: true } : false"
        :breakpoints="{
          640: { 
            slidesPerView: 1.35,
            spaceBetween: 12
          },
          768: { 
            slidesPerView: 1.3,
            spaceBetween: 12
          },
          1024: { 
            slidesPerView: 1.25,
            spaceBetween: 12
          },
          1280: { 
            slidesPerView: 1.2,
            spaceBetween: 12
          }
        }"
        class="swiper-hero"
      >
        <SwiperSlide v-for="(item, index) in duplicatedSlides" :key="`slide-${item.id}-${index}`">
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
    </div>
  </section>
</template>

<style scoped>
.carousel-main {
  max-width: 1320px;
  margin: 0 auto 18px auto;
  padding: 0 20px;
  position: relative;
}

/* Wrapper para permitir setas fora do container */
.carousel-wrapper {
  position: relative;
  padding: 0 75px;
}

@media (max-width: 768px) {
  .carousel-wrapper {
    padding: 0 35px;
  }
}

.swiper-hero {
  padding: 35px 0 60px 0;
  overflow: visible;
}

.slide-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  height: clamp(250px, 45vw, 480px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, .25);
  background: #0f0f0f;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide ativo (centralizado) */
.swiper-slide-active .slide-card {
  box-shadow: 0 20px 60px rgba(0, 0, 0, .4);
  transform: scale(1.12);
  z-index: 5;
}

/* Slides laterais */
.swiper-slide:not(.swiper-slide-active) .slide-card {
  opacity: 0.45;
  filter: brightness(0.6) saturate(0.8);
  transform: scale(0.88);
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
  background: linear-gradient(
    180deg, 
    transparent 0%, 
    rgba(0, 0, 0, .1) 35%, 
    rgba(0, 0, 0, .45) 65%, 
    rgba(0, 0, 0, .75) 100%
  );
}

.slide-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 28px;
  color: #fff;
  text-align: center;
  padding: 0 36px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, .8);
}

.slide-title {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  margin: 0 0 12px 0;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.slide-sub {
  font-size: clamp(14px, 1.7vw, 17px);
  opacity: .98;
  margin: 0 auto;
  max-width: 75%;
  line-height: 1.55;
}

/* Navegação (setas) */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #fff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  transition: all 0.35s ease;
  z-index: 10;
}

/* Posicionamento FORA do container */
:deep(.swiper-button-prev) {
  left: -28px;
}

:deep(.swiper-button-next) {
  right: -28px;
}

/* Mobile - setas menores */
@media (max-width: 768px) {
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 48px;
    height: 48px;
  }
  
  :deep(.swiper-button-prev) {
    left: -16px;
  }
  
  :deep(.swiper-button-next) {
    right: -16px;
  }
}

:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
  transform: scale(1.12);
}

:deep(.swiper-button-prev:active),
:deep(.swiper-button-next:active) {
  transform: scale(1.05);
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 26px;
  font-weight: 900;
}

/* Paginação (bolinhas) */
:deep(.swiper-pagination) {
  bottom: 1px !important;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, .85);
  opacity: .45;
  width: 10px;
  height: 10px;
  margin: 0 8px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
  opacity: 1;
  width: 40px;
  border-radius: 7px;
}

:deep(.swiper-pagination-bullet:hover) {
  opacity: 0.8;
  transform: scale(1.3);
}
</style>
