<template>
  <div class="error">
    <h1>Ошибка 404</h1>
    <font-awesome-icon class="icon" icon="exclamation-triangle" size="4x" />
    <nuxt-link to="/">Вернуться на главную страницу</nuxt-link>
  </div>
</template>

<script>
export default {
  head: {
    title: "OSIS"
  },
  layout: "empty"
};
</script>

<style lang="scss" scoped>
.error {
  margin: 0 auto;
  margin-top: 10rem;
  padding: 2rem;
  border-radius: 4px;
  border: none;
  background: rgba($color-second, 0.8);
  color: $color-primary;
  width: 500px;
  position: relative;
}

.icon {
  position: absolute;
  transform: translateY(-50%);
  right: 2rem;
  top: 50%;
  color: $color-danger;
}

h1 {
  color: $color-danger;
  margin-bottom: 1rem;
}

a {
  font-weight: bold;
  text-decoration: underline;
  color: $color-primary;
}
</style>
