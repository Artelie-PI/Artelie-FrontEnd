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

const duplicatedSlides = computed(() => [...props.slides, ...props.slides])
</script>

<template>
  <section class="hero-bleed">
    <div class="hero-inner">
      <Swiper
        class="swiper-hero"
        :modules="[Autoplay, Navigation, Pagination]"
        :loop="true"
        :centered-slides="true"
        :looped-slides="8"
        :slides-per-view="1.4"
        :space-between="20"
        :navigation="true"
        :pagination="{ clickable: true }"
        :autoplay="autoplay ? { delay: autoplay, disableOnInteraction: false, pauseOnMouseEnter: true } : false"
        :breakpoints="{
          640:  { slidesPerView: 1.5,  spaceBetween: 20 },
          768:  { slidesPerView: 1.6,  spaceBetween: 20 },
          1024: { slidesPerView: 1.7,  spaceBetween: 20 },
          1280: { slidesPerView: 1.8,  spaceBetween: 20 }
        }"
      >
        <SwiperSlide v-for="(item, index) in duplicatedSlides" :key="`slide-${item.id}-${index}`">
          <div class="hero-slide">
            <img :src="item.image" :alt="item.title" class="hero-img" />
            <div class="hero-mask"></div>

            <div class="hero-content">
              <h3 class="hero-title">{{ item.title }}</h3>
              <p class="hero-sub">{{ item.subtitle }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.hero-bleed {
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
  overflow-x: hidden;
}

/* Altura do herói; ajuste conforme seu layout */
.swiper-hero {
  padding: 0 0 54px 0;
  height: clamp(260px, 45vw, 560px);
}

/* Cada slide recebe padding lateral para o raio não “colar” no vizinho */
.swiper-hero :global(.swiper-slide) { padding: 0 8px; }
@media (min-width: 1024px) {
  .swiper-hero :global(.swiper-slide) { padding: 0 10px; }
}

/* Slide com canto arredondado e overflow hidden */
.hero-slide {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: none;
}

/* Sombra suave apenas na base do slide (pode mover para apenas o ativo se preferir) */
.hero-slide::after {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: -6px;
  height: 22px;
  border-radius: 50%;
  filter: blur(10px);
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

/* Imagem preenchendo o slide */
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Máscara para legibilidade do texto */
.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.10) 35%,
    rgba(0,0,0,0.45) 65%,
    rgba(0,0,0,0.75) 100%
  );
}

/* Conteúdo (título/sub) */
.hero-content {
  position: absolute;
  left: 0; right: 0; bottom: 28px;
  color: #fff; text-align: center;
  padding: 0 24px;
  text-shadow: 0 4px 12px rgba(0,0,0,.8);
}
.hero-title { font-size: clamp(22px, 3.2vw, 40px); font-weight: 800; margin: 0 0 10px; letter-spacing: -0.03em; }
.hero-sub   { font-size: clamp(14px, 1.6vw, 18px); opacity: .98; margin: 0 auto; max-width: 80%; line-height: 1.55; }

/* Destaque do slide ativo e vizinhos colados */
.swiper-slide-active .hero-slide { transform: scale(1.03); transition: transform .45s ease; z-index: 2; }
.swiper-slide-prev .hero-slide,
.swiper-slide-next .hero-slide   { transform: scale(0.995); filter: brightness(.96); }
.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) .hero-slide {
  transform: scale(0.98); filter: brightness(.9);
}

/* Setas nativas do Swiper, próximas da imagem principal (sem sair da viewport) */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #fff;
  width: 64px;
  height: 64px;
  transition: transform .3s ease, background .3s ease;
  z-index: 10;
}

:deep(.swiper-button-prev) { left: 250px; }
:deep(.swiper-button-next) { right: 250px; }

:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) { transform: scale(1.2); }

@media (max-width: 768px) {
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) { width: 46px; height: 46px; }
  :deep(.swiper-button-prev) { left: 8px; }
  :deep(.swiper-button-next) { right: 8px; }
}

/* Paginação */
:deep(.swiper-pagination) { bottom: 8px !important; }
:deep(.swiper-pagination-bullet) {
  background: rgba(255,255,255,.85);
  opacity: .45;
  width: 10px;
  height: 10px;
  margin: 0 8px !important;
  transition: all .4s cubic-bezier(0.4,0,0.2,1);
}
:deep(.swiper-pagination-bullet-active) { background: #fff; opacity: 1; width: 40px; border-radius: 7px; }

</style>
