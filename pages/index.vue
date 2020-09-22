<template>
  <!-- <div class="wrapper">
    <h1>Внимание!</h1>
    <p>"Открытая справочная инфорационная система" работает в тестовом режиме.</p>
    <p>Скачивание антивирусных баз временно недоступно.</p>
  </div>-->
  <div>
    <svg-icon @click="showPrev()" class="menu__controls-btn" name="arrow" />
    <VueSlickCarousel ref="carousel" v-bind="settings">
      <div>
        <img src="https://picsum.photos/300/300" />
      </div>
      <div>
        <img src="https://picsum.photos/300/300" />
      </div>
      <div>
        <img src="https://picsum.photos/300/300" />
      </div>
    </VueSlickCarousel>
    <svg-icon @click="showNext()" class="menu__controls-btn" name="arrow" />
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  head: {
    title: "OSIS",
  },
  components: {
    VueSlickCarousel,
  },
  layout: "user",
  data() {
    return {
      settings: {
        arrows: false,
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    };
  },
  methods: {
    showNext() {
        this.$refs.carousel.next()
    },
    showPrev() {
        this.$refs.carousel.prev()
    },
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  margin: 3rem;
}
h1 {
  color: $color-danger;
  font-size: 52px;
}
p {
  font-size: 24px;
}
</style>
