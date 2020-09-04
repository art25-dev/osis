<template>
  <div class="menu">
    <h1 class="menu__title">Навигация</h1>
    <div class="menu-container__list">
      <el-menu class="el-menu-vertical-demo" router>
        <el-menu-item
          v-for="item in currentNav"
          :key="item._id"
          :data-link="item._id"
          :data-type="item.typeLink"
          @click="getSubMenu(item._id, $event)"
        >
          <p class="menu__item-text">{{ item.title }}</p>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="menu__controls">
      <svg-icon
        @click="getPrevMenu()"
        class="menu__controls-btn"
        name="arrow"
      />
      <svg-icon @click="getMainMenu()" class="menu__controls-btn" name="home" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["navigation"],
  data() {
    return {
      fullNav: null,
      currentNav: null,
      history: [],
      statistic: {}
    };
  },
  async mounted() {
    this.fullNav = await this.navigation;
    this.currentNav = this.sortArray(this.fullNav.filter(nav => !nav.parent));
    await this.$store.commit("navigation/initStatistic", this.fullNav)
  },
  computed: {},
  filters: {},
  methods: {

    // Сортировка пунктов меню по алфавиту
    sortArray(arr) {
      return arr.sort((a, b) => (a.title > b.title ? 1 : -1));
    },

    // Получение дочерних пунктов меню
    async getSubMenu(link, $event) {
      let title = $event.$el.innerText;
      let typeLink = $event.$attrs["data-type"];

      switch (typeLink) {
        case "link":
          this.currentNav = this.fullNav.filter(nav => nav.parent === link);
          this.sortArray(this.currentNav);
          this.history.push(link);
          await this.$store.commit("navigation/changeStatistic", link)
          break;
        case "pdf":
          this.$router.push({
            name: "pdf-id",
            params: { id: link }
          });
          await this.$store.commit("navigation/changeStatistic", link)
          break;
      }
    },

    // Получение предыдущих пунктов меню
    getPrevMenu() {
      this.history.pop();
      let prevMenu = this.history[this.history.length - 1];
      if (this.history.length <= 0) {
        this.getMainMenu();
      } else {
        this.currentNav = this.sortArray(
          this.fullNav.filter(nav => nav.parent === prevMenu)
        );
      }
    },

    // Получение главного меню
    getMainMenu() {
      this.currentNav = this.sortArray(this.fullNav.filter(nav => !nav.parent));
      this.history = [];
      this.$router.push("/");
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
    margin-bottom: 1.8rem;
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
  color: $color-second;
  padding: 0 !important;
  user-select: none;
  font-size: 1.3rem;
  letter-spacing: 1px !important;
  opacity: 0;
  animation: 0.5s show ease-in-out forwards;

  @include hd-plus {
    font-size: 1rem;
  }

  @include wsx {
    font-size: 0.9rem;
  }

  @include hd {
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

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
