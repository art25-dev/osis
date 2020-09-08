<template>
  <div class="wrapper">
    <h1>Внимание</h1>
    <p>"Открытая справочная инфорационная система", работает в тестовом режиме.</p>
    <p>Возможность скачивания антивирусных баз на данном моноблоке временно недоступна.</p>
  </div>
</template>

<script>
export default {
  head: {
    title: "OSIS"
  },
  layout: "user"
};
</script>

<style lang="scss" scoped>
  .wrapper {
    text-align: center;
    margin: 3rem;
  }
  h1 {
    color: $color-danger;
    font-size: 52px;
  } 
  p {
    font-size: 24px;
  }
</style>
