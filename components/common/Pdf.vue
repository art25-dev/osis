<template>
  <div class="pdf-wrapper">
    <h1>{{ this.title }}</h1>
    <div class="pdf">
      <embed
        class="pdf-container"
        :src="this.pathFile + '#view=FitH&toolbar=0'"
        type="application/pdf"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "Нет подключения к БД"
      }
    },
    pathFile: {
      type: String,
      default() {
        return "/default.pdf"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf-wrapper {
  height: calc(100vh - 6rem);
  padding: 20px 20px 70px 20px;
  background: rgba($color-second, 0.8);

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
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
