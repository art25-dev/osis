<template>
  <div class="slider">
    <svg-icon @click="prevSlide()" class="slider__btn-prev" name="arrow" />
    <ul class="slider__list">
      <li
        ref="slide"
        class="slider__item"
        v-for="slide in slideList"
        :key="slide._id"
      >
        <app-pdf :key="componentKey" :title="slide.title" :pathFile="slide.pathFile"></app-pdf>
        <span class="slider__item-date">{{
          $moment(slide.date).format("DD.MM.YYYY")
        }}</span>
      </li>
    </ul>
    <svg-icon @click="nextSlide()" class="slider__btn-next" name="arrow" />
    <ul class="dot__list">
      <li
        @click="goSlide(index)"
        ref="dot"
        class="dot__item"
        v-for="(slide, index) in slideList"
        :key="slide._id"
      ></li>
    </ul>
  </div>
</template>

<script>
import AppPdf from "@/components/common/Pdf";
export default {
  components: {
    AppPdf,
  },
  props: {
    slideList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      componentKey: 0,
      currentSlide: 1,
      timer: null,
    };
  },
  mounted() {
    
    if (this.slideList.length > 0) {
      this.$refs.slide[0].classList.add("slider__item--active");
      this.$refs.dot[0].classList.add("dot__item--active");
      this.goSlide(0)
      this.startTimer();
    }
  },
  destroyed() {
    this.stopTimer();
  },
  computed: {},
  watch: {},
  methods: {
    forceRender() {
      this.componentKey += 1
    },
    showSlide(index = 1) {
   
      index > this.slideList.length ? (this.currentSlide = 1) : false;
      index < 1 ? (this.currentSlide = this.slideList.length) : false;

      for (let i = 0; i < this.$refs.slide.length; i++) {
        this.$refs.slide[i].classList.remove("slider__item--active");
      }

      for (let i = 0; i < this.$refs.dot.length; i++) {
        this.$refs.dot[i].classList.remove("dot__item--active");
      }

      this.$refs.slide[this.currentSlide - 1].classList.add(
        "slider__item--active"
      );

      this.$refs.dot[this.currentSlide - 1].classList.add("dot__item--active");

      this.forceRender()
    },
    prevSlide() {
      this.showSlide(--this.currentSlide);
    },
    nextSlide() {
      this.showSlide(++this.currentSlide);
    },
    goSlide(index) {
      this.showSlide((this.currentSlide = index + 1));
    },

    // Запуск таймера
    startTimer() {
      this.timer = setInterval(() => {
        this.nextSlide();
      }, 60000);
    },
    // Остановка таймера
    async stopTimer() {
      this.currentSlide = await 1;
      await clearTimeout(this.timer);
    }
  },
};
</script>

<style lang="scss" scoped>
.slider {
  margin: 0 !important;
  position: relative;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
  flex: 1;
}

.slider__list {
  display: flex;
  position: relative;
  flex: 1;
  list-style: none;
  margin: 0 2.5rem;
  background: rgba($color-second, 0.8);
  border-radius: 5px;
  min-height: 90%;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px 0 rgba(0, 0, 0, 0.2);

  @include hd-plus {
    margin: 0 1rem !important;
  }

  @include wsx {
    margin: 0 1rem !important;
  }

  @include hd {
    margin: 0 1rem !important;
  }
}

.slider__btn-prev {
  width: 50px;
  height: 50px;
  transform: scaleX(-1);
  cursor: pointer;
  fill: rgba($color-second, 0.8);
}

.slider__btn-next {
  width: 50px;
  height: 50px;
  cursor: pointer;
  fill: rgba($color-second, 0.8);
}

.slider__item {
  flex-basis: 100%;
  margin: 2rem 2rem 1rem 2rem;
  display: none;
  opacity: 1;



  &--active {
    flex-direction: column;
    display: flex;
    animation: show 1s ease-in-out forwards;
  }
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
}

.slider__item-date {
  margin-top: 1rem;
  text-align: right;
  color: $color-primary;
  font-family: "Roboto-Bold", "Arial", sans-serif;

  @include hd-plus {

  }

  @include wsx {

  }

  @include hd {

  }
}

.dot__list {
  position: absolute;
  top: 100%;
  display: flex;
  list-style: none;
  width: 300px;
  justify-content: center;
}

.dot__item {
  position: relative;
  cursor: pointer;
  margin-right: 1.5rem;

  &:last-child {
    margin-right: 0;
  }

  &::before {
    display: block;
    content: "";
    width: 20px;
    height: 20px;
    border: 3px rgba($color-second, 0.8) solid;
    border-radius: 50%;
  }

  &--active {
    &::after {
      position: absolute;
      display: block;
      content: "";
      width: 15px;
      height: 15px;
      background-color: rgba($color-second, 0.8);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: show 0.5s ease-in-out forwards;
    }
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
