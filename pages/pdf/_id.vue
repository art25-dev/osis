<template>
  <div class="pdf-wrapper">
    <h1>{{  file.title  }}</h1>
    <div class="pdf">
      <embed class="pdf-container" :src="require(`../../static/documents${file.pathFile}`)+'#view=FitH&toolbar=0'" type="application/pdf">
    </div>
  </div>
</template>

<script>
export default {
  layout: "user",
  async asyncData({ store, params }) {
    const file = await store.dispatch("navigation/getPdfFile", params.id);
    return { file };
  },
  data() {
    return {};
  },
  mounted() {
    
  },
  computed: {},
  filters: {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.pdf-wrapper {
  height: calc(100vh - 12rem);
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
  border-radius: 5px;
  display: block;
  padding: 0;
  background-color: #fff;
}
</style>
