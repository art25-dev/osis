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
  position: relative;
  padding-bottom: 0.3rem;
  font-size: 1.4rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;

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
