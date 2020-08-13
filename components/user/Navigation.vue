<template>
  <div class="menu">
    <h1 class="menu__title">Главное меню</h1>
    <div class=" menu-container__list">
      <el-menu class="el-menu-vertical-demo" router>
        <el-menu-item
          v-for="item in buildTree"
          :key="item._id"
          :data-link="item._id"
        >
          <p class="menu__item-text">{{ item.title }}</p>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="menu__controls">
      <svg-icon class="menu__controls-btn" name="arrow" />
      <svg-icon class="menu__controls-btn" name="home" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["navigation"],
  mounted() {},
  methods: {},
  computed: {
    buildTree() {
      const map = new Map(this.navigation.map(item => [item._id, item]));
      // Обход в цикле по значениям, хранящимся в мапе
      for (let item of map.values()) {
        // Проверка, является ли нода дочерней (при parent === null вернет undefined)
        if (!map.has(item.parent)) {
          continue;
        }

        // Сохраняем прямую ссылку на родительскую ноду, чтобы дважды не доставать из мапа
        const parent = map.get(item.parent);

        // Добавляем поточную ноду в список дочерних нод родительчкого узла.
        // Здесь сокращено записана проверка на то, есть ли у ноды свойство children.
        parent.children = [...(parent.children || []), item];
      }

      // Возвращаем верхний уровень дерева. Все дочерние узлы уже есть в нужных родительских нодах
      return [...map.values()].filter(item => !item.parent);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__title {
    padding-bottom: 1rem;
    font-size: 1.5rem;
    position: relative;
    letter-spacing: 2px !important;
    font-weight: bold;
    text-transform: uppercase !important;
    color: $color-second;

    @include hd-plus {
      font-size: 1.4rem;
      padding-bottom: 0.6rem;
    }

    @include wsx {
      font-size: 1.3rem;
      padding-bottom: 0.6rem;
    }

    @include hd {
      font-size: 1.1rem;
      padding-bottom: 0.6rem;
    }
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }

  &__controls-btn {
    width: 50px;
    height: 50px;
    transform: scaleX(-1);
    cursor: pointer;

    @include hd-plus {
      width: 45px;
      height: 45px;
    }

    @include wsx {
      width: 40px;
      height: 40px;
    }

    @include hd {
      width: 35px;
      height: 35px;
    }
  }
}

.menu-container__list {
  max-height: calc(100vh - 410px);
  margin-bottom: 2rem;
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
  }

  @include hd-plus {
    max-height: calc(100vh - 364px);
  }

  @include wsx {
    max-height: calc(100vh - 327px);
  }

  @include hd {
    max-height: calc(100vh - 308px);
  }
}

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
  // height: 55px !important;
  // line-height: 55px !important;
  color: $color-second;
  padding: 0 !important;
  user-select: none;
  font-size: 1.3rem;
  letter-spacing: 1px !important;
  opacity: 0;
  animation: show 1s forwards;

  @include hd-plus {
    font-size: 1rem;
    // height: 48px !important;
    // line-height: 48px !important;
  }

  @include wsx {
    font-size: .9rem;
    // height: 45px !important;
    // line-height: 45px !important;
  }

  @include hd {
    font-size: .9rem;
    // height: 45px !important;
    // line-height: 45px !important;
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

.menu__item-text {
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
