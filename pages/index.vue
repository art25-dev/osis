<template>
  <div class="wrapper">
    <app-slider :slideList="post"></app-slider>
  </div>
</template>

<script>
import AppSlider from "@/components/user/Slider";
export default {
  head: {
    title: "OSIS"
  },
  components: {
    AppSlider
  },
  layout: "user",
  // Запрос всех пунктов меню из store/post.js в Action getPost()
  async asyncData({ store }) {
    const post = await store.dispatch("post/getPost");
    return { post };
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
h1 {
  display: inline-block;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
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
p {
  font-size: 24px;
}

.slider-container {
  position: relative;
}

.slider {
  margin: 0 4rem;
}

.slider__prev-btn {
  position: absolute;
  top: 50%;
  left: 0;
  width: 50px;
  height: 50px;
  transform: scaleX(-1);
  cursor: pointer;

  @include hd-plus {
    width: 45px;
    height: 45px;
  }

  @include wsx {
    width: 40px;
    height: 40px;
  }

  @include hd {
    width: 35px;
    height: 35px;
  }
}

.slider__next-btn {
  position: absolute;
  top: 50%;
  right: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;

  @include hd-plus {
    width: 45px;
    height: 45px;
  }

  @include wsx {
    width: 40px;
    height: 40px;
  }

  @include hd {
    width: 35px;
    height: 35px;
  }
}

.pdf {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.pdf-container {
  width: 100%;
  height: 100%;
  min-height: 75vh;
  border-radius: 5px;
  display: block;
  padding: 0;
  background-color: #fff;
}
</style>
