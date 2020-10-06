<template>
  <div class="slider">
    <svg-icon @click="prevSlide()" class="slider__btn-prev" name="arrow" />
    <ul class="slider__container">
      <li
        ref="slide"
        class="slider__item"
        v-for="slide in slideList"
        :key="slide._id"
      >
        <h1 class="slider__item-title">{{ slide.title }}</h1>
        <embed
          class="slider__item-file"
          :src="slide.pathFile + '#view=FitH&toolbar=0'"
          type="application/pdf"
        />
        <span class="slider__item-date">{{
          new Date(slide.date).toLocaleDateString()
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
export default {
  props: {
    slideList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentSlide: 1,
      timer: null
    };
  },
  async mounted() {
    if(this.slideList.length > 0) {
      await this.$refs.slide[0].classList.add("slider__item--active");
      await this.$refs.dot[0].classList.add("dot__item--active");
      await this.startTimer();
    }

  },
  destroyed() {
    this.stopTimer();
  },
  computed: {},
  watch: {},
  methods: {
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
  }
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
  margin: 2rem;
  display: none;
  opacity: 1;

  &--active {
    display: block;
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
  width: 100%;
  min-height: 100%;
  height: 63vh;
  padding: 0;
  margin: 0;

  @include hd-plus {
    height: 60vh;
  }

  @include wsx {
    height: 61vh;
  }

  @include hd {
    height: 58vh;
  }
}

.slider__item-date {
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  color: $color-primary;
  font-family: "Roboto-Bold", "Arial", sans-serif;

  @include hd-plus {
    bottom: 1.2rem;
  }

  @include wsx {
    bottom: 1.5rem;
  }

  @include hd {
    bottom: 1.3rem;
  }
}

.dot__list {
  position: absolute;
  top: 100%;
  display: flex;
  list-style: none;
  width: 300px;
  justify-content: center;
  margin-top: 2rem;
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
