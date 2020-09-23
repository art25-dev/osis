<template>
  <div class="slider">
    <svg-icon @click="prevSlide()" class="slider__btn-prev" name="arrow"/>
    <ul class="slider__container">
      <li class="slider__item" v-for="slide in slideList" :key="slide._id">
        <h1 class="slider__item-title">{{ slide.title }}</h1>
        <embed class="slider__item-file" :src="slide.pathFile" type="application/pdf">
        <span class="slider__item-date">{{ slide.date }}</span>
      </li>
    </ul>
    <svg-icon @click="nextSlide()" class="slider__btn-next" name="arrow"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideList: [
        {
          _id: "123",
          title: "Объявление 1",
          date: "23.09.2020",
          pathFile: require(`../../static/default.pdf`)
        }
      ]
    }
  },
  mounted() {

  },
  destroyed() {},
  computed: {},
  watch: {},
  methods: {
    prevSlide() {
      console.log(1);
    },
    nextSlide() {
      console.log(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  margin: 0 !important;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  flex: 1;
}

.slider__container {
  display: block;
  position: relative;
  flex: 1;
  list-style: none;
  margin: 0 2.5rem !important;
  background: rgba($color-second, 0.8);
  border-radius: 5px;
  min-height: 100%;
  box-shadow: 0 16px 24px 2px rgba(0,0,0, 0.14), 0 6px 30px 5px rgba(0,0,0, 0.12), 0 8px 10px 0 rgba(0,0,0, 0.2);
}

.slider__btn-prev {
  width: 50px;
  height: 50px;
  transform: scaleX(-1);
  cursor: pointer;
  fill: rgba($color-second, .8);
}

.slider__btn-next {
  width: 50px;
  height: 50px;
  cursor: pointer;
  fill: rgba($color-second, .8);
}

.slider__item {
  margin: 2rem;
  
}


.slider__item-title {
  display: block;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: $color-primary;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: $color-danger;
    display: block;
  }
}

.slider__item-file {
  display: block;
  border-radius: 5px;
  width: 100%;
  min-height: 100%;
  height: 63vh;
  padding: 0;
  margin: 0;
}

.slider__item-date {
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  color: $color-primary;
  font-family: "Roboto-Bold", "Arial", sans-serif;
}

</style>
