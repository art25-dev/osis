<template>
  <div class="container">
    <div class="bg"></div>
    <el-container>
      <el-main>
        <nuxt></nuxt>
      </el-main>
      <el-aside>
        <app-calendar></app-calendar>
        <app-navigation></app-navigation>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import AppCalendar from "@/components/common/Calendar";
import AppNavigation from "@/components/user/Navigation";
export default {
  components: {
    AppCalendar,
    AppNavigation
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.el-main {
  padding: 2rem;
  background: rgba($color-second, 0.8);
  color: $color-primary;
}
.el-aside {
  padding: 2rem;
  width: 28% !important;
  background: rgba($color-primary, 0.8);

  @include hd-plus {
    width: 29% !important;
  }

  @include wsx {
    width: 30% !important;
  }

  @include hd {
    width: 29% !important;
  }
}
</style>
