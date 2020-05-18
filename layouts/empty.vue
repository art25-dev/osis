<template>
  <div class="container">
    <div class="bg"></div>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
