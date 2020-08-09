<template>
  <div>
    <h1>Навигация</h1>
    <el-menu default-active="1" class="el-menu-vertical-demo" router>
        <el-menu-item v-for="item in navigations" :key="item._id" index="/admin">
          <span> {{ item.title }} </span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["navigations"],
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  background: none;

  &::before {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: $color-second;
    top: 0;
  }
}

.el-menu-item {
  position: relative;
  color: $color-second;
  padding: 0 !important;
  user-select: none;
  font-size: 1.3rem;
  letter-spacing: 1px !important;

  @include hd-plus {
    font-size: 1.2rem;
    height: 45px;
    line-height: 45px;
  }

  @include wsx {
    font-size: 1.1rem;
  }

  @include hd {
    font-size: 1rem;
    height: 40px;
    line-height: 40px;
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: $color-second;
    bottom: 0;
  }
}

.el-menu-item:hover,
.el-menu-item:active,
.el-menu-item:visited,
.el-menu-item:focus {
  background: none !important;
}


h1 {
  padding-bottom: 1rem;
  font-size: 1.5rem;
  position: relative;
  letter-spacing: 2px !important;
  font-weight: bold;
  text-transform: uppercase !important;
  color: $color-second;

  @include hd-plus {
    font-size: 1.3rem;
  }

  @include wsx {
    font-size: 1.2rem;
  }

  @include hd {
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }
}
</style>
