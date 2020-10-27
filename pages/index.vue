<template>
  <div class="wrapper">
    <app-slider :slideList="slideList"></app-slider>
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
  data() {
    return {};
  },
  computed: {
    // Запрос объявлений из store
    slideList() {
      return this.$store.getters["post/getPost"];
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
