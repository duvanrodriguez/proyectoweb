<template>
  <main>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="mySwiper"
      @autoplayTimeLeft="onAutoplayTimeLeft"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <img :src="slide.image" alt="Slide" />
      </swiper-slide>
      <template #container-end>
        <div class="autoplay-progress">
          <svg viewBox="0 0 48 48" ref="progressCircle">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref="progressContent"></span>
        </div>
      </template>
    </swiper>
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';
//import '../../node_modules/swiper/swiper.css';
//import '../../node_modules/swiper/modules/navigation.css';
//import '../../node_modules/swiper/modules/pagination.css';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const slides = [
      { id: 1, image: '../img/Diapositiva1.jpg' },
      { id: 2, image: 'url_to_your_image_2.jpg' },
      // Agrega más objetos de diapositivas según sea necesario
    ];

    const progressCircle = ref(null);
    const progressContent = ref(null);

    const onAutoplayTimeLeft = (swiper, time, progress) => {
      progressCircle.value.style.setProperty('--progress', 1 - progress);
      progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return {
      slides,
      onAutoplayTimeLeft,
      progressCircle,
      progressContent,
    };
  },
};
</script>

<style scoped>
#app {
  height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: auto;
}

.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}
</style>
