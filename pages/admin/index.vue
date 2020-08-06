<template>
  <h1>Статистика</h1>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["adminAuth"],
  methods: {}
};
</script>

<style lang="scss" scoped>
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
</style>
