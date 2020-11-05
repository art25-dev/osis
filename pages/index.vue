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
    // Запрос всех пунктов меню из store/post.js в Action getPost()
  async asyncData({ store }) {
    const slideList = await store.dispatch("post/getPost");
    const navigation = await store.dispatch("navigation/getNavigation");
    return { slideList };
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
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
