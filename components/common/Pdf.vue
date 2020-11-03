<template>
  <div class="pdf">
    <h1>{{ this.title }}</h1>
    <embed ref="file"
      :src="this.pathFile + '#view=FitH&toolbar=0'"
      type="application/pdf"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "Нет подключения к БД";
      },
    },
    pathFile: {
      type: String,
      default() {
        return "/default.pdf";
      },
    },
  },

};
</script>

<style lang="scss" scoped>
.pdf {
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  padding-bottom: 0.4rem;
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

embed {
  flex: 1;
  border-radius: 5px;
}
</style>
