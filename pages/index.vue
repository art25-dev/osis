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
    const navigation = await store.dispatch("navigation/getNavigation");
    const post = await store.dispatch("post/getActivePost");
    return { post, navigation };
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
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
