<template>
  <div></div>
</template>

<script>
export default {
  head: {
    title: "OSIS"
  },
  components: {},
  layout: "user",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  margin: 3rem;
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
