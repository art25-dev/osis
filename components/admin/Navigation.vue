<template>
  <div>
    <h1>Администратор</h1>
    <el-menu default-active="1" class="el-menu-vertical-demo" router>
    <el-menu-item index="/admin">
      <font-awesome-icon icon="chart-bar" size="xs" fixed-width />
      <span>Статистика</span>
    </el-menu-item>
    <el-menu-item index="/admin/post">
      <font-awesome-icon icon="newspaper" size="xs" fixed-width />
      <span>Объявления</span>
    </el-menu-item>
    <el-menu-item index="/admin/navigation">
      <font-awesome-icon icon="bars" size="xs" fixed-width />
      <span>Навигация</span>
    </el-menu-item>
    <el-menu-item index="/admin/department">
      <font-awesome-icon icon="university" size="xs" fixed-width />
      <span>Подразделения</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <font-awesome-icon icon="sign-out-alt" size="xs" fixed-width />
      <span>Выход</span>
    </el-menu-item>
  </el-menu>
  </div>
  
</template>

<script>
export default {
  methods: {}
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

span {
  margin-left: 1rem;

  @include hd-plus {
    margin-left: .5rem;
  }

  
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
   padding-bottom: .5rem;
  }
  
}
</style>
