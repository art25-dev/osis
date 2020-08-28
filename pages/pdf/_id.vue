<template>
  <div class="pdf-wrapper">
    <h1>{{  navigation.title  }}</h1>
    <div class="pdf">
      <embed class="pdf-container" :src="require(`../../static/documents${navigation.pathFile}`)+'#view=FitH&toolbar=0'" type="application/pdf">
    </div>
  </div>
</template>

<script>
export default {
  layout: "user",
  async asyncData({ store, params }) {
    const navigation = await store.dispatch("navigation/getNavigationItem", params.id);
    return { navigation };
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

  @include hd-plus {
  }

  @include wsx {
    height: calc(100vh - 10rem);
  }

  @include hd {
    height: calc(100vh - 10rem);
  }
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
