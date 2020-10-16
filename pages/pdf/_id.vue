<template>
  <div class="wrapper">
    <app-pdf
      :title="navigationItem.title"
      :pathFile="navigationItem.pathFile"
    ></app-pdf>
  </div>
</template>

<script>
import AppPdf from "@/components/common/Pdf";
export default {
  head: {
    title: "OSIS",
  },
  layout: "user",
  components: {
    AppPdf,
  },
  async asyncData({ store, params }) {
    const navigationItem = await store.dispatch(
      "navigation/getNavigationItem",
      params.id
    );
    await store.commit("navigation/resetStatistic");
    return { navigationItem };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  background: rgba($color-second, 0.8);
  padding: 2rem;
}
</style>
