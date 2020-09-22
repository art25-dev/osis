<template>
  <div class="pdf-wrapper">
    <h1>{{ navigation.title }}</h1>
    <div class="pdf">
      <embed
        class="pdf-container"
        :src="
          this.path +
            '#view=FitH&toolbar=0'
        "
        type="application/pdf"
      />
    </div>
  </div>
</template>

<script>
import loginVue from '../admin/login.vue';
export default {
  head: {
    title: "OSIS"
  },
  layout: "user",
  async asyncData({ store, params }) {
    const navigation = await store.dispatch(
      "navigation/getNavigationItem",
      params.id
    );
    await store.commit("navigation/resetStatistic");
    return { navigation };
  },
  data() {
    return {
      path: require(`../../static/default.pdf`)
    };
  },
  mounted() {
    // Проверка на наличие файла .pdf
    try {
      this.path = require(`../../static/documents${this.navigation.pathFile}`)
    } catch (error) {
      this.path = require(`../../static/default.pdf`)
    }
  },
  computed: {},
  filters: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.pdf-wrapper {
  height: calc(100vh - 6rem);
  padding: 20px 20px 70px 20px;
  background: rgba(220, 214, 196, 0.8);

  @include hd-plus {
    height: calc(100vh - 6rem);
  }

  @include wsx {
    height: calc(100vh - 4.39rem);
  }

  @include hd {
    height: calc(100vh - 4.5rem);
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
